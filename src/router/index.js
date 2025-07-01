import { createRouter, createWebHistory } from 'vue-router'
import MovieHome from '../views/MovieHome.vue'
import MovieFavorites from '../views/MovieFavorites.vue'
import MovieRegister from '../views/MovieRegister.vue'
import MovieLogin from '../views/MovieLogin.vue'
import MovieInfo from '../views/MovieInfo.vue'
import MovieReview from '../views/MovieReview.vue'

const routes = [
  { path: '/', name: 'Home', component: MovieHome },
  { path: '/favorites', name: 'Favorites', component: MovieFavorites },
  { path: '/register', name: 'Register', component: MovieRegister },
  { path: '/login', name: 'Login', component: MovieLogin },
  { path: '/movie/:id', name: 'MovieInfo', component: MovieInfo },
  { path: '/review/:id', name: 'MovieReview', component: MovieReview }  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
