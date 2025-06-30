<template>
  <div class="movie-info">
    <div class="poster-section">
      <img :src="movie.poster || ''" alt="Poster" />
    </div>

    <div class="info-section">
      <h1>{{ movie.title }} ({{ movie.year }})</h1>
      <p><strong>Nota:</strong> ★ {{ movie.rating }}</p>

      <div class="genres">
        <strong>Gêneros:</strong>
        <span v-for="genre in movie.genres" :key="genre" class="genre">{{ genre }}</span>
      </div>

      <div class="reviews">
        <h2>Avaliações dos usuários</h2>

        <ul v-if="userReviews.length > 0">
          <li v-for="review in userReviews" :key="review.id">
            <div class="review-header">
              <strong>{{ review.user.name }}</strong>
              <div class="stars">
                <span
                  v-for="n in 5"
                  :key="n"
                  class="star"
                  :class="{ active: n <= review.rating }"
                >★</span>
              </div>
            </div>
            <p>{{ review.comment }}</p>
          </li>
        </ul>

        <p v-else>Nenhuma avaliação encontrada para este filme.</p>
      </div>

      <button class="avaliar-btn" @click="avaliarFilme">
        Avaliar este filme
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const movieId = route.params.id

const movie = ref({
  poster: '',
  title: '',
  year: '',
  rating: '',
  genres: []
})
const userReviews = ref([])

async function carregarFilme() {
  try {
    const response = await axios.get(`http://localhost:8080/movies/${movieId}`)
    movie.value = response.data
  } catch (error) {
    console.error('Erro ao carregar filme:', error)
  }
}

async function carregarAvaliacoes() {
  try {
    const response = await axios.get(`http://localhost:8080/reviews?movieId=${movieId}`)
    userReviews.value = response.data
  } catch (error) {
    console.error('Erro ao buscar avaliações:', error)
  }
}

onMounted(async () => {
  await carregarFilme()
  await carregarAvaliacoes()
})

function avaliarFilme() {
  router.push({ name: 'MovieReview', params: { id: movieId } })
}
</script>

<style scoped>
.movie-info {
  display: flex;
  flex-direction: column;
  padding: 20px;
  color: white;
  background-color: #121212;
  min-height: 100vh;
}

.poster-section img {
  width: 100%;
  max-width: 300px;
  border-radius: 10px;
  margin-bottom: 20px;
}

.info-section {
  max-width: 700px;
}

.genres {
  margin: 10px 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.genre {
  background-color: #2a2a2a;
  padding: 5px 10px;
  border-radius: 6px;
  font-size: 13px;
}

.reviews {
  margin-top: 30px;
}

.reviews ul {
  list-style: none;
  padding-left: 0;
}

.reviews li {
  background-color: #1e1e1e;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 12px;
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.stars {
  font-size: 18px;
  color: #555;
}

.star.active {
  color: gold;
}

.avaliar-btn {
  margin-top: 20px;
  background: #3c8dbc;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
}

.avaliar-btn:hover {
  background: #337ab7;
}
</style>
