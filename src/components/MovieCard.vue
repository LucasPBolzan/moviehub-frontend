<template>
  <div class="movie-card">
    <div class="placeholder-image"></div>
    <h3>{{ movie.title }}</h3>
    <p>{{ movie.year }}</p>
    <p class="rating">★ {{ movie.rating }}</p>
    <p>{{ movie.genres.join(', ') }}</p>
    <button class="fav-btn" :class="{ favorited: isFavorited }" @click="toggle">♥</button>
  </div>
</template>

<script>
import { useFavoritesStore } from '@/stores/favorites'
import { computed } from 'vue'

export default {
  name: 'MovieCard',
  props: {
    movie: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const favStore = useFavoritesStore()

    // Computado: verifica se o filme atual está favoritado
    const isFavorited = computed(() =>
      favStore.isFavorited(props.movie.id)
    )

    // Alterna o favorito no store
    const toggle = () => {
      favStore.toggleFavorite(props.movie)
    }

    return { isFavorited, toggle }
  }
}
</script>

<style scoped>
.movie-card {
  position: relative;
  background-color: #2a2a2a;
  padding: 10px;
  border-radius: 10px;
  text-align: left;
}

.placeholder-image {
  width: 100%;
  height: 150px;
  background-color: #444;
  border-radius: 5px;
  margin-bottom: 10px;
}

h3 {
  font-size: 18px;
  margin: 5px 0;
}

p {
  margin: 5px 0;
  color: #ccc;
}

.rating {
  color: gold;
}

.fav-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 20px;
  color: #ccc;
  cursor: pointer;
  transition: color 0.2s ease;
}

.fav-btn.favorited {
  color: red;
}
</style>
