<template>
  <div class="movie-card" @click="goToDetails">
    <div class="card-header">
      <div class="poster">
        <img :src="movie.poster || ''" alt="Poster" />
        <button class="fav-btn" :class="{ favorited: isFavorited }" @click.stop="toggle">
          ♥
        </button>
      </div>
    </div>

    <div class="card-footer">
      <h3>{{ movie.title }}</h3>
      <p class="year-rating">
        {{ movie.year }}
        <span class="rating">★ {{ movie.rating }}</span>
      </p>
      <div class="genres">
        <span v-for="genre in movie.genres" :key="genre" class="genre-tag">
          {{ genre }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { useFavoritesStore } from '@/stores/favorites'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

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
    const router = useRouter()

    const isFavorited = computed(() =>
      favStore.isFavorited(props.movie.id)
    )

    const toggle = () => {
      favStore.toggleFavorite(props.movie)
    }

    const goToDetails = () => {
      router.push({
        name: 'MovieInfo',
        params: { id: props.movie.id } // ← Corrigido: agora usa params, não query
      })
    }

    return { isFavorited, toggle, goToDetails }
  }
}
</script>

<style scoped>
.movie-card {
  background-color: #10131a;
  border-radius: 10px;
  overflow: hidden;
  width: 180px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.5);
  transition: transform 0.2s ease;
}
.movie-card:hover {
  transform: scale(1.03);
}
.card-header {
  position: relative;
}
.poster {
  height: 240px;
  background-color: #2a2a2a;
  display: flex;
  align-items: center;
  justify-content: center;
}
.poster img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.fav-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.6);
  border: none;
  color: #ccc;
  font-size: 20px;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
  transition: color 0.2s ease;
}
.fav-btn.favorited {
  color: red;
}
.card-footer {
  padding: 10px;
  background-color: #0d1117;
}
h3 {
  font-size: 15px;
  color: white;
  margin-bottom: 6px;
}
.year-rating {
  font-size: 14px;
  color: #aaa;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.rating {
  color: #f7c948;
  font-weight: bold;
}
.genres {
  margin-top: 6px;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}
.genre-tag {
  border: 1px solid #3c3c3c;
  color: #ccc;
  padding: 2px 6px;
  font-size: 12px;
  border-radius: 5px;
}
.avaliar-btn {
  margin-top: 10px;
  background: #3c8dbc;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}
.avaliar-btn:hover {
  background: #337ab7;
}
</style>
