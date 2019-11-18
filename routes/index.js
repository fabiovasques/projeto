// conexão com o postgres
const { Client } = require('pg');
var connectionString = "postgres://postgres:postgres@localhost:5432/portal"; 
const client = new Client({ connectionString: connectionString }); 
client.connect();

// rota index 
exports.index = function (req, res) {
  client.query("SELECT *, to_char( venc_ca, 'DD/MM/YYYY') AS venc_ca FROM cad_epi", function (err, result) {
      if (err) {
          console.log(err);
          res.status(400).send(err);
      }
      res.render('site/index', { noticias: result.rows });
  });
};

// rota index
exports.index = function (req, res) { 
  res.render('site/index');
};



// rota login
exports.login = function (req, res) { 
  res.render('site/login');
};



// rota logout
exports.logout = function (req, res) {
  req.session.destroy((err) => {
      if(err) {
          return console.log(err);
      }
      res.redirect('/login');
  });
};

// rota entrar
exports.entrar= function (req, res) { 
  var acesso = req.body; 
  // console.log(acesso);
  req.assert('email', 'O e-mail é obrigatório').notEmpty();
  req.assert('senha', 'A senha é obrigatória').notEmpty();
  req.assert('senha', 'O senha deve conter entre 5 e 10 caracteres').len(5, 10);var erros = req.validationErrors();
  //console.log(erros);
  // se o formulário não foi validado, envia para a tela de login novamente
  if (erros) {
    res.render('admin/login', { validacao: erros, acesso: acesso, sess: sess });
    return;
  }
  // verifica a senha de acesso
  if(req.body.senha == '12345') {
    // recebe o formulário da requisição
    sess = req.session;
    // atribui o name "email" do formulário à sessão
    sess.email = req.body.email;
    // redireciona para a rota da área administrativa
    res.redirect('/admin');
  }
  // caso a senha esteja incorreta, envia para a tela de login novamente
  else{
    // A FAZER: ENVIAR UMA MSG DE VALIDAÇÃO
    res.render('admin/login', { validacao: {}, acesso: {}, sess: sess });
  return;
  }
};
