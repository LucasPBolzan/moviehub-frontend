<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <h4>Filmes</h4>
        <a href="#">Populares</a>
        <a href="#">Mais Avaliados</a>
        <a href="#">Lançamentos</a>
        <a href="#">Em Cartaz</a>
      </div>
      <div class="footer-section">
        <h4>Gêneros</h4>
        <a href="#">Ação</a>
        <a href="#">Comédia</a>
        <a href="#">Drama</a>
        <a href="#">Ficção Científica</a>
      </div>
      <div class="footer-section">
        <h4>Suporte</h4>
        <a href="#">Central de Ajuda</a>
        <a href="#">Contato</a>
        <a href="#">Política de Privacidade</a>
        <a href="#">Termos de Uso</a>
      </div>
      <div class="footer-section">
        <h4>Conecte-se</h4>
        <a href="#">Twitter</a>
        <a href="#">Facebook</a>
        <a href="#">Instagram</a>
        <a href="#">YouTube</a>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2024 MovieCatalog. Todos os direitos reservados.</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'MovieFooter'
}
</script>

<style scoped>
.footer {
  background-color: #2a2a2a;
  padding: 40px 20px;
  margin-top: 40px;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
}

.footer-section {
  flex: 1;
  min-width: 200px;
  margin-bottom: 20px;
}

.footer-section h4 {
  font-size: 18px;
  margin-bottom: 10px;
}

.footer-section a {
  display: block;
  color: #ccc;
  text-decoration: none;
  margin: 5px 0;
}

.footer-bottom {
  text-align: center;
  margin-top: 20px;
  border-top: 1px solid #444;
  padding-top: 20px;
}

.footer-bottom p {
  margin: 0;
  color: #ccc;
}
</style>