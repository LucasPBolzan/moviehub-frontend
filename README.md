# 🎬 Sistema de Filmes - Frontend Documentation

## 📋 Visão Geral

Sistema de streaming de filmes desenvolvido em Vue.js 3, inspirado no Netflix. Oferece uma experiência completa de navegação, busca, avaliação e gerenciamento de filmes favoritos.

## 🚀 Tecnologias Utilizadas

- **Vue.js 3** - Framework JavaScript reativo
- **Vue Router** - Roteamento SPA
- **Pinia** - Gerenciamento de estado
- **Axios** - Cliente HTTP
- **CSS3** - Estilização e animações
- **LocalStorage** - Persistência local

## 📁 Estrutura do Projeto

```
filme/
├── public/
│   ├── favicon.ico
│   └── index.html
├── src/
│   ├── assets/
│   │   └── logo.png
│   ├── components/
│   │   ├── MovieCard.vue
│   │   ├── MovieCarousel.vue
│   │   ├── MovieFooter.vue
│   │   └── MovieHeader.vue
│   ├── router/
│   │   └── index.js
│   ├── stores/
│   │   ├── favorites.js
│   │   └── user.js
│   ├── views/
│   │   ├── MovieFavorites.vue
│   │   ├── MovieHome.vue
│   │   ├── MovieInfo.vue
│   │   ├── MovieLogin.vue
│   │   ├── MovieRegister.vue
│   │   └── MovieReview.vue
│   ├── App.vue
│   └── main.js
├── package.json
└── vue.config.js
```

## 🛠️ Instalação e Configuração

### Pré-requisitos
- Node.js 16+
- npm ou yarn

### Instalação
```bash
cd filme
npm install
```

### Executar em Desenvolvimento
```bash
npm run serve
```

### Build para Produção
```bash
npm run build
```

## 🧩 Componentes

### MovieHeader.vue
**Funcionalidade:** Cabeçalho da aplicação com navegação e busca
- Menu de navegação responsivo
- Sistema de busca por título
- Filtros por gênero
- Indicador de usuário logado

**Props:**
- `searchFilters` (Object) - Filtros de busca atuais

**Eventos:**
- `update:searchFilters` - Atualiza filtros de busca

### MovieCarousel.vue
**Funcionalidade:** Carrossel de filmes com scroll automático
- Exibição horizontal de filmes
- Navegação manual com botões
- Auto-scroll a cada 4 segundos
- Filtros dinâmicos

**Props:**
- `title` (String) - Título do carrossel
- `searchFilters` (Object) - Filtros aplicados

**Eventos:**
- `avaliar` - Emitido ao avaliar filme
- `update:movies` - Contador de filmes filtrados

### MovieCard.vue
**Funcionalidade:** Card individual do filme
- Poster do filme
- Informações básicas (título, ano, nota)
- Botões de ação (favoritar, avaliar, detalhes)
- Hover effects

**Props:**
- `movie` (Object) - Dados do filme

**Eventos:**
- `avaliar` - Solicita avaliação do filme

### MovieFooter.vue
**Funcionalidade:** Rodapé da aplicação
- Links institucionais
- Informações de contato
- Redes sociais

## 📄 Views (Páginas)

### MovieHome.vue
**Rota:** `/`
**Funcionalidade:** Página inicial com banner e catálogo
- Banner rotativo com 15 filmes
- Carrossel de todos os filmes
- Sistema de busca integrado
- Formulário de avaliação rápida

### MovieLogin.vue
**Rota:** `/login`
**Funcionalidade:** Autenticação de usuários
- Formulário de login
- Validação de campos
- Integração com store de usuários
- Redirecionamento pós-login

### MovieRegister.vue
**Rota:** `/register`
**Funcionalidade:** Cadastro de novos usuários
- Formulário de registro
- Validação de dados
- Confirmação de senha
- Auto-login após cadastro

### MovieInfo.vue
**Rota:** `/movie/:id`
**Funcionalidade:** Detalhes completos do filme
- Informações detalhadas
- Botão para assistir trailer
- Sistema de avaliações
- Formulário de nova avaliação

### MovieFavorites.vue
**Rota:** `/favorites`
**Funcionalidade:** Lista de filmes favoritos
- Filmes favoritados pelo usuário
- Remoção de favoritos
- Navegação para detalhes

### MovieReview.vue
**Rota:** `/review`
**Funcionalidade:** Página de avaliações
- Histórico de avaliações
- Estatísticas pessoais

## 🗂️ Stores (Pinia)

### user.js
**Funcionalidade:** Gerenciamento de usuários
```javascript
// Estado
{
  currentUser: null,
  isLoggedIn: false
}

// Ações
- login(userData)
- logout()
- register(userData)
- loadUserFromStorage()
```

