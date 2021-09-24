const path = require('path');
const express = require('express');
const exphandlebars  = require('express-handlebars');
const app = express();
const port = 3000;
const morgan =  require('morgan');
// const window = require('window');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({
  extended: true,
}));
app.use(express.json())
//HTTP logger
// app.use(morgan('combined'));

// Template engine
app.engine('hbs', exphandlebars({
  extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));


//route
app.get('/', (req, res) => {
  res.render('home');
})

app.get('/kurisu', (req, res) => {
  res.render('kurisu');
})

app.get('/kurisu', (req, res) => {
  console.log(req.body);
  res.send('');
})

app.get('/komi', (req, res) => {
  res.render('komi');
})

app.post('/komi', (req, res) => {
  console.log(req.body);
  res.render('komi');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})