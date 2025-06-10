<template>
  <div class="login-container">
    <h1 class="title">Entrar</h1>
    <form class="login-form">
      <label>Email</label>
      <input type="email" placeholder="seuemail@exemplo.com" />

      <label>Senha</label>
      <input type="password" placeholder="Digite sua senha" />

      <button type="submit">Entrar</button>
    </form>

    <p class="login-redirect">
      Ainda não tem uma conta?
      <router-link to="/register">Registrar</router-link>
    </p>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 1rem 5rem;
  color: white;
  background: linear-gradient(to right, #1f1f1f, #333);
  min-height: calc(100vh - 150px);
}

.title {
  font-size: 3rem;
  font-weight: 900;
  background: linear-gradient(90deg, #ff0000);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  margin-bottom: 2rem;
}

.login-form {
  background: #2c2c2c;
  padding: 2rem;
  border-radius: 10px;
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
}

.login-form label {
  margin-top: 1rem;
  font-weight: bold;
}

.login-form input {
  margin-top: 0.5rem;
  padding: 0.75rem;
  border: none;
  border-radius: 5px;
  background: #1a1a1a;
  color: white;
  font-size: 1rem;
}

.login-form button {
  margin-top: 2rem;
  padding: 0.75rem;
  background: #e50914;
  border: none;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s;
}

.login-form button:hover {
  background: #b20710;
}

.login-redirect {
  margin-top: 1rem;
  text-align: center;
  font-size: 0.95rem;
  color: #ccc;
}

.login-redirect a {
  color: #61dafb;
  text-decoration: none;
  font-weight: bold;
  margin-left: 0.3rem;
  transition: color 0.3s;
}

.login-redirect a:hover {
  color: #ffffff;
}
</style>
