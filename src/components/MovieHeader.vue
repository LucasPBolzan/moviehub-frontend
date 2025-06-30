<template>
  <header class="header">
    <div class="header-container">

      <div class="left-side">
        <div class="logo">
          <img src="@/assets/logo.png" alt="MovieCatalog Logo" />
          <span>MovieCatalog</span>
        </div>
        <nav class="nav-links">
          <router-link to="/" active-class="active">Filmes</router-link>
          <router-link to="/favorites" active-class="active">
            Favoritos ({{ totalFavorites }})
          </router-link>
          <router-link to="/register" active-class="active">Registrar</router-link>
        </nav>
      </div>

      <div class="right-side">
        <div class="search">
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="🔍 Buscar filmes..." 
            @input="updateSearch"
          />
          <button v-if="searchQuery" class="clear-search" @click="clearSearch">×</button>
        </div>
        <div class="genres">
          <button class="genre-dropdown-btn" @click.stop="toggleGenreDropdown" ref="genreButtonRef">
            Gêneros <span class="selected-count" v-if="selectedGenres.length">{{ selectedGenres.length }}</span>
            <span class="dropdown-arrow" :class="{ 'arrow-up': showGenreDropdown }">▼</span>
          </button>
          <div class="genre-dropdown" v-if="showGenreDropdown" ref="genreDropdownRef">
            <div class="genre-tags">
              <button 
                v-for="genre in availableGenres" 
                :key="genre" 
                class="genre-tag" 
                :class="{ active: selectedGenres.includes(genre) }"
                @click.stop="toggleGenre(genre)"
              >
                {{ genre }}
              </button>
            </div>
            <div class="dropdown-footer" v-if="selectedGenres.length">
              <button class="clear-btn" @click.stop="clearGenres">Limpar filtros</button>
            </div>
          </div>
        </div>
        <div class="user-section">
          <span v-if="currentUser" class="user-name">Olá, {{ currentUser.name }}</span>
          <router-link v-if="!currentUser" to="/login" class="user-icon" title="Entrar">
            👤
          </router-link>
          <button v-if="currentUser" @click="logout" class="logout-btn" title="Sair">
            Sair
          </button>
        </div>
      </div>

    </div>
  </header>
</template>

<script>
import { useFavoritesStore } from '@/stores/favorites'
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'


export default {
  name: 'MovieHeader',
  emits: ['search'],
  setup(props, { emit }) {
    const favStore = useFavoritesStore()
    const router = useRouter()
    
    const searchQuery = ref('')
    const selectedGenres = ref([])
    const showGenreDropdown = ref(false)
    const currentUser = ref(null)
    const availableGenres = [
      'Action', 'Adventure', 'Animation', 'Biography', 
      'Comedy', 'Crime', 'Drama', 'Romance', 
      'Sci-Fi', 'Thriller'
    ]

    const totalFavorites = computed(() => favStore.favorites.length)

    const updateSearch = () => {
      emit('search', {
        query: searchQuery.value,
        genres: selectedGenres.value
      })
      
      if (router.currentRoute.value.path !== '/') {
        router.push('/')
      }
    }

    const toggleGenre = (genre) => {
      const index = selectedGenres.value.indexOf(genre)
      if (index === -1) {
        selectedGenres.value.push(genre)
      } else {
        selectedGenres.value.splice(index, 1)
      }
      updateSearch()
    }

    const clearSearch = () => {
      searchQuery.value = ''
      updateSearch()
    }
    
    const toggleGenreDropdown = () => {
      showGenreDropdown.value = !showGenreDropdown.value
    }
    
    onMounted(() => {
      document.addEventListener('click', handleClickOutside)
      // Carregar usuário do localStorage
      const userData = localStorage.getItem('currentUser')
      if (userData) {
        currentUser.value = JSON.parse(userData)
      }
    })
    
    onBeforeUnmount(() => {
      document.removeEventListener('click', handleClickOutside)
    })
    
    const genreDropdownRef = ref(null)
    const genreButtonRef = ref(null)
    
    const handleClickOutside = (event) => {
      if (showGenreDropdown.value && 
          genreDropdownRef.value && 
          genreButtonRef.value && 
          !genreDropdownRef.value.contains(event.target) &&
          !genreButtonRef.value.contains(event.target)) {
        showGenreDropdown.value = false
      }
    }
    
    const clearGenres = () => {
      selectedGenres.value = []
      updateSearch()
    }

    const logout = () => {
      localStorage.removeItem('currentUser')
      currentUser.value = null
      router.push('/')
    }

    return { 
      totalFavorites, 
      searchQuery, 
      selectedGenres, 
      availableGenres,
      showGenreDropdown,
      genreDropdownRef,
      genreButtonRef,
      currentUser,
      updateSearch,
      toggleGenre,
      clearSearch,
      toggleGenreDropdown,
      clearGenres,
      logout
    }
  }
}
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to right, #000000, #121212);
  height: 90px;
  display: flex;
  align-items: center;
  z-index: 1000;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
}

