<template>
  <div class="app">
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
.app {
  font-family: Arial, sans-serif;
  background-color: #1a1a1a;
  color: white;
  min-height: 100vh;
}

main {
  margin-top: 60px;
}
</style>