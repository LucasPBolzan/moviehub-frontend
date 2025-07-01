<template>
  <div class="carousel-container">
    <h2>{{ title }}</h2>
    <div class="carousel-controls">
      <button class="nav-btn prev" @click="scrollLeft">❮</button>
      <div class="carousel" ref="carousel">
        <MovieCard
          v-for="movie in movies"
          :key="movie.id"
          :movie="movie" @avaliar="$emit('avaliar', movie)"
          class="carousel-item"
        />
      </div>
      <button class="nav-btn next" @click="scrollRight">❯</button>
    </div>
  </div>
</template>

<script>
import MovieCard from '@/components/MovieCard.vue'

export default {
  name: 'MovieCarousel',
  components: { MovieCard },
  props: {
    title: {
      type: String,
      default: 'Filmes'
    },
    searchFilters: {
      type: Object,
      default: () => ({ query: '', genres: [] })
    }
  },
  data() {
    return {
      currentIndex: 0,
      autoScrollInterval: null,
      allMovies: [
        { id: 1, title: 'Dune: Part Two', year: 2024, rating: 8.5, genres: ['Sci-Fi', 'Adventure'], poster: 'https://i.ytimg.com/vi/53BBRKF-L60/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGH8gQygTMA8=&rs=AOn4CLDgS78KBd_b20u0o-YBvLDGs6De2A', trailer: 'https://www.youtube.com/watch?v=Way9Dexny3w' },
        { id: 2, title: 'Oppenheimer', year: 2023, rating: 8.3, genres: ['Biography', 'Drama'], poster: 'https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_.jpg', trailer: 'https://www.youtube.com/watch?v=uYPbbksJxIg' },
        { id: 3, title: 'Barbie', year: 2023, rating: 7.0, genres: ['Comedy', 'Adventure'], poster: 'https://m.media-amazon.com/images/M/MV5BNjU3N2QxNzYtMjk1NC00MTc4LTk1NTQtMmUxNTljM2I0NDA5XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg', trailer: 'https://www.youtube.com/watch?v=pBk4NYhWNMM' },
        { id: 4, title: 'Spider-Man: Across the Spider-Verse', year: 2023, rating: 8.7, genres: ['Animation', 'Action'], poster: 'https://m.media-amazon.com/images/M/MV5BMzI0NmVkMjEtYmY4MS00ZDMxLTlkZmEtMzU4MDQxYTMzMjU2XkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_.jpg', trailer: 'https://www.youtube.com/watch?v=cqGjhVJWtEg' },
        { id: 5, title: 'John Wick: Chapter 4', year: 2023, rating: 7.7, genres: ['Action', 'Thriller'], poster: 'https://m.media-amazon.com/images/M/MV5BMDExZGMyOTMtMDgyYi00NGIwLWJhMTEtOTdkZGFjNmZiMTEwXkEyXkFqcGdeQXVyMjM4NTM5NDY@._V1_.jpg', trailer: 'https://www.youtube.com/watch?v=qEVUtrk8_B4' },
        { id: 6, title: 'Avatar: The Way of Water', year: 2022, rating: 7.6, genres: ['Sci-Fi', 'Adventure'], poster: 'https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_.jpg', trailer: 'https://www.youtube.com/watch?v=d9MyW72ELq0' },
        { id: 7, title: 'The Batman', year: 2022, rating: 8.0, genres: ['Action', 'Drama'], poster: 'https://blogs.uai.com.br/opipoqueiro/wp-content/uploads/sites/54/2022/02/Batman-01.jpg', trailer: 'https://www.youtube.com/watch?v=mqqft2x_Aa4' },
        { id: 8, title: 'Everything Everywhere All at Once', year: 2022, rating: 8.1, genres: ['Comedy', 'Sci-Fi'], poster: 'https://m.media-amazon.com/images/M/MV5BYTdiOTIyZTQtNmQ1OS00NjZlLWIyMTgtYzk5Y2M3ZDVmMDk1XkEyXkFqcGdeQXVyMTAzMDg4NzU0._V1_.jpg', trailer: 'https://www.youtube.com/watch?v=WLJJXKWACNw' },
        { id: 9, title: 'The Whale', year: 2022, rating: 7.8, genres: ['Drama'], poster: 'https://m.media-amazon.com/images/M/MV5BZDQ4Njg4YTctNGZkYi00NWU1LWI4OTYtNmNjOWMyMjI1NWYzXkEyXkFqcGdeQXVyMTA3MDk2NDg2._V1_.jpg', trailer: 'https://www.youtube.com/watch?v=yGKyCkNL85o' },
        { id: 10, title: 'Top Gun: Maverick', year: 2022, rating: 8.3, genres: ['Action', 'Drama'], poster: 'https://m.media-amazon.com/images/M/MV5BZWYzOGEwNTgtNWU3NS00ZTQ0LWJkODUtMmVhMjIwMjA1ZmQwXkEyXkFqcGdeQXVyMjkwOTAyMDU@._V1_.jpg', trailer: 'https://www.youtube.com/watch?v=giXco2jaZ_4' },
        { id: 11, title: 'Killers of the Flower Moon', year: 2023, rating: 7.7, genres: ['Crime', 'Drama'], poster: 'https://www.kaiakpj.it/wp-content/uploads/2024/02/Flower-Moon-horiz.jpg', trailer: 'https://www.youtube.com/watch?v=EP34Yoxs3FQ' },
        { id: 12, title: 'Poor Things', year: 2023, rating: 8.0, genres: ['Comedy', 'Drama', 'Romance'], poster: 'https://m.media-amazon.com/images/M/MV5BNGIyYWMzNjktNDE3MC00YWQyLWEyMmEtN2ZmNzZhZDk3NGJlXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg', trailer: 'https://www.youtube.com/watch?v=RlbR5N6veqw' },
        { id: 13, title: 'The Holdovers', year: 2023, rating: 7.9, genres: ['Comedy', 'Drama'], poster: 'https://m.media-amazon.com/images/M/MV5BNDc2MzNkMjMtZDY5NC00NmQ0LWI1NjctZjRhNWIzZjc4MGRiXkEyXkFqcGdeQXVyMjkwOTAyMDU@._V1_.jpg', trailer: 'https://www.youtube.com/watch?v=VjUt7E-6WpU' },
        { id: 14, title: 'Godzilla x Kong: The New Empire', year: 2024, rating: 6.5, genres: ['Action', 'Adventure', 'Sci-Fi'], poster: 'https://cdn.ome.lt/96h-1vw_vWlSFZXvRS1P_BkVhUs=/570x0/smart/uploads/conteudo/fotos/CAPA-godzilla-vs-kong_3nvSvre.png', trailer: 'https://www.youtube.com/watch?v=lV1OOlGwExM' },
        { id: 15, title: 'Deadpool & Wolverine', year: 2024, rating: 8.2, genres: ['Action', 'Adventure', 'Comedy'], poster: 'https://s2-g1.glbimg.com/k6J0DsMl3_w3evhEsSfoP4348Tg=/0x0:1080x1350/1008x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2024/4/m/NsJJlvTLCRvEs8KBowrw/deadpool-e-wolverine-cartaz.jpg', trailer: 'https://www.youtube.com/watch?v=73_1biulkYk' }
      ]
    }
  },
  computed: {
    movies() {
      if (!this.searchFilters.query && this.searchFilters.genres.length === 0) {
        return this.allMovies;
      }

      return this.allMovies.filter(movie => {
        const titleMatch = !this.searchFilters.query || 
          movie.title.toLowerCase().includes(this.searchFilters.query.toLowerCase());

        const genreMatch = this.searchFilters.genres.length === 0 || 
          movie.genres.some(genre => this.searchFilters.genres.includes(genre));

        return titleMatch && genreMatch;
      });
    }
  },
  watch: {
    movies(newMovies) {
      this.$emit('update:movies', newMovies.length);
    }
  },
  mounted() {
    this.startAutoScroll()
  },
  beforeUnmount() {
    this.stopAutoScroll()
  },
  methods: {
    startAutoScroll() {
      this.autoScrollInterval = setInterval(() => {
        this.scrollRight()
      }, 4000)
    },
    stopAutoScroll() {
      if (this.autoScrollInterval) {
        clearInterval(this.autoScrollInterval)
        this.autoScrollInterval = null
      }
    },
    resetAutoScroll() {
      this.stopAutoScroll()
      this.startAutoScroll()
    },
    scrollLeft() {
      if (this.$refs.carousel) {
        this.$refs.carousel.scrollBy({ left: -600, behavior: 'smooth' })
        this.resetAutoScroll()
      }
    },
    scrollRight() {
      if (this.$refs.carousel) {
        const carousel = this.$refs.carousel
        const maxScroll = carousel.scrollWidth - carousel.clientWidth
        
        if (carousel.scrollLeft >= maxScroll - 10) {
          // Voltar ao início quando chegar no final
          carousel.scrollTo({ left: 0, behavior: 'smooth' })
        } else {
          carousel.scrollBy({ left: 600, behavior: 'smooth' })
        }
      }
    }
  }
}
</script>

<style scoped>
.carousel-container {
  padding: 20px;
  background-color: #0b0f1a;
  margin-bottom: 20px;
}

.carousel-container h2 {
  color: white;
  margin-bottom: 15px;
  font-size: 24px;
}

.carousel-controls {
  position: relative;
  display: flex;
  align-items: center;
}

.carousel {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding-bottom: 10px;
  scrollbar-width: thin;
  scroll-behavior: smooth;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.carousel::-webkit-scrollbar {
  display: none;
}

.carousel-item {
  flex: 0 0 auto;
}

.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: background-color 0.2s;
}

.nav-btn:hover {
  background-color: rgba(255, 0, 0, 0.7);
}

.prev {
  left: 0;
}

.next {
  right: 0;
}
</style>
