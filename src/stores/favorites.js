import { defineStore } from 'pinia'
import axios from 'axios'

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    favorites: [],
    favoriteMovies: []
  }),
  actions: {
    async loadUserFavorites() {
      try {
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null')
        if (currentUser) {
          const response = await axios.get(`http://localhost:8080/favorites/user/${currentUser.name}`)
          this.favorites = response.data
          
          // Buscar dados completos dos filmes favoritos
          const allMovies = [
            { id: 1, title: 'Dune: Part Two', year: 2024, rating: 8.5, genres: ['Sci-Fi', 'Adventure'], poster: 'https://i.ytimg.com/vi/53BBRKF-L60/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGH8gQygTMA8=&rs=AOn4CLDgS78KBd_b20u0o-YBvLDGs6De2A', trailer: 'https://www.youtube.com/watch?v=Way9Dexny3w' },
            { id: 2, title: 'Oppenheimer', year: 2023, rating: 8.3, genres: ['Biography', 'Drama'], poster: 'https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_.jpg', trailer: 'https://www.youtube.com/watch?v=uYPbbksJxIg' },
            { id: 3, title: 'Barbie', year: 2023, rating: 7.0, genres: ['Comedy', 'Adventure'], poster: 'https://m.media-amazon.com/images/M/MV5BNjU3N2QxNzYtMjk1NC00MTc4LTk1NTQtMmUxNTljM2I0NDA5XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg', trailer: 'https://www.youtube.com/watch?v=pBk4NYhWNMM' },
            { id: 4, title: 'Spider-Man: Across the Spider-Verse', year: 2023, rating: 8.7, genres: ['Animation', 'Action'], poster: 'https://m.media-amazon.com/images/M/MV5BMzI0NmVkMjEtYmY4MS00ZDMxLTlkZmEtMzU4MDQxYTMzMjU2XkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_.jpg', trailer: 'https://www.youtube.com/watch?v=cqGjhVJWtEg' },
            { id: 5, title: 'John Wick: Chapter 4', year: 2023, rating: 7.7, genres: ['Action', 'Thriller'], poster: 'https://m.media-amazon.com/images/M/MV5BMDExZGMyOTMtMDgyYi00NGIwLWJhMTEtOTdkZGFjNmZiMTEwXkEyXkFqcGdeQXVyMjM4NTM5NDY@._V1_.jpg', trailer: 'https://www.youtube.com/watch?v=qEVUtrk8_B4' },
            { id: 6, title: 'Avatar: The Way of Water', year: 2022, rating: 7.6, genres: ['Sci-Fi', 'Adventure'], poster: 'https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_.jpg', trailer: 'https://www.youtube.com/watch?v=d9MyW72ELq0' },
            { id: 7, title: 'The Batman', year: 2022, rating: 8.0, genres: ['Action', 'Drama'], poster: 'https://blogs.uai.com.br/opipoqueiro/wp-content/uploads/sites/54/2022/02/Batman-01.jpg', trailer: 'https://www.youtube.com/watch?v=mqqft2x_Aa4' },
            { id: 8, title: 'Everything Everywhere All at Once', year: 2022, rating: 8.1, genres: ['Comedy', 'Sci-Fi'], poster: 'https://m.media-amazon.com/images/M/MV5BYTdiOTIyZTQtNmQ1OS00NjZlLWIyMTgtYzk5Y2M3ZDVmMDk1XkEyXkFqcGdeQXVyMTAzMDg4NzU0._V1_.jpg', trailer: 'https://www.youtube.com/watch?v=WLJJXKWACNw' },
            { id: 9, title: 'The Whale', year: 2022, rating: 7.8, genres: ['Drama'], poster: 'https://m.media-amazon.com/images/M/MV5BZDQ4Njg4YTctNGZkYi00NWU1LWI4OTYtNmNjOWMyMjI1NWYzXkEyXkFqcGdeQXVyMTA3MDk2NDg2._V1_.jpg', trailer: 'https://www.youtube.com/watch?v=yGKyCkNL85o' },
            { id: 10, title: 'Top Gun: Maverick', year: 2022, rating: 8.3, genres: ['Action', 'Drama'], poster: 'https://m.media-amazon.com/images/M/MV5BZWYzOGEwNTgtNWU3NS00ZTQ0LWJkODUtMmVhMjIwMjA1ZmQwXkEyXkFqcGdeQXVyMjkwOTAyMDU@._V1_.jpg', trailer: 'https://www.youtube.com/watch?v=giXco2jaZ_4' },
            { id: 11, title: 'Killers of the Flower Moon', year: 2023, rating: 7.7, genres: ['Crime', 'Drama'], poster: 'https://www.kaiakpj.it/wp-content/uploads/2024/02/Flower-Moon-horiz.jpg', trailer: 'https://www.youtube.com/watch?v=EP34Yoxs3FQ' },
            { id: 12, title: 'Poor Things', year: 2023, rating: 8.0, genres: ['Comedy', 'Drama', 'Romance'], poster: 'https://m.media-amazon.com/images/M/MV5BNGIyYWMzNjktNDE3MC00YWQyLWEyMmEtN2ZmNzZhZDk3NGJlXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg', trailer: 'https://www.youtube.com/watch?v=RlbR5N6veqw' },
            { id: 13, title: 'The Holdovers', year: 2023, rating: 7.9, genres: ['Comedy', 'Drama'], poster: 'https://m.media-amazon.com/images/M/MV5BNDc2MzNkMjMtZDY5NC00NmQ0LWI1NjctZjRhNWIzZjc4MGRiXkEyXkFqcGdeQXVyMjkwOTAyMDU@._V1_.jpg', trailer: 'https://www.youtube.com/watch?v=VjUt7E-6WpU' },
            { id: 14, title: 'Godzilla x Kong: The New Empire', year: 2024, rating: 6.5, genres: ['Action', 'Adventure', 'Sci-Fi'], poster: 'https://cdn.ome.lt/96h-1vw_vWlSFZXvRS1P_BkVhUs=/570x0/smart/uploads/conteudo/fotos/CAPA-godzilla-vs-kong_3nvSvre.png', trailer: 'https://www.youtube.com/watch?v=lV1OOlGwExM' },
            { id: 15, title: 'Deadpool & Wolverine', year: 2024, rating: 8.2, genres: ['Action', 'Adventure', 'Comedy'], poster: 'https://s2-g1.glbimg.com/k6J0DsMl3_w3evhEsSfoP4348Tg=/0x0:1080x1350/1008x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2024/4/m/NsJJlvTLCRvEs8KBowrw/deadpool-e-wolverine-cartaz.jpg', trailer: 'https://www.youtube.com/watch?v=73_1biulkYk' }
          ]
          
          this.favoriteMovies = this.favorites.map(fav => 
            allMovies.find(movie => movie.id === fav.movieId)
          ).filter(Boolean)
        }
      } catch (error) {
        console.error('Erro ao carregar favoritos:', error)
        this.favorites = []
        this.favoriteMovies = []
      }
    },
    
    async toggleFavorite(movie) {
      try {
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null')
        if (!currentUser) return
        
        if (this.isFavorited(movie.id)) {
          await axios.delete(`http://localhost:8080/favorites/movie/${movie.id}/user/${currentUser.name}`)
        } else {
          await axios.post('http://localhost:8080/favorites', {
            movieId: movie.id,
            userName: currentUser.name
          })
        }
        
        await this.loadUserFavorites()
      } catch (error) {
        console.error('Erro ao alterar favorito:', error)
      }
    },
    
    isFavorited(id) {
      return this.favorites.some(fav => fav.movieId === id)
    }
  }
})
