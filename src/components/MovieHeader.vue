<template>
  <header class="header">
    <div class="logo">
      <img src="@/assets/logo.png" alt="MovieCatalog Logo" />
      <span>MovieHub</span>
    </div>
    <nav>
      <router-link to="/" class="active">Filmes</router-link>
      <router-link to="/favorites">Favoritos (0)</router-link>
    </nav>
    <div class="search">
      <input type="text" placeholder="Buscar filmes..." />
    </div>
    <div class="genres">
      <select>
        <option>Todos os Gêneros</option>
        <option>Ação</option>
        <option>Comédia</option>
        <option>Drama</option>
      </select>
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: black;
  padding: 20px 40px; 
  height: 80px; 
  z-index: 1000;
}


.logo {
  display: flex;
  align-items: center;
}

.logo img {
  width: 40px;
  margin-right: 12px;
}

.logo span {
  font-size: 24px;
  font-weight: bold;
  color: white;
}

nav a, nav router-link {
  color: white;
  margin: 0 20px;
  font-size: 18px;
  text-decoration: none;
}

nav router-link.active {
  border-bottom: 2px solid red;
}

.search input {
  padding: 8px 12px;
  font-size: 16px;
  border-radius: 6px;
  border: none;
  background-color: #3a3a3a;
  color: white;
}

.genres select {
  background-color: #3a3a3a;
  color: white;
  border: none;
  padding: 8px 12px;
  font-size: 16px;
  border-radius: 6px;
}
</style>