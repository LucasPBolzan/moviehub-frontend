<template>
  <div class="favorites">
    <h1>Favoritos</h1>

    <div v-if="favorites.length === 0">
      <p>Nenhum filme favoritado ainda.</p>
    </div>

    <div v-else>
      <ul>
        <li v-for="movie in favorites" :key="movie.id">
          <MovieCard :movie="movie" @avaliar="selecionarFilme" />
        </li>
      </ul>
    </div>

    <div v-if="filmeSelecionado" class="avaliacao-form">
      <h2>Avaliar: {{ filmeSelecionado.title }}</h2>
      <form @submit.prevent="enviarAvaliacao">
        <textarea
          v-model="comentario"
          placeholder="Escreva sua avaliação..."
          required
        ></textarea>
        <input
          type="number"
          v-model.number="nota"
          min="1"
          max="10"
          placeholder="Nota (1 a 10)"
          required
        />
        <button type="submit">Enviar Avaliação</button>
        <button @click="cancelar" type="button">Cancelar</button>
      </form>
    </div>
  </div>
</template>

<script>
import { useFavoritesStore } from '@/stores/favorites'
import MovieCard from '@/components/MovieCard.vue'
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'MovieFavorites',
  components: {
    MovieCard,
  },
  setup() {
    const favStore = useFavoritesStore()
    const route = useRoute()

    const favorites = ref(favStore.favorites)
    const filmeSelecionado = ref(null)
    const comentario = ref('')
    const nota = ref(null)

    // Se vier filme selecionado via query (ex: de outra página), abre o formulário automaticamente
    onMounted(() => {
      if (route.query.filmeSelecionado) {
        try {
          filmeSelecionado.value = JSON.parse(route.query.filmeSelecionado)
        } catch {
          filmeSelecionado.value = null
        }
      }
    })

    // Métodos
    function selecionarFilme(filme) {
      filmeSelecionado.value = filme
      comentario.value = ''
      nota.value = null
    }

    function cancelar() {
      filmeSelecionado.value = null
      comentario.value = ''
      nota.value = null
    }

    async function enviarAvaliacao() {
      try {
        await axios.post('http://localhost:8080/reviews', {
          movie: { id: filmeSelecionado.value.id },
          user: { id: 1 }, // ID fixo temporário, substitua conforme necessidade
          comment: comentario.value,
          rating: nota.value,
        })
        alert('Avaliação enviada com sucesso!')
        cancelar()
      } catch (error) {
        console.error(error)
        alert('Erro ao enviar avaliação.')
      }
    }

    return {
      favorites,
      filmeSelecionado,
      comentario,
      nota,
      selecionarFilme,
      cancelar,
      enviarAvaliacao,
    }
  },
}
</script>

<style scoped>
.favorites {
  padding: 20px;
  color: white;
}

.avaliacao-form {
  margin-top: 30px;
  background-color: #1a1a1a;
  padding: 20px;
  border-radius: 10px;
  max-width: 500px;
}

.avaliacao-form textarea,
.avaliacao-form input {
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
  border-radius: 5px;
  border: none;
  background: #2a2a2a;
  color: white;
}

.avaliacao-form button {
  padding: 8px 12px;
  margin-right: 10px;
  border: none;
  border-radius: 5px;
  background-color: #ff0000;
  color: white;
  cursor: pointer;
}

.avaliacao-form button:hover {
  background-color: #cc0000;
}
</style>
