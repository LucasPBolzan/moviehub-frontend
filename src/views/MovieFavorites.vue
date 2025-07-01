<template>
  <div class="favorites">
    <div class="favorites-header">
      <h1>Meus Filmes Favoritos</h1>
      <p v-if="favorites.length > 0" class="favorites-count">{{ favorites.length }} filme{{ favorites.length > 1 ? 's' : '' }} favoritado{{ favorites.length > 1 ? 's' : '' }}</p>
    </div>

    <div v-if="favorites.length === 0" class="empty-state">
      <div class="empty-icon">♥</div>
      <h2>Nenhum filme favoritado ainda</h2>
      <p>Explore nosso catálogo e adicione filmes aos seus favoritos!</p>
      <router-link to="/" class="browse-btn">Explorar Filmes</router-link>
    </div>

    <div v-else class="favorites-grid">
      <MovieCard 
        v-for="movie in favorites" 
        :key="movie.id" 
        :movie="movie" 
        class="favorite-card"
      />
    </div>
  </div>
</template>

<script>
import { useFavoritesStore } from '@/stores/favorites'
import MovieCard from '@/components/MovieCard.vue'
import { computed, onMounted } from 'vue'

export default {
  name: 'MovieFavorites',
  components: {
    MovieCard
  },
  setup() {
    const favStore = useFavoritesStore()

    const favorites = computed(() => favStore.favorites)

    onMounted(() => {
      // Garantir que os favoritos do usuário estão carregados
      favStore.loadUserFavorites()
    })

    return {
      favorites
    }
  }
}
</script>

<style scoped>
.favorites {
  background-color: #000;
  min-height: 100vh;
  color: white;
  padding: 40px 60px;
}

.favorites-header {
  margin-bottom: 40px;
  text-align: center;
}

.favorites-header h1 {
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 10px;
  background: linear-gradient(45deg, #e50914, #ff6b6b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.favorites-count {
  font-size: 18px;
  color: #ccc;
  margin: 0;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
}

.empty-icon {
  font-size: 120px;
  color: #333;
  margin-bottom: 30px;
}

.empty-state h2 {
  font-size: 32px;
  margin-bottom: 15px;
  color: #ccc;
}

.empty-state p {
  font-size: 18px;
  color: #999;
  margin-bottom: 30px;
  max-width: 400px;
}

.browse-btn {
  background-color: #e50914;
  color: white;
  padding: 15px 30px;
  border-radius: 8px;
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;
  transition: all 0.3s ease;
  display: inline-block;
}

.browse-btn:hover {
  background-color: #f40612;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(229, 9, 20, 0.4);
}

.favorites-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 30px;
  justify-items: center;
}

.favorite-card {
  transition: transform 0.3s ease;
}

.favorite-card:hover {
  transform: translateY(-5px);
}

/* Responsividade */
@media (max-width: 1200px) {
  .favorites-grid {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 25px;
  }
}

@media (max-width: 768px) {
  .favorites {
    padding: 20px;
  }
  
  .favorites-header h1 {
    font-size: 32px;
  }
  
  .favorites-grid {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 20px;
  }
  
  .empty-state h2 {
    font-size: 24px;
  }
  
  .empty-icon {
    font-size: 80px;
  }
}

@media (max-width: 480px) {
  .favorites-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }
}
</style>