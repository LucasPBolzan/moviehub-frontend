<template>
  <div class="home">
    <section class="banner" :style="currentBannerStyle">
      <div class="banner-overlay"></div>
      <div class="banner-content">
        <h1>{{ featuredMovies[currentIndex].title }}</h1>
        <div class="movie-info">
          <span class="rating">★ {{ featuredMovies[currentIndex].rating }}</span>
          <span>{{ featuredMovies[currentIndex].year }}</span>
          <span>{{ featuredMovies[currentIndex].duration }}</span>
          <span v-for="genre in featuredMovies[currentIndex].genres" :key="genre" class="genre">
            {{ genre }}
          </span>
        </div>
        <p>{{ featuredMovies[currentIndex].description }}</p>
        <div class="actions">
          <button class="play-btn" @click="watchTrailer"><i class="play-icon">▶</i> Assistir Trailer</button>
          <button class="fav-btn" @click="addToFavorites"><i class="heart-icon">♥</i> Adicionar aos Favoritos</button>
          <button class="details-btn" @click="viewDetails"><i class="info-icon"></i> Ver Detalhes</button>
        </div>
      </div>
      <div class="banner-indicators">
        <span 
          v-for="(movie, index) in featuredMovies" 
          :key="index" 
          class="indicator" 
          :class="{ active: index === currentIndex }"
          @click="setMovie(index)">
        </span>
      </div>
    </section>

    <div>
      <MovieCarousel 
        ref="movieCarousel"
        title="Todos os Filmes" 
        :searchFilters="searchFilters" 
        @update:movies="checkResults" 
        @avaliar="abrirFormulario"
      />
      <p v-if="!hasResults" class="no-results">Nenhum filme encontrado com os critérios de busca.</p>
    </div>

    <div v-if="filmeSelecionado" class="form-container">
      <h3>Avaliar: {{ filmeSelecionado.title }}</h3>
      <label>Nota:</label>
      <select v-model="nota">
        <option v-for="n in [1,2,3,4,5]" :key="n" :value="n">{{ n }} ⭐</option>
      </select>

      <label>Comentário:</label>
      <textarea v-model="comentario" placeholder="Deixe sua opinião..."></textarea>

      <button @click="enviar">Enviar</button>
      <button @click="fecharFormulario">Fechar</button>
    </div>
  </div>
</template>

<script>
import MovieCarousel from '@/components/MovieCarousel.vue'

