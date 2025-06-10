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
          <router-link to="/favorites" active-class="active">Favoritos (0)</router-link>
          <router-link to="/register" active-class="active">Registrar</router-link>
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
        <router-link to="/login" class="user-icon" title="Entrar">
          👤
        </router-link>
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

.search input {
  padding: 10px 16px;
  font-size: 16px;
  border-radius: 6px;
  border: none;
  background-color: #1f1f1f;
  color: white;
  width: 200px;
  transition: background 0.3s ease;
}

.search input:focus {
  background-color: #2a2a2a;
  outline: none;
}

.genres select {
  background-color: #1f1f1f;
  color: white;
  border: none;
  padding: 10px 14px;
  font-size: 16px;
  border-radius: 6px;
  transition: background 0.3s;
}

.genres select:hover {
  background-color: #2a2a2a;
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
</style>
