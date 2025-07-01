import { defineStore } from 'pinia'

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    favorites: []
  }),
  actions: {
    loadUserFavorites() {
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null')
      if (currentUser) {
        const userFavorites = JSON.parse(localStorage.getItem(`favorites_${currentUser.id}`) || '[]')
        this.favorites = userFavorites
      } else {
        this.favorites = []
      }
    },
    saveUserFavorites() {
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null')
      if (currentUser) {
        localStorage.setItem(`favorites_${currentUser.id}`, JSON.stringify(this.favorites))
      }
    },
    toggleFavorite(movie) {
      const exists = this.favorites.find(m => m.id === movie.id)
      if (exists) {
        this.favorites = this.favorites.filter(m => m.id !== movie.id)
      } else {
        this.favorites.push(movie)
      }
      this.saveUserFavorites()
    },
    isFavorited(id) {
      return this.favorites.some(m => m.id === id)
    }
  }
})
