<template>
  <div class="home">
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

    <MovieCarousel title="Filmes Populares" />
    <MovieCarousel title="Lançamentos" />
    <MovieCarousel title="Clássicos" />
  </div>
</template>

<script>
import MovieCarousel from '@/components/MovieCarousel.vue'

export default {
  name: 'MovieHome',
  components: {
    MovieCarousel
  }
}
</script>
<style scoped>
.banner {
  background: linear-gradient(to right, #0f0f0f, #444);
  color: white;
  display: flex;
  align-items: center;
  min-height: 50vh;
  padding: 60px 80px;
  position: relative;
  text-align: left;
}

.banner-content {
  max-width: 700px;
  margin-left: 0;
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
  background-color: red;
  color: white;
  padding: 14px 26px; 
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  font-size: 16px;
}

.fav-btn, .details-btn {
  background-color: transparent;
  color: white;
  border: 1px solid white;
  padding: 14px 26px;
  border-radius: 6px;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
}

.home {
  background-color: #000;
  padding-bottom: 40px;
}
</style>
