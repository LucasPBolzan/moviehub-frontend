
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {
      id: null,
      name: ''
    }
  }),
  getters: {
    isLoggedIn: (state) => state.user.id !== null && state.user.name !== ''
  },
  actions: {
    login(userData) {
      this.user = userData
      localStorage.setItem('currentUser', JSON.stringify(userData))
    },
    logout() {
      this.user = { id: null, name: '' }
      localStorage.removeItem('currentUser')
    },
    loadUserFromStorage() {
      const savedUser = localStorage.getItem('currentUser')
      if (savedUser) {
        this.user = JSON.parse(savedUser)
      }
    }
  }
})
