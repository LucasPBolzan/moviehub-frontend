// src/stores/user.js
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {
      id: null,
      name: ''
    }
  }),
  actions: {
    login(userData) {
      this.user = userData
    },
    logout() {
      this.user = { id: null, name: '' }
    }
  },
  persist: true // opcional, para manter o usuário logado
})
