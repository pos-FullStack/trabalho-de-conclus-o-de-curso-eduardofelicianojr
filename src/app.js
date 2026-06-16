const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');
const sequelize = require('./config/database');

const app = express();

// Configuração do Handlebars com helpers
const hbs = exphbs.create({
  helpers: require('./helpers/handlebars') // eq e includes disponíveis
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: 'velha-figura-linguagem',
  resave: false,
  saveUninitialized: false
}));

app.use(express.static(path.join(__dirname, 'public')));

// Rotas
const authRoutes = require('./routes/auth.routes');
const adminRoutes = require('./routes/admin.routes');
const jogadorRoutes = require('./routes/jogador.routes');

app.use(authRoutes);
app.use('/admin', adminRoutes);
app.use('/', jogadorRoutes);

// Conexão com o banco
sequelize.authenticate()
  .then(() => console.log('Banco de dados conectado com sucesso'))
  .catch(err => console.log('Erro ao conectar ao banco:', err));

// Servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);

  // Servir arquivos estáticos
  app.use('/img', express.static(path.join(__dirname, 'img')));
});