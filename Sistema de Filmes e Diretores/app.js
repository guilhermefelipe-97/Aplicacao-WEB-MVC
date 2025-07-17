const express = require('express');
const path = require('path');
const app = express();

const directorRoutes = require('./src/routes/directorRoutes');
const movieRoutes = require('./src/routes/movieRoutes');
const webMovieRoutes = require('./src/routes/webMovieRoutes');
const webDirectorRoutes = require('./src/routes/webDirectorRoutes');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'src/public')));

// Rotas da API
app.use('/api/directors', directorRoutes);
app.use('/api/movies', movieRoutes);

// Rotas das views (serão implementadas depois)
app.use('/movies', webMovieRoutes);
app.use('/directors', webDirectorRoutes);
app.get('/', (req, res) => res.redirect('/movies'));

// Inicialização do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
}); 