.header-container {
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 0 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left-side, .right-side {
  display: flex;
  align-items: center;
  gap: 24px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo img {
  width: 40px;
}

.logo span {
  font-size: 26px;
  font-weight: bold;
  color: white;
  transition: color 0.3s;
}

.nav-links {
  display: flex;
  gap: 28px;
}

.nav-links a {
  color: #ddd;
  font-size: 18px;
  text-decoration: none;
  padding-bottom: 4px;
  transition: all 0.3s ease;
}

.nav-links a:hover {
  color: #e50914;
  border-bottom: 2px solid #e50914;
}

.nav-links a.active {
  color: #e50914;
  border-bottom: 2px solid #e50914;
}

.search {
  position: relative;
}

.search input {
  padding: 10px 36px 10px 16px;
  font-size: 16px;
  border-radius: 6px;
  border: none;
  background-color: #1f1f1f;
  color: white;
  width: 220px;
  transition: all 0.3s ease;
}

.search input:focus {
  background-color: #2a2a2a;
  outline: none;
  box-shadow: 0 0 0 2px rgba(229, 9, 20, 0.5);
  width: 260px;
}

.clear-search {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #999;
  font-size: 20px;
  cursor: pointer;
  transition: color 0.2s;
}

.clear-search:hover {
  color: #e50914;
}

.genres {
  position: relative;
  display: flex;
  align-items: center;
}

.genre-dropdown-btn {
  background-color: #1f1f1f;
  color: white;
  border: none;
  padding: 10px 16px;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.genre-dropdown-btn:hover {
  background-color: #2a2a2a;
}

.dropdown-arrow {
  font-size: 10px;
  transition: transform 0.3s ease;
}

.arrow-up {
  transform: rotate(180deg);
}

.selected-count {
  background-color: #e50914;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
}

.genre-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  background-color: #1f1f1f;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  width: 300px;
  z-index: 1000;
  overflow: hidden;
}

.genre-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 16px;
}

.genre-tag {
  background-color: #333;
  color: #ccc;
  border: none;
  padding: 6px 12px;
  font-size: 14px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s;
}

.genre-tag:hover {
  background-color: #444;
}

.genre-tag.active {
  background-color: #e50914;
  color: white;
}

.dropdown-footer {
  padding: 12px 16px;
  border-top: 1px solid #333;
  display: flex;
  justify-content: flex-end;
}

.clear-btn {
  background: none;
  border: none;
  color: #e50914;
  font-size: 14px;
  cursor: pointer;
  padding: 4px 8px;
}

.clear-btn:hover {
  text-decoration: underline;
}

.user-icon {
  color: white;
  font-size: 24px;
  cursor: pointer;
  transition: color 0.3s;
  text-decoration: none;
}

.user-icon:hover {
  color: #e50914;
}

.user-section {
  display: flex;
  align-items: center;
  gap: 15px;
}

.user-name {
  color: white;
  font-size: 16px;
}

.logout-btn {
  background-color: #e50914;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.logout-btn:hover {
  background-color: #f40612;
}
</style>
