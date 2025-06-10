import { createRouter, createWebHistory } from 'vue-router'
import MovieHome from '../views/MovieHome.vue'
import MovieFavorites from '../views/MovieFavorites.vue'
import MovieRegister from '../views/MovieRegister.vue' 
import MovieLogin from '../views/MovieLogin.vue'

const routes = [
  { path: '/', name: 'Home', component: MovieHome },
  { path: '/favorites', name: 'Favorites', component: MovieFavorites },
  { path: '/register', name: 'Register', component: MovieRegister },
  { path: '/login', name: 'Login', component: MovieLogin }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
