const express = require('express');
const expressLayout = require('express-ejs-layouts');
const path = require('node:path');
const app = express();
const port = 3000 || process.env.PORT;

// Static carpetas
app.use(express.static(path.join(__dirname, 'public', 'js')));
app.use(express.static(path.join(__dirname, 'public', 'css')));

// plantillas
app.use(expressLayout);
app.set('layout', 'layouts/main');
app.set('view engine', 'ejs');

// Rutas
app.use('/', require('./server/routes/streamers'));

app.listen(port, () => {
  console.log(`Listening to http://localhost:${port}/`);
});