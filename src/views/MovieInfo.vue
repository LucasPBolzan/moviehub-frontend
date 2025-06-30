<template>
  <div class="movie-info">
    <div class="movie-hero" :style="heroStyle">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <div class="movie-poster">
          <img :src="movie.poster || 'https://via.placeholder.com/300x450?text=No+Image'" :alt="movie.title" />
        </div>
        <div class="movie-details">
          <h1>{{ movie.title }}</h1>
          <div class="movie-meta">
            <span class="year">{{ movie.year }}</span>
            <span class="rating">★ {{ movie.rating }}</span>
            <span class="duration">{{ movie.duration || '2h 30m' }}</span>
          </div>
          <div class="genres">
            <span v-for="genre in movie.genres" :key="genre" class="genre-tag">{{ genre }}</span>
          </div>
          <p class="description">{{ movie.description || 'Descrição não disponível.' }}</p>
        </div>
      </div>
    </div>

    <div class="content-section">
      <div class="reviews-section">
        <div class="section-header">
          <h2>Avaliações</h2>
          <button class="review-btn" @click="showReviewForm = !showReviewForm">
            {{ showReviewForm ? 'Cancelar' : 'Avaliar Filme' }}
          </button>
        </div>

        <!-- Formulário de avaliação -->
        <div v-if="showReviewForm" class="review-form">
          <h3>Sua Avaliação</h3>
          <div class="rating-input">
            <span>Nota:</span>
            <div class="stars-input">
              <span 
                v-for="n in 5" 
                :key="n" 
                class="star-input" 
                :class="{ active: n <= newReview.rating }"
                @click="newReview.rating = n"
              >★</span>
            </div>
          </div>
          <textarea 
            v-model="newReview.comment" 
            placeholder="Escreva sua avaliação..."
            rows="4"
          ></textarea>
          <div class="form-actions">
            <button @click="submitReview" class="submit-btn">Enviar Avaliação</button>
          </div>
        </div>

        <!-- Lista de avaliações -->
        <div class="reviews-list">
          <div v-if="userReviews.length === 0" class="no-reviews">
            Seja o primeiro a avaliar este filme!
          </div>
          <div v-else>
            <div v-for="review in userReviews" :key="review.id" class="review-card">
              <div class="review-header">
                <div class="user-info">
                  <div class="user-avatar">{{ review.userName ? review.userName.charAt(0).toUpperCase() : 'U' }}</div>
                  <span class="user-name">{{ review.userName || 'Usuário Anônimo' }}</span>
                </div>
                <div class="review-rating">
                  <span v-for="n in 5" :key="n" class="star" :class="{ active: n <= review.rating }">★</span>
                </div>
              </div>
              <p class="review-comment">{{ review.comment }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'MovieInfo',
  data() {
    return {
      movie: {
        id: null,
        title: '',
        year: '',
        rating: 0,
        genres: [],
        poster: '',
        description: '',
        backdrop: ''
      },
      userReviews: [],
      showReviewForm: false,
      newReview: {
        rating: 0,
        comment: ''
      }
    }
  },
  computed: {
    heroStyle() {
      return {
        backgroundImage: `url(${this.movie.backdrop || this.movie.poster || 'https://via.placeholder.com/1920x1080?text=Movie+Background'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }
    }
  },
  async mounted() {
    await this.loadMovie()
    await this.loadReviews()
  },
  methods: {
    async loadMovie() {
      try {
        const movieId = this.$route.params.id
        const allMovies = [
          {
            id: 1,
            title: 'Dune: Part Two',
            year: 2024,
            rating: 8.5,
            genres: ['Sci-Fi', 'Adventure'],
            poster: 'https://m.media-amazon.com/images/M/MV5BODI0YjNhNjUtYjM0My00MTUwLWFlYTMtMWI2NGUzYjNjNGQzXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg',
            backdrop: 'https://m.media-amazon.com/images/M/MV5BODI0YjNhNjUtYjM0My00MTUwLWFlYTMtMWI2NGUzYjNjNGQzXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg',
            description: 'Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family.'
          },
          {
            id: 2,
            title: 'Oppenheimer',
            year: 2023,
            rating: 8.3,
            genres: ['Biography', 'Drama'],
            poster: 'https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_.jpg',
            backdrop: 'https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_.jpg',
            description: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.'
          },
          {
            id: 3,
            title: 'Barbie',
            year: 2023,
            rating: 7.0,
            genres: ['Comedy', 'Adventure'],
            poster: 'https://m.media-amazon.com/images/M/MV5BNjU3N2QxNzYtMjk1NC00MTc4LTk1NTQtMmUxNTljM2I0NDA5XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg',
            backdrop: 'https://m.media-amazon.com/images/M/MV5BNjU3N2QxNzYtMjk1NC00MTc4LTk1NTQtMmUxNTljM2I0NDA5XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg',
            description: 'Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land.'
          },
          {
            id: 4,
            title: 'Spider-Man: Across the Spider-Verse',
            year: 2023,
            rating: 8.7,
            genres: ['Animation', 'Action'],
            poster: 'https://m.media-amazon.com/images/M/MV5BMzI0NmVkMjEtYmY4MS00ZDMxLTlkZmEtMzU4MDQxYTMzMjU2XkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_.jpg',
            backdrop: 'https://m.media-amazon.com/images/M/MV5BMzI0NmVkMjEtYmY4MS00ZDMxLTlkZmEtMzU4MDQxYTMzMjU2XkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_.jpg',
            description: 'After reuniting with Gwen Stacy, Miles Morales finds himself catapulted across the Multiverse, where he encounters a team of Spider-People.'
          },
          {
            id: 5,
            title: 'John Wick: Chapter 4',
            year: 2023,
            rating: 7.7,
            genres: ['Action', 'Thriller'],
            poster: 'https://m.media-amazon.com/images/M/MV5BMDExZGMyOTMtMDgyYi00NGIwLWJhMTEtOTdkZGFjNmZiMTEwXkEyXkFqcGdeQXVyMjM4NTM5NDY@._V1_.jpg',
            backdrop: 'https://m.media-amazon.com/images/M/MV5BMDExZGMyOTMtMDgyYi00NGIwLWJhMTEtOTdkZGFjNmZiMTEwXkEyXkFqcGdeQXVyMjM4NTM5NDY@._V1_.jpg',
            description: 'John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy.'
          }
        ]

        const foundMovie = allMovies.find(m => m.id == movieId)
        if (foundMovie) {
          this.movie = foundMovie
        }
      } catch (error) {
        console.error('Erro ao carregar filme:', error)
      }
    },

    async loadReviews() {
      try {
        const movieId = this.$route.params.id
        const response = await axios.get(`http://localhost:8080/reviews/movie/${movieId}`)
        this.userReviews = response.data
      } catch (error) {
        console.error('Erro ao carregar avaliações:', error)
        this.userReviews = []
      }
    },

    async submitReview() {
      if (!this.newReview.rating || !this.newReview.comment.trim()) {
        alert('Por favor, preencha todos os campos.')
        return
      }

      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{"name": "Usuário Anônimo"}')

      try {
        const reviewData = {
          movie: { id: this.movie.id },
          rating: this.newReview.rating,
          comment: this.newReview.comment,
          userName: currentUser.name
        }

        const response = await axios.post('http://localhost:8080/reviews', reviewData)

        // Atualizar lista de avaliações
        await this.loadReviews()

        // Limpar formulário
        this.newReview.rating = 0
        this.newReview.comment = ''
        this.showReviewForm = false

        alert('Avaliação enviada com sucesso!')
      } catch (error) {
        console.error('Erro ao enviar avaliação:', error)
        alert('Erro ao enviar avaliação. Tente novamente.')
      }
    }
  }
}
</script>


