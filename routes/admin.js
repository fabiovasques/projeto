const formidable = require('formidable');
const { Client } = require('pg');
const express = require ("express");



// conexão com o postgres
var connectionString = "postgres://postgres:postgres@localhost:5432/segwaretst"; 
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
        client.query("SELECT *, to_char( venc_ca, 'DD/MM/YYYY') AS venc_ca FROM cad_epi ORDER BY id", function (err, result) {
            if (err) {
                console.log(err);
                res.status(400).send(err);
            }
            res.render('admin/index', { cad_epi: result.rows });
        });                        
    }                 
    else {
        res.redirect('/logout');
    }
};

// rota adicionar epi
exports.adicionar = function (req, res) {
    res.render('admin/cad_epi/adicionar');
};

// rota página de login
exports.login = function (req, res) {
    res.render('views/site/login');
};


// rota salvar epi
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
        var tipo_epi= fields.tipo_epi;
        var ca = fields.ca;
        var descricao = fields.descricao;
        var venc_ca = fields.venc_ca;
        var fabri_epi = fields.fabri_epi;
        var foto = files.foto.name;
        // console.log(files.foto);   
        client.query("INSERT INTO cad_epi (tipo_epi, ca, venc_ca, fabri_epi,descricao,foto) VALUES($1, $2, $3, $4, $5,$6) RETURNING *", [tipo_epi, ca,venc_ca,fabri_epi,descricao,foto], function (err, result) {
            if (err) {
                console.log("Erro: %s ", err);
            }            
        });    
    
    });           
    
   res.redirect('/admin');
  
};




// rota editar epi
exports.editar = function (req, res) {
    var id = req.params.id;

    client.query("SELECT *, to_char( venc_ca, 'YYYY-MM-DD') AS venc_ca FROM cad_epi WHERE id=$1", [id], function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.render('admin/cad_epi/editar', { cad_epi: result.rows });
    });
};


// rota atualizar  epi
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
            client.query("UPDATE cad_epi SET foto=$1 WHERE id=$2", [file.name, req.params.id], function (err, result) {
                if (err) {
                    console.log("Erro: %s ", err);
                }            
            });  
          } 
      });
  
      // campos do formulário
      var form2 = new formidable.IncomingForm();
      form2.parse(req, function (err, fields, files) {
          var tipo_epi = fields.tipo_epi;
          var ca = fields.ca;
          var venc_ca = fields.venc_ca;
          var fabri_epi = fields.fabri_epi;
          var descricao = fields.descricao;
          
          // console.log(files.foto);   
          client.query("UPDATE cad_epi SET tipo_epi=$1, ca=$2, venc_ca=$3, fabri_epi=$4, descricao=$5 WHERE id=$6", [tipo_epi, ca, venc_ca, fabri_epi, descricao, req.params.id], function (err, result) {
              if (err) {
                  console.log("Erro: %s ", err);
              }            
          });    
      
      });           

   res.redirect('/admin');

};

// rota excluir epi
// ADICIONAR A REMOÇÃO DA IMAGEM
exports.excluir = function (req, res) {
    var id = req.params.id;
    client.query("DELETE FROM cad_epi WHERE id=$1", [id], function (err, rows) {
        if (err) {
            console.log("Erro: %s ", err);
        }
        res.redirect('/admin');
    });
};