export default {
  name: 'MovieHome',
  components: {
    MovieCarousel
  },
  props: {
    searchFilters: {
      type: Object,
      default: () => ({ query: '', genres: [] })
    }
  },
  data() {
    return {
      currentIndex: 0,
      autoplayInterval: null,
      hasResults: true,
      filmeSelecionado: null,
      nota: 5,
      comentario: '',
      featuredMovies: [
        { id: 1, title: 'Dune: Part Two', year: 2024, rating: 8.5, duration: '2h 46m', genres: ['Sci-Fi', 'Adventure'], description: 'Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family.', backdrop: 'https://i.ytimg.com/vi/53BBRKF-L60/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGH8gQygTMA8=&rs=AOn4CLDgS78KBd_b20u0o-YBvLDGs6De2A', trailer: 'https://www.youtube.com/watch?v=Way9Dexny3w' },
        { id: 2, title: 'Oppenheimer', year: 2023, rating: 8.3, duration: '3h 0m', genres: ['Biography', 'Drama'], description: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.', backdrop: 'https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_.jpg', trailer: 'https://www.youtube.com/watch?v=uYPbbksJxIg' },
        { id: 3, title: 'Barbie', year: 2023, rating: 7.0, duration: '1h 54m', genres: ['Comedy', 'Adventure'], description: 'Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land.', backdrop: 'https://m.media-amazon.com/images/M/MV5BNjU3N2QxNzYtMjk1NC00MTc4LTk1NTQtMmUxNTljM2I0NDA5XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg', trailer: 'https://www.youtube.com/watch?v=pBk4NYhWNMM' },
        { id: 4, title: 'Spider-Man: Across the Spider-Verse', year: 2023, rating: 8.7, duration: '2h 20m', genres: ['Animation', 'Action'], description: 'After reuniting with Gwen Stacy, Miles Morales finds himself catapulted across the Multiverse, where he encounters a team of Spider-People.', backdrop: 'https://m.media-amazon.com/images/M/MV5BMzI0NmVkMjEtYmY4MS00ZDMxLTlkZmEtMzU4MDQxYTMzMjU2XkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_.jpg', trailer: 'https://www.youtube.com/watch?v=cqGjhVJWtEg' },
        { id: 5, title: 'John Wick: Chapter 4', year: 2023, rating: 7.7, duration: '2h 49m', genres: ['Action', 'Thriller'], description: 'John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy.', backdrop: 'https://m.media-amazon.com/images/M/MV5BMDExZGMyOTMtMDgyYi00NGIwLWJhMTEtOTdkZGFjNmZiMTEwXkEyXkFqcGdeQXVyMjM4NTM5NDY@._V1_.jpg', trailer: 'https://www.youtube.com/watch?v=qEVUtrk8_B4' },
        { id: 6, title: 'Avatar: The Way of Water', year: 2022, rating: 7.6, duration: '3h 12m', genres: ['Sci-Fi', 'Adventure'], description: 'Set more than a decade after the events of the first film, Avatar: The Way of Water begins to tell the story of the Sully family.', backdrop: 'https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_.jpg', trailer: 'https://www.youtube.com/watch?v=d9MyW72ELq0' },
        { id: 7, title: 'The Batman', year: 2022, rating: 8.0, duration: '2h 56m', genres: ['Action', 'Drama'], description: 'When the Riddler, a sadistic serial killer, begins murdering key political figures in Gotham, Batman is forced to investigate the citys hidden corruption.', backdrop: 'https://blogs.uai.com.br/opipoqueiro/wp-content/uploads/sites/54/2022/02/Batman-01.jpg', trailer: 'https://www.youtube.com/watch?v=mqqft2x_Aa4' },
        { id: 8, title: 'Everything Everywhere All at Once', year: 2022, rating: 8.1, duration: '2h 19m', genres: ['Comedy', 'Sci-Fi'], description: 'An aging Chinese immigrant is swept up in an insane adventure, where she alone can save what is important to her by connecting with the lives she could have led.', backdrop: 'https://m.media-amazon.com/images/M/MV5BYTdiOTIyZTQtNmQ1OS00NjZlLWIyMTgtYzk5Y2M3ZDVmMDk1XkEyXkFqcGdeQXVyMTAzMDg4NzU0._V1_.jpg', trailer: 'https://www.youtube.com/watch?v=WLJJXKWACNw' },
        { id: 9, title: 'The Whale', year: 2022, rating: 7.8, duration: '1h 57m', genres: ['Drama'], description: 'A reclusive, morbidly obese English teacher attempts to reconnect with his estranged teenage daughter.', backdrop: 'https://m.media-amazon.com/images/M/MV5BZDQ4Njg4YTctNGZkYi00NWU1LWI4OTYtNmNjOWMyMjI1NWYzXkEyXkFqcGdeQXVyMTA3MDk2NDg2._V1_.jpg', trailer: 'https://www.youtube.com/watch?v=yGKyCkNL85o' },
        { id: 10, title: 'Top Gun: Maverick', year: 2022, rating: 8.3, duration: '2h 11m', genres: ['Action', 'Drama'], description: 'After thirty years, Maverick is still pushing the envelope as a top naval aviator, but must confront ghosts of his past when he leads TOP GUNs elite graduates on a mission.', backdrop: 'https://m.media-amazon.com/images/M/MV5BZWYzOGEwNTgtNWU3NS00ZTQ0LWJkODUtMmVhMjIwMjA1ZmQwXkEyXkFqcGdeQXVyMjkwOTAyMDU@._V1_.jpg', trailer: 'https://www.youtube.com/watch?v=giXco2jaZ_4' },
        { id: 11, title: 'Killers of the Flower Moon', year: 2023, rating: 7.7, duration: '3h 26m', genres: ['Crime', 'Drama'], description: 'When oil is discovered in 1920s Oklahoma under Osage Nation land, the Osage people are murdered one by one - until the FBI steps in to unravel the mystery.', backdrop: 'https://www.kaiakpj.it/wp-content/uploads/2024/02/Flower-Moon-horiz.jpg', trailer: 'https://www.youtube.com/watch?v=EP34Yoxs3FQ' },
        { id: 12, title: 'Poor Things', year: 2023, rating: 8.0, duration: '2h 21m', genres: ['Comedy', 'Drama', 'Romance'], description: 'The incredible tale of Bella Baxter, a young woman brought back to life by the brilliant and unorthodox scientist Dr. Godwin Baxter.', backdrop: 'https://m.media-amazon.com/images/M/MV5BNGIyYWMzNjktNDE3MC00YWQyLWEyMmEtN2ZmNzZhZDk3NGJlXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg', trailer: 'https://www.youtube.com/watch?v=RlbR5N6veqw' },
        { id: 13, title: 'The Holdovers', year: 2023, rating: 7.9, duration: '2h 13m', genres: ['Comedy', 'Drama'], description: 'A cranky history teacher at a remote prep school is forced to remain on campus over the holidays with a brainy but damaged student.', backdrop: 'https://m.media-amazon.com/images/M/MV5BNDc2MzNkMjMtZDY5NC00NmQ0LWI1NjctZjRhNWIzZjc4MGRiXkEyXkFqcGdeQXVyMjkwOTAyMDU@._V1_.jpg', trailer: 'https://www.youtube.com/watch?v=VjUt7E-6WpU' },
        { id: 14, title: 'Godzilla x Kong: The New Empire', year: 2024, rating: 6.5, duration: '1h 55m', genres: ['Action', 'Adventure', 'Sci-Fi'], description: 'Two ancient titans, Godzilla and Kong, clash in an epic battle as humans unravel their intertwined origins and connection to Skull Island mysteries.', backdrop: 'https://cdn.ome.lt/96h-1vw_vWlSFZXvRS1P_BkVhUs=/570x0/smart/uploads/conteudo/fotos/CAPA-godzilla-vs-kong_3nvSvre.png', trailer: 'https://www.youtube.com/watch?v=lV1OOlGwExM' },
        { id: 15, title: 'Deadpool & Wolverine', year: 2024, rating: 8.2, duration: '2h 7m', genres: ['Action', 'Adventure', 'Comedy'], description: 'Deadpool enlists the help of Wolverine to save his universe in an epic adventure across the multiverse.', backdrop: 'https://s2-g1.glbimg.com/k6J0DsMl3_w3evhEsSfoP4348Tg=/0x0:1080x1350/1008x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2024/4/m/NsJJlvTLCRvEs8KBowrw/deadpool-e-wolverine-cartaz.jpg', trailer: 'https://www.youtube.com/watch?v=73_1biulkYk' }
      ]
    }
  },
  computed: {
    currentBannerStyle() {
      return {
        backgroundImage: `url(${this.featuredMovies[this.currentIndex].backdrop})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }
    }
  },
  methods: {
    nextMovie() {
      this.currentIndex = (this.currentIndex + 1) % this.featuredMovies.length
    },
    setMovie(index) {
      this.currentIndex = index
      this.resetAutoplay()
    },
    resetAutoplay() {
      clearInterval(this.autoplayInterval)
      this.autoplayInterval = setInterval(this.nextMovie, 8000)
    },
    checkResults(count) {
      this.hasResults = count > 0
    },
    abrirFormulario(filme) {
      this.filmeSelecionado = filme
      this.nota = 5
      this.comentario = ''
    },
    enviar() {
      console.log({
        filme: this.filmeSelecionado,
        nota: this.nota,
        comentario: this.comentario
      })
      alert(`Obrigado por avaliar!\nFilme: ${this.filmeSelecionado.title}\nNota: ${this.nota}\nComentário: ${this.comentario}`)
      this.fecharFormulario()
    },
    fecharFormulario() {
      this.filmeSelecionado = null
    },
    watchTrailer() {
      const currentMovie = this.featuredMovies[this.currentIndex]
      if (currentMovie.trailer) {
        window.open(currentMovie.trailer, '_blank')
      }
    },
    addToFavorites() {
      const { useFavoritesStore } = require('@/stores/favorites')
      const favStore = useFavoritesStore()
      const currentMovie = this.featuredMovies[this.currentIndex]
      favStore.toggleFavorite(currentMovie)
      
      const isFavorited = favStore.isFavorited(currentMovie.id)
      const message = isFavorited ? 'Adicionado aos favoritos!' : 'Removido dos favoritos!'
      alert(message)
    },
    viewDetails() {
      const currentMovie = this.featuredMovies[this.currentIndex]
      this.$router.push(`/movie/${currentMovie.id}`)
    }
  },
  mounted() {
    this.autoplayInterval = setInterval(this.nextMovie, 8000)
  },
  beforeUnmount() {
    clearInterval(this.autoplayInterval)
  }
}
</script>

<style scoped>
.banner {
  color: white;
  display: flex;
  align-items: center;
  min-height: 70vh;
  padding: 60px 80px;
  position: relative;
  text-align: left;
  transition: background-image 0.8s ease;
  overflow: hidden;
}

.banner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.4) 100%);
  z-index: 1;
}

.banner-content {
  max-width: 700px;
  margin-left: 0;
  position: relative;
  z-index: 2;
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.banner-content h1 {
  font-size: 90px;
  font-weight: bold;
  margin-bottom: 24px;
  line-height: 1.1;
}

.movie-info {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 18px;
  font-size: 20px;
}

.movie-info .rating {
  color: gold;
  font-weight: bold;
}

.movie-info .genre {
  background-color: #1e1e1e;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 15px;
}

.banner-content p {
  margin-top: 15px;
  font-size: 20px;
  line-height: 1.7;
  color: #ccc;
  max-width: 95%;
}

.actions {
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.play-btn {
  background-color: #e50914;
  color: white;
  padding: 14px 26px;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
}

.play-btn:hover {
  background-color: #f40612;
  transform: scale(1.05);
}

.fav-btn, .details-btn {
  background-color: rgba(51, 51, 51, 0.7);
  color: white;
  border: none;
  padding: 14px 26px;
  border-radius: 6px;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
}

.fav-btn:hover, .details-btn:hover {
  background-color: rgba(71, 71, 71, 0.9);
  transform: scale(1.05);
}

.play-icon, .heart-icon, .info-icon {
  font-style: normal;
}

.banner-indicators {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 3;
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator.active {
  background-color: white;
  width: 24px;
  border-radius: 6px;
}

.home {
  background-color: #000;
  padding-bottom: 40px;
}

.no-results {
  text-align: center;
  padding: 40px;
  color: #ccc;
  font-size: 18px;
}

.form-container {
  margin: 30px auto;
  max-width: 500px;
  padding: 20px;
  background: #1c1c1c;
  color: white;
  border-radius: 10px;
}
textarea, select {
  width: 100%;
  margin: 10px 0;
  padding: 8px;
  background: #2a2a2a;
  color: white;
  border-radius: 5px;
  border: none;
}
button {
  margin-right: 10px;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  background: #3c8dbc;
  color: white;
  cursor: pointer;
}
</style>
