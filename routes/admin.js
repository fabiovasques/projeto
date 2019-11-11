const formidable = require('formidable');
const { Client } = require('pg');
const express = require ("express");



// conexão com o postgres
var connectionString = "postgres://postgres:postgres@localhost:5432/portal"; 
const client = new Client({ connectionString: connectionString }); 
client.connect();


// rota index
exports.index = function (req, res) { 
    res.render('site/index');
  };
  

// rota index 
exports.index = function (req, res) {
    sess = req.session;
    // verifica a sessão
    if(sess.email) {
        client.query("SELECT *, to_char( datanoticia, 'DD/MM/YYYY') AS datanoticia FROM noticia ORDER BY idnoticia", function (err, result) {
            if (err) {
                console.log(err);
                res.status(400).send(err);
            }
            res.render('admin/index', { noticias: result.rows });
        });
    }
    else {
        res.redirect('/logout');
    }
};

// rota adicionar notícia
exports.adicionar = function (req, res) {
    res.render('admin/noticias/adicionar');
};

// rota página de login
exports.login = function (req, res) {
    res.render('views/site/login');
};


// rota salvar notícia
exports.salvar = function (req, res) {

    // upload da foto
    var form = new formidable.IncomingForm();    
    form.parse(req); 
    // altera o diretório padrão de upload (tmp)
    form.on('fileBegin', function (name, file){
        file.path = 'public/images/' + file.name;
    });

    // campos do formulário
    var form2 = new formidable.IncomingForm();
    form2.parse(req, function (err, fields, files) {
        var tipo = fields.tipo;
        var titulo = fields.titulo;
        var descricao = fields.descricao;
        var datanoticia = fields.datanoticia;
        var foto = files.foto.name;
        // console.log(files.foto);   
        client.query("INSERT INTO noticia (titulo, tipo, descricao, foto, datanoticia) VALUES($1, $2, $3, $4, $5) RETURNING *", [titulo, tipo, descricao, foto, datanoticia], function (err, result) {
            if (err) {
                console.log("Erro: %s ", err);
            }            
        });    
    
    });           
    
   res.redirect('/admin');
  
};




// rota editar notícia
exports.editar = function (req, res) {
    var idnoticia = req.params.idnoticia;

    client.query("SELECT *, to_char( datanoticia, 'YYYY-MM-DD') AS datanoticia FROM noticia WHERE idnoticia=$1", [idnoticia], function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.render('admin/noticias/editar', { noticia: result.rows });
    });
};


// rota atualizar notícia
exports.atualizar = function (req, res) {

      // upload da foto nova
      var form = new formidable.IncomingForm();    
      form.parse(req); 
      // altera o diretório padrão de upload (tmp)
      form.on('fileBegin', function (name, file){
          // console.log(file);
          // verifica se a foto foi alterada
          if(file.name != ''){
            file.path = 'public/images/' + file.name;
            client.query("UPDATE noticia SET foto=$1 WHERE idnoticia=$2", [file.name, req.params.idnoticia], function (err, result) {
                if (err) {
                    console.log("Erro: %s ", err);
                }            
            });  
          } 
      });
  
      // campos do formulário
      var form2 = new formidable.IncomingForm();
      form2.parse(req, function (err, fields, files) {
          var tipo = fields.tipo;
          var titulo = fields.titulo;
          var descricao = fields.descricao;
          var datanoticia = fields.datanoticia;
          // console.log(files.foto);   
          client.query("UPDATE noticia SET titulo=$1, tipo=$2, descricao=$3, datanoticia=$4 WHERE idnoticia=$5", [titulo, tipo, descricao, datanoticia, req.params.idnoticia], function (err, result) {
              if (err) {
                  console.log("Erro: %s ", err);
              }            
          });    
      
      });           

   res.redirect('/admin');

};

// rota excluir notícia
// ADICIONAR A REMOÇÃO DA IMAGEM
exports.excluir = function (req, res) {
    var idnoticia = req.params.idnoticia;
    client.query("DELETE FROM noticia WHERE idnoticia=$1", [idnoticia], function (err, rows) {
        if (err) {
            console.log("Erro: %s ", err);
        }
        res.redirect('/admin');
    });
};
