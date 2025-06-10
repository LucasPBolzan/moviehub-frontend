<template>
  <div id="app" class="app">
    <MovieHeader />
    <main>
      <router-view />
    </main>
    <MovieFooter />
  </div>
</template>

<script>
import MovieHeader from './components/MovieHeader.vue'
import MovieFooter from './components/MovieFooter.vue'

export default {
  components: {
    MovieHeader,
    MovieFooter
  }
}
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  color: white;
  font-family: Arial, sans-serif;
  overflow-x: hidden;
  box-sizing: border-box;
}

*, *::before, *::after {
  box-sizing: inherit;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
  margin-top: 110px; 
}
</style>
