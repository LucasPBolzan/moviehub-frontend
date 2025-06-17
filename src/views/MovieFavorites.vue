<script>
import { useFavoritesStore } from '@/stores/favorites'

export default {
  name: 'MovieFavorites',
  setup() {
    const favStore = useFavoritesStore()
    return { favorites: favStore.favorites }
  }
}
</script>

<template>
  <div class="favorites">
    <h1>Favoritos</h1>
    <div v-if="favorites.length === 0">
      <p>Nenhum filme favoritado ainda.</p>
    </div>
    <div v-else>
      <ul>
        <li v-for="movie in favorites" :key="movie.id">
          {{ movie.title }} ({{ movie.year }})
        </li>
      </ul>
    </div>
  </div>
</template>