### favorites.js
**Funcionalidade:** Gerenciamento de favoritos
```javascript
// Estado
{
  favorites: []
}

// Ações
- addFavorite(movie)
- removeFavorite(movieId)
- toggleFavorite(movie)
- isFavorited(movieId)
- loadFavorites()
```

## 🛣️ Rotas (Vue Router)

```javascript
const routes = [
  { path: '/', component: MovieHome },
  { path: '/login', component: MovieLogin },
  { path: '/register', component: MovieRegister },
  { path: '/movie/:id', component: MovieInfo },
  { path: '/favorites', component: MovieFavorites },
  { path: '/review', component: MovieReview }
]
```

## 🎨 Estilização

### Tema Principal
- **Cores:** Preto (#000), Vermelho Netflix (#e50914)
- **Tipografia:** Sans-serif moderna
- **Layout:** Flexbox e Grid
- **Responsividade:** Mobile-first

### Animações
- Transições suaves (0.2s - 0.8s)
- Hover effects nos cards
- Fade-in para conteúdo dinâmico
- Scroll suave nos carrosséis

## 📊 Dados dos Filmes

### Estrutura do Objeto Movie
```javascript
{
  id: Number,
  title: String,
  year: Number,
  rating: Number,
  genres: Array<String>,
  poster: String,
  backdrop: String,
  description: String,
  trailer: String,
  duration: String
}
```

### Catálogo Atual
- **15 filmes** populares (2022-2024)
- Gêneros: Ação, Drama, Comédia, Sci-Fi, etc.
- Trailers do YouTube integrados
- Imagens de alta qualidade

## 🔌 Integração com Backend

### Endpoints Utilizados
- `GET /reviews/movie/:id` - Buscar avaliações
- `POST /reviews` - Criar avaliação

### Configuração Axios
```javascript
// Base URL: http://localhost:8080
// Headers: Content-Type: application/json
```

## 📱 Responsividade

### Breakpoints
- **Mobile:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

### Adaptações Mobile
- Menu hambúrguer
- Cards em coluna única
- Banner simplificado
- Botões maiores para touch

## 🔒 Autenticação

### Fluxo de Login
1. Usuário insere credenciais
2. Validação local dos campos
3. Verificação no localStorage
4. Atualização do estado global
5. Redirecionamento para home

### Persistência
- Dados salvos no localStorage
- Auto-login na inicialização
- Logout limpa todos os dados

## 🚀 Performance

### Otimizações Implementadas
- Lazy loading de imagens
- Debounce na busca
- Componentes reutilizáveis
- CSS otimizado
- Bundle splitting

## 🧪 Funcionalidades Principais

### Sistema de Busca
- Busca por título (case-insensitive)
- Filtros por múltiplos gêneros
- Resultados em tempo real
- Feedback visual para "sem resultados"

### Sistema de Favoritos
- Adicionar/remover favoritos
- Persistência por usuário
- Indicador visual nos cards
- Página dedicada aos favoritos

### Sistema de Avaliações
- Notas de 1 a 5 estrelas
- Comentários textuais
- Integração com backend
- Exibição de avaliações existentes

### Navegação
- SPA com Vue Router
- Transições suaves
- Breadcrumbs visuais
- Histórico do navegador

## 🐛 Tratamento de Erros

### Cenários Cobertos
- Falha na conexão com backend
- Dados inválidos nos formulários
- Rotas inexistentes
- Imagens que não carregam
- Estados de loading

### Feedback ao Usuário
- Mensagens de erro claras
- Estados de loading visuais
- Fallbacks para imagens
- Validação em tempo real

## 🔧 Configurações

### vue.config.js
```javascript
module.exports = {
  devServer: {
    port: 8081,
    proxy: {
      '/api': 'http://localhost:8080'
    }
  }
}
```

### package.json - Scripts
```json
{
  "serve": "vue-cli-service serve",
  "build": "vue-cli-service build",
  "lint": "vue-cli-service lint"
}
```

## 📈 Melhorias Futuras

### Funcionalidades Planejadas
- Sistema de recomendações
- Watchlist personalizada
- Compartilhamento social
- Modo escuro/claro
- PWA (Progressive Web App)
- Internacionalização (i18n)

### Otimizações Técnicas
- Server-side rendering (Nuxt.js)
- Cache inteligente
- Compressão de imagens
- CDN para assets estáticos

## 📞 Suporte

Para dúvidas ou problemas:
- Verificar console do navegador
- Validar conexão com backend
- Limpar localStorage se necessário
- Verificar versão do Node.js

---

**Desenvolvido com ❤️ usando Vue.js 3**
