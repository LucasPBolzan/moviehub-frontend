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
          <button class="play-btn"><i class="play-icon">▶</i> Assistir Trailer</button>
          <button class="fav-btn"><i class="heart-icon">♥</i> Adicionar aos Favoritos</button>
          <button class="details-btn"><i class="info-icon">i</i> Ver Detalhes</button>
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
      />
      <p v-if="!hasResults" class="no-results">Nenhum filme encontrado com os critérios de busca.</p>
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
      featuredMovies: [
        {
          id: 1,
          title: 'Dune: Part Two',
          year: 2024,
          rating: 8.5,
          duration: '2h 46m',
          genres: ['Sci-Fi', 'Adventure', 'Drama'],
          description: 'Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family.',
          backdrop: 'https://m.media-amazon.com/images/M/MV5BODI0YjNhNjUtYjM0My00MTUwLWFlYTMtMWI2NGUzYjNjNGQzXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg'
        },
        {
          id: 15,
          title: 'Deadpool & Wolverine',
          year: 2024,
          rating: 8.2,
          duration: '2h 7m',
          genres: ['Action', 'Adventure', 'Comedy'],
          description: 'Deadpool enlists the help of Wolverine to save his universe in an epic adventure across the multiverse.',
          backdrop: 'https://m.media-amazon.com/images/M/MV5BMDk2YzA4YzMtNGQ5YS00OGM1LWE5ZjUtN2NjODZhYTQ0YmJkXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg'
        },
        {
          id: 2,
          title: 'Oppenheimer',
          year: 2023,
          rating: 8.3,
          duration: '3h 0m',
          genres: ['Biography', 'Drama', 'History'],
          description: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.',
          backdrop: 'https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_.jpg'
        },
        {
          id: 14,
          title: 'Godzilla x Kong: The New Empire',
          year: 2024,
          rating: 6.5,
          duration: '1h 55m',
          genres: ['Action', 'Adventure', 'Sci-Fi'],
          description: 'Two ancient titans, Godzilla and Kong, clash in an epic battle as humans unravel their intertwined origins and connection to Skull Island mysteries.',
          backdrop: 'https://m.media-amazon.com/images/M/MV5BYmVlNWJmZWMtNzk3Yy00YjQyLTgzYmYtNzNjOTNkM2NkYjc4XkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg'
        }
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
    // Método updateSearch removido pois agora os filtros vêm como prop
    checkResults(count) {
      this.hasResults = count > 0
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
</style>
