<template>
  <div class="review-form" v-if="movie">
    <h1>Avaliar Filme</h1>
    <p>Você está avaliando o filme: <strong>{{ movie.title }}</strong></p>

    <div class="stars">
      <span
        v-for="star in 5"
        :key="star"
        class="star"
        :class="{ selected: star <= rating }"
        @click="setRating(star)"
      >
        ★
      </span>
    </div>

    <textarea v-model="comment" placeholder="Escreva seu comentário..."></textarea>

    <button @click="submitReview">Enviar Avaliação</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { useUserStore } from '../stores/user'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const movieId = route.params.id

const movie = ref({
  title: '',
  year: '',
  poster: '',
  genres: []
})

const rating = ref(0)
const comment = ref('')

function setRating(value) {
  rating.value = value
}

async function loadMovie() {
  try {
    const res = await axios.get(`http://localhost:8080/movies/${movieId}`)
    movie.value = res.data
  } catch (err) {
    console.error('Erro ao carregar filme:', err)
  }
}

async function submitReview() {
  if (rating.value === 0 || comment.value.trim() === '') {
    alert('Por favor, selecione uma nota e escreva um comentário.')
    return
  }

  const payload = {
    author: userStore.user.name,
    comment: comment.value,
    rating: rating.value,
    movie: { id: movieId }
  }

  console.log('➡️ Dados enviados para avaliação:', payload)

  try {
    const response = await axios.post('http://localhost:8080/reviews', payload)
    console.log('✅ Avaliação enviada com sucesso:', response.data)

    alert('Avaliação enviada com sucesso!')
    router.push({ name: 'MovieInfo', params: { id: movieId } })
  } catch (err) {
    console.error('❌ Erro ao enviar avaliação:', err)

    if (err.response) {
      console.error('⛔ Backend respondeu com erro:')
      console.error('🔢 Status:', err.response.status)
      console.error('📄 Dados:', err.response.data)
      console.error('📋 Headers:', err.response.headers)
      alert(`Erro do servidor (${err.response.status}): ${JSON.stringify(err.response.data)}`)
    } else if (err.request) {
      console.error('❌ Requisição enviada, mas sem resposta:')
      console.error(err.request)
      alert('A requisição foi enviada, mas o servidor não respondeu.')
    } else {
      console.error('⚠️ Erro ao configurar a requisição:', err.message)
      alert(`Erro na requisição: ${err.message}`)
    }
  }
}

onMounted(loadMovie)
</script>

<style scoped>
.review-form {
  padding: 20px;
  background: #121212;
  color: white;
  min-height: 100vh;
}

.stars {
  font-size: 30px;
  color: #444;
  margin: 10px 0;
  cursor: pointer;
}

.star.selected {
  color: gold;
}

textarea {
  width: 100%;
  min-height: 100px;
  margin-top: 10px;
  padding: 10px;
  font-size: 16px;
  background: #1e1e1e;
  color: white;
  border: 1px solid #444;
  border-radius: 5px;
}

button {
  margin-top: 15px;
  background: #3c8dbc;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background: #337ab7;
}
</style>
