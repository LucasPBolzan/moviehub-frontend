<template>
  <div class="home">
    <!-- Teste Simples -->
    <h1>Teste: Página Inicial</h1>

    <!-- Banner -->
    <section class="banner">
      <div class="banner-content">
        <h1>Dune: Part Two</h1>
        <div class="movie-info">
          <span class="rating">★ 8.5</span>
          <span>2024</span>
          <span>2h 46m</span>
          <span class="genre">Sci-Fi</span>
          <span class="genre">Adventure</span>
          <span class="genre">Drama</span>
        </div>
        <p>
          Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family.
        </p>
        <div class="actions">
          <button class="play-btn">Assistir Trailer</button>
          <button class="fav-btn">Adicionar aos Favoritos</button>
          <button class="details-btn">Ver Detalhes</button>
        </div>
      </div>
    </section>

    <!-- Catálogo de Filmes -->
    <section class="catalog">
      <h2>Catálogo de Filmes</h2>
      <div class="movie-grid">
        <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
      </div>
    </section>
  </div>
</template>

<script>
import MovieCard from '@/components/MovieCard.vue'

export default {
  name: 'MovieHome',
  components: {
    MovieCard
  },
  data() {
    return {
      movies: [
        { id: 1, title: 'Dune: Part Two', year: 2024, rating: 8.5, genres: ['Sci-Fi', 'Adventure'] },
        { id: 2, title: 'Oppenheimer', year: 2023, rating: 8.3, genres: ['Biography', 'Drama'] },
        { id: 3, title: 'Barbie', year: 2023, rating: 7.0, genres: ['Comedy'] },
        { id: 4, title: 'Spider-Man: Across the Spider-Verse', year: 2023, rating: 8.7, genres: ['Animation', 'Action'] },
        { id: 5, title: 'John Wick: Chapter 4', year: 2023, rating: 7.7, genres: ['Action', 'Thriller'] },
        { id: 6, title: 'Avatar: The Way of Water', year: 2022, rating: 7.6, genres: ['Sci-Fi', 'Adventure'] }
      ]
    }
  }
}
</script>

<style scoped>
.home {
  padding: 20px;
}

.banner {
  background: linear-gradient(to right, #333, #666);
  padding: 40px;
  border-radius: 10px;
  margin-bottom: 20px;
}

.banner-content h1 {
  font-size: 36px;
  margin-bottom: 10px;
}

.movie-info span {
  margin-right: 10px;
}

.movie-info .rating {
  color: gold;
}

.movie-info .genre {
  background-color: #444;
  padding: 2px 8px;
  border-radius: 5px;
}

.actions {
  margin-top: 20px;
}

.play-btn {
  background-color: red;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  margin-right: 10px;
}

.fav-btn, .details-btn {
  background-color: transparent;
  color: white;
  border: 1px solid white;
  padding: 10px 20px;
  border-radius: 5px;
  margin-right: 10px;
}

.catalog h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}
</style>