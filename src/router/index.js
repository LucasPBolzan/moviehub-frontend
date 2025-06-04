import { createRouter, createWebHistory } from 'vue-router'
import MovieHome from '../views/MovieHome.vue'
import MovieFavorites from '../views/MovieFavorites.vue'

const routes = [
  { path: '/', name: 'Home', component: MovieHome },
  { path: '/favorites', name: 'Favorites', component: MovieFavorites }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router