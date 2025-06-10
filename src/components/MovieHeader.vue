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
          <router-link to="/favorites">Favoritos (0)</router-link>
        </nav>
      </div>

      <div class="right-side">
        <div class="search">
          <input type="text" placeholder="🔍 Buscar filmes..." />
        </div>
        <div class="genres">
          <select>
            <option>Todos os Gêneros</option>
            <option>Ação</option>
            <option>Comédia</option>
            <option>Drama</option>
          </select>
        </div>
        <div class="user-icon">
          <span>👤</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'MovieHeader'
}
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: black;
  height: 100px;
  display: flex;
  align-items: center;
  z-index: 1000;
}

.header-container {
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 0 80px; 
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
  gap: 12px;
}

.logo img {
  width: 44px;
}

.logo span {
  font-size: 28px;
  font-weight: bold;
  color: white;
}

.nav-links {
  display: flex;
  gap: 32px;
}

.nav-links a {
  color: white;
  font-size: 20px;
  text-decoration: none;
  padding-bottom: 4px;
}

.nav-links a.active {
  color: #e50914;
  border-bottom: 2px solid #e50914;
}

.search input {
  padding: 12px 16px;
  font-size: 17px;
  border-radius: 6px;
  border: none;
  background-color: #1f1f1f;
  color: white;
  width: 220px;
}

.genres select {
  background-color: #1f1f1f;
  color: white;
  border: none;
  padding: 12px 16px;
  font-size: 17px;
  border-radius: 6px;
}

.user-icon span {
  color: white;
  font-size: 24px;
  cursor: pointer;
}
</style>
