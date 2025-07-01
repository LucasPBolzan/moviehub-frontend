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
          <div class="action-buttons">
            <button v-if="movie.trailer" @click="watchTrailer" class="trailer-btn">
              ▶ Ver Trailer
            </button>
          </div>
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
          { id: 1, title: 'Dune: Part Two', year: 2024, rating: 8.5, genres: ['Sci-Fi', 'Adventure'], poster: 'https://i.ytimg.com/vi/53BBRKF-L60/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGH8gQygTMA8=&rs=AOn4CLDgS78KBd_b20u0o-YBvLDGs6De2A', backdrop: 'https://i.ytimg.com/vi/53BBRKF-L60/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGH8gQygTMA8=&rs=AOn4CLDgS78KBd_b20u0o-YBvLDGs6De2A', description: 'Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family.', trailer: 'https://www.youtube.com/watch?v=Way9Dexny3w' },
          { id: 2, title: 'Oppenheimer', year: 2023, rating: 8.3, genres: ['Biography', 'Drama'], poster: 'https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_.jpg', backdrop: 'https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_.jpg', description: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.', trailer: 'https://www.youtube.com/watch?v=uYPbbksJxIg' },
          { id: 3, title: 'Barbie', year: 2023, rating: 7.0, genres: ['Comedy', 'Adventure'], poster: 'https://m.media-amazon.com/images/M/MV5BNjU3N2QxNzYtMjk1NC00MTc4LTk1NTQtMmUxNTljM2I0NDA5XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg', backdrop: 'https://m.media-amazon.com/images/M/MV5BNjU3N2QxNzYtMjk1NC00MTc4LTk1NTQtMmUxNTljM2I0NDA5XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg', description: 'Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land.', trailer: 'https://www.youtube.com/watch?v=pBk4NYhWNMM' },
          { id: 4, title: 'Spider-Man: Across the Spider-Verse', year: 2023, rating: 8.7, genres: ['Animation', 'Action'], poster: 'https://m.media-amazon.com/images/M/MV5BMzI0NmVkMjEtYmY4MS00ZDMxLTlkZmEtMzU4MDQxYTMzMjU2XkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_.jpg', backdrop: 'https://m.media-amazon.com/images/M/MV5BMzI0NmVkMjEtYmY4MS00ZDMxLTlkZmEtMzU4MDQxYTMzMjU2XkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_.jpg', description: 'After reuniting with Gwen Stacy, Miles Morales finds himself catapulted across the Multiverse, where he encounters a team of Spider-People.', trailer: 'https://www.youtube.com/watch?v=cqGjhVJWtEg' },
          { id: 5, title: 'John Wick: Chapter 4', year: 2023, rating: 7.7, genres: ['Action', 'Thriller'], poster: 'https://m.media-amazon.com/images/M/MV5BMDExZGMyOTMtMDgyYi00NGIwLWJhMTEtOTdkZGFjNmZiMTEwXkEyXkFqcGdeQXVyMjM4NTM5NDY@._V1_.jpg', backdrop: 'https://m.media-amazon.com/images/M/MV5BMDExZGMyOTMtMDgyYi00NGIwLWJhMTEtOTdkZGFjNmZiMTEwXkEyXkFqcGdeQXVyMjM4NTM5NDY@._V1_.jpg', description: 'John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy.', trailer: 'https://www.youtube.com/watch?v=qEVUtrk8_B4' },
          { id: 6, title: 'Avatar: The Way of Water', year: 2022, rating: 7.6, genres: ['Sci-Fi', 'Adventure'], poster: 'https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_.jpg', backdrop: 'https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_.jpg', description: 'Set more than a decade after the events of the first film, Avatar: The Way of Water begins to tell the story of the Sully family.', trailer: 'https://www.youtube.com/watch?v=d9MyW72ELq0' },
          { id: 7, title: 'The Batman', year: 2022, rating: 8.0, genres: ['Action', 'Drama'], poster: 'https://blogs.uai.com.br/opipoqueiro/wp-content/uploads/sites/54/2022/02/Batman-01.jpg', backdrop: 'https://blogs.uai.com.br/opipoqueiro/wp-content/uploads/sites/54/2022/02/Batman-01.jpg', description: 'When the Riddler, a sadistic serial killer, begins murdering key political figures in Gotham, Batman is forced to investigate the citys hidden corruption.', trailer: 'https://www.youtube.com/watch?v=mqqft2x_Aa4' },
          { id: 8, title: 'Everything Everywhere All at Once', year: 2022, rating: 8.1, genres: ['Comedy', 'Sci-Fi'], poster: 'https://m.media-amazon.com/images/M/MV5BYTdiOTIyZTQtNmQ1OS00NjZlLWIyMTgtYzk5Y2M3ZDVmMDk1XkEyXkFqcGdeQXVyMTAzMDg4NzU0._V1_.jpg', backdrop: 'https://m.media-amazon.com/images/M/MV5BYTdiOTIyZTQtNmQ1OS00NjZlLWIyMTgtYzk5Y2M3ZDVmMDk1XkEyXkFqcGdeQXVyMTAzMDg4NzU0._V1_.jpg', description: 'An aging Chinese immigrant is swept up in an insane adventure, where she alone can save what is important to her by connecting with the lives she could have led.', trailer: 'https://www.youtube.com/watch?v=WLJJXKWACNw' },
          { id: 9, title: 'The Whale', year: 2022, rating: 7.8, genres: ['Drama'], poster: 'https://m.media-amazon.com/images/M/MV5BZDQ4Njg4YTctNGZkYi00NWU1LWI4OTYtNmNjOWMyMjI1NWYzXkEyXkFqcGdeQXVyMTA3MDk2NDg2._V1_.jpg', backdrop: 'https://m.media-amazon.com/images/M/MV5BZDQ4Njg4YTctNGZkYi00NWU1LWI4OTYtNmNjOWMyMjI1NWYzXkEyXkFqcGdeQXVyMTA3MDk2NDg2._V1_.jpg', description: 'A reclusive, morbidly obese English teacher attempts to reconnect with his estranged teenage daughter.', trailer: 'https://www.youtube.com/watch?v=yGKyCkNL85o' },
          { id: 10, title: 'Top Gun: Maverick', year: 2022, rating: 8.3, genres: ['Action', 'Drama'], poster: 'https://m.media-amazon.com/images/M/MV5BZWYzOGEwNTgtNWU3NS00ZTQ0LWJkODUtMmVhMjIwMjA1ZmQwXkEyXkFqcGdeQXVyMjkwOTAyMDU@._V1_.jpg', backdrop: 'https://m.media-amazon.com/images/M/MV5BZWYzOGEwNTgtNWU3NS00ZTQ0LWJkODUtMmVhMjIwMjA1ZmQwXkEyXkFqcGdeQXVyMjkwOTAyMDU@._V1_.jpg', description: 'After thirty years, Maverick is still pushing the envelope as a top naval aviator, but must confront ghosts of his past when he leads TOP GUNs elite graduates on a mission.', trailer: 'https://www.youtube.com/watch?v=giXco2jaZ_4' },
          { id: 11, title: 'Killers of the Flower Moon', year: 2023, rating: 7.7, genres: ['Crime', 'Drama'], poster: 'https://www.kaiakpj.it/wp-content/uploads/2024/02/Flower-Moon-horiz.jpg', backdrop: 'https://www.kaiakpj.it/wp-content/uploads/2024/02/Flower-Moon-horiz.jpg', description: 'When oil is discovered in 1920s Oklahoma under Osage Nation land, the Osage people are murdered one by one - until the FBI steps in to unravel the mystery.', trailer: 'https://www.youtube.com/watch?v=EP34Yoxs3FQ' },
          { id: 12, title: 'Poor Things', year: 2023, rating: 8.0, genres: ['Comedy', 'Drama', 'Romance'], poster: 'https://m.media-amazon.com/images/M/MV5BNGIyYWMzNjktNDE3MC00YWQyLWEyMmEtN2ZmNzZhZDk3NGJlXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg', backdrop: 'https://m.media-amazon.com/images/M/MV5BNGIyYWMzNjktNDE3MC00YWQyLWEyMmEtN2ZmNzZhZDk3NGJlXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg', description: 'The incredible tale of Bella Baxter, a young woman brought back to life by the brilliant and unorthodox scientist Dr. Godwin Baxter.', trailer: 'https://www.youtube.com/watch?v=RlbR5N6veqw' },
          { id: 13, title: 'The Holdovers', year: 2023, rating: 7.9, genres: ['Comedy', 'Drama'], poster: 'https://m.media-amazon.com/images/M/MV5BNDc2MzNkMjMtZDY5NC00NmQ0LWI1NjctZjRhNWIzZjc4MGRiXkEyXkFqcGdeQXVyMjkwOTAyMDU@._V1_.jpg', backdrop: 'https://m.media-amazon.com/images/M/MV5BNDc2MzNkMjMtZDY5NC00NmQ0LWI1NjctZjRhNWIzZjc4MGRiXkEyXkFqcGdeQXVyMjkwOTAyMDU@._V1_.jpg', description: 'A cranky history teacher at a remote prep school is forced to remain on campus over the holidays with a brainy but damaged student.', trailer: 'https://www.youtube.com/watch?v=VjUt7E-6WpU' },
          { id: 14, title: 'Godzilla x Kong: The New Empire', year: 2024, rating: 6.5, genres: ['Action', 'Adventure', 'Sci-Fi'], poster: 'https://cdn.ome.lt/96h-1vw_vWlSFZXvRS1P_BkVhUs=/570x0/smart/uploads/conteudo/fotos/CAPA-godzilla-vs-kong_3nvSvre.png', backdrop: 'https://cdn.ome.lt/96h-1vw_vWlSFZXvRS1P_BkVhUs=/570x0/smart/uploads/conteudo/fotos/CAPA-godzilla-vs-kong_3nvSvre.png', description: 'Two ancient titans, Godzilla and Kong, clash in an epic battle as humans unravel their intertwined origins and connection to Skull Island mysteries.', trailer: 'https://www.youtube.com/watch?v=lV1OOlGwExM' },
          { id: 15, title: 'Deadpool & Wolverine', year: 2024, rating: 8.2, genres: ['Action', 'Adventure', 'Comedy'], poster: 'https://s2-g1.glbimg.com/k6J0DsMl3_w3evhEsSfoP4348Tg=/0x0:1080x1350/1008x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2024/4/m/NsJJlvTLCRvEs8KBowrw/deadpool-e-wolverine-cartaz.jpg', backdrop: 'https://s2-g1.glbimg.com/k6J0DsMl3_w3evhEsSfoP4348Tg=/0x0:1080x1350/1008x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2024/4/m/NsJJlvTLCRvEs8KBowrw/deadpool-e-wolverine-cartaz.jpg', description: 'Deadpool enlists the help of Wolverine to save his universe in an epic adventure across the multiverse.', trailer: 'https://www.youtube.com/watch?v=73_1biulkYk' }
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
          movieId: this.movie.id,
          rating: this.newReview.rating,
          comment: this.newReview.comment,
          userName: currentUser.name
        }

        console.log('Enviando dados:', reviewData)
        
        const response = await axios.post('http://localhost:8080/reviews', reviewData, {
          headers: {
            'Content-Type': 'application/json'
          }
        })

        console.log('Resposta do servidor:', response.data)

        // Atualizar lista de avaliações
        await this.loadReviews()

        // Limpar formulário
        this.newReview.rating = 0
        this.newReview.comment = ''
        this.showReviewForm = false

        alert('Avaliação enviada com sucesso!')
      } catch (error) {
        console.error('Erro completo:', error)
        console.error('Resposta do erro:', error.response?.data)
        console.error('Status do erro:', error.response?.status)
        alert('Erro ao enviar avaliação: ' + (error.response?.data?.message || error.message))
      }
    },

    watchTrailer() {
      if (this.movie.trailer) {
        window.open(this.movie.trailer, '_blank')
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

.action-buttons {
  margin-top: 20px;
}

.trailer-btn {
  background-color: #e50914;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
}

.trailer-btn:hover {
  background-color: #f40612;
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