<style scoped>
.movie-info {
  background-color: #000;
  min-height: 100vh;
  color: white;
}

.movie-hero {
  position: relative;
  min-height: 70vh;
  display: flex;
  align-items: center;
  padding: 0 60px;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.4) 100%);
}

.hero-content {
  position: relative;
  z-index: 2;
  display: flex;
  gap: 40px;
  max-width: 1200px;
  width: 100%;
}

.movie-poster img {
  width: 300px;
  height: 450px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
}

.movie-details {
  flex: 1;
  max-width: 600px;
}

.movie-details h1 {
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
}

.movie-meta {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  font-size: 18px;
}

.year, .duration {
  color: #ccc;
}

.rating {
  color: gold;
  font-weight: bold;
}

.genres {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.genre-tag {
  background-color: rgba(30, 30, 30, 0.8);
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
}

.description {
  font-size: 18px;
  line-height: 1.6;
  color: #ccc;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.8);
}

.content-section {
  padding: 40px 60px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.section-header h2 {
  font-size: 28px;
  margin: 0;
}

.review-btn {
  background-color: #e50914;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.review-btn:hover {
  background-color: #f40612;
}

.review-form {
  background-color: #1a1a1a;
  padding: 30px;
  border-radius: 10px;
  margin-bottom: 30px;
}

.review-form h3 {
  margin-top: 0;
  margin-bottom: 20px;
}

.rating-input {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}

.stars-input {
  display: flex;
  gap: 5px;
}

.star-input {
  font-size: 24px;
  color: #555;
  cursor: pointer;
  transition: color 0.2s;
}

.star-input:hover,
.star-input.active {
  color: gold;
}

.review-form textarea,
.review-form input {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 6px;
  background-color: #2a2a2a;
  color: white;
  font-size: 16px;
  margin-bottom: 15px;
  resize: vertical;
}

.review-form textarea:focus,
.review-form input:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(229, 9, 20, 0.5);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
}

.submit-btn {
  background-color: #e50914;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.submit-btn:hover {
  background-color: #f40612;
}

.no-reviews {
  text-align: center;
  padding: 40px;
  color: #666;
  font-size: 18px;
}

.review-card {
  background-color: #1a1a1a;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #e50914;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 18px;
}

.user-name {
  font-weight: bold;
  font-size: 16px;
}

.review-rating .star {
  color: #555;
  font-size: 18px;
}

.review-rating .star.active {
  color: gold;
}

.review-comment {
  font-size: 16px;
  line-height: 1.5;
  color: #ccc;
  margin: 0;
}

@media (max-width: 768px) {
  .hero-content {
    flex-direction: column;
    text-align: center;
  }
  
  .movie-poster img {
    width: 250px;
    height: 375px;
  }
  
  .movie-details h1 {
    font-size: 32px;
  }
  
  .content-section {
    padding: 20px;
  }
}
</style>