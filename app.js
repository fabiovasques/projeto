var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressValidator = require('express-validator');
var session = require('express-session');


// inclui as rotas 
var routes = require('./routes/index');
var admin = require('./routes/admin'); 


// instancia um servidor
var app = express();

// instancia as sessões 
app.use(session({secret: 'alguma_senha', saveUninitialized: true, resave: true}));

// diretório de views padrão (
app.set('views', path.join(__dirname, 'views'));
// engine de views EJS 
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
// extended = formato json
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// middleware de validação
app.use(expressValidator());

// registro das rotas

// SITE
app.get('/', routes.index);
app.get('/index', routes.index);
app.get('/login', routes.login);
app.get('/logout', routes.logout);
app.post('/login/entrar', routes.entrar);

// ADMIN
app.get('/admin', admin.index);
app.get('/admin/cad_epi/adicionar', admin.adicionar);
app.post('/admin/cad_epi/salvar', admin.salvar);
app.get('/admin/cad_epi/excluir/:id', admin.excluir);
app.get('/admin/cad_epi/editar/:id', admin.editar);
app.post('/admin/cad_epi/atualizar/:id', admin.atualizar);

// iniciar um servidor com uma porta específica
app.listen(5000, function () {
  console.log('Servidor executando na porta 5000..');
});

