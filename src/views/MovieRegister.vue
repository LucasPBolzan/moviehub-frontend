<template>
  <div class="register-container">
    <h1 class="title">Criar Conta</h1>

    <form class="register-form">
      <div class="form-group">
        <label for="name">Nome</label>
        <input type="text" id="name" placeholder="Seu nome completo" />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" placeholder="seuemail@exemplo.com" />
      </div>

      <div class="form-group">
        <label for="password">Senha</label>
        <input type="password" id="password" placeholder="Digite uma senha segura" />
      </div>

      <div class="form-group">
        <label for="confirm-password">Confirmar Senha</label>
        <input type="password" id="confirm-password" placeholder="Confirme sua senha" />
      </div>

      <button type="submit" class="submit-button">Registrar</button>
      <p class="login-redirect">
  Já possui uma conta?
  <router-link to="/login">Entrar</router-link>
</p>

    </form>
  </div>
</template>

<style scoped>
.register-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 1rem 5rem;
  color: white;
  background: linear-gradient(to right, #1f1f1f, #333);
  min-height: 1px; 
}

.title {
  font-size: 3rem;
  font-weight: 900;
  background: linear-gradient(90deg, #ff0000);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  margin-bottom: 2rem;
  letter-spacing: 1px;
}


.register-form {
  width: 100%;
  max-width: 500px;
  background-color: rgba(255, 255, 255, 0.03);
  padding: 2rem;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: bold;
  margin-bottom: 0.4rem;
}

.form-group input {
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  background-color: #1c1c1c;
  color: white;
}

.submit-button {
  padding: 0.8rem;
  background-color: #ff0000;
  color: white;
  font-weight: bold;
  font-size: 1.1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #ee4714;
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
