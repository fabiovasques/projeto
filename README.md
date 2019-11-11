# Passo a passo Node e Express no Linux

### Instalação via NVM:

$ curl -sL https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh -o install_nvm.sh <br>
$ bash install_nvm.sh <br>
$ source ~/.profile <br>
$ nvm install 12.10.0 <br>
$ nvm use 12.10.0 <br>
$ npm install -g express <br>
$ npm link express <br>
$ npm list express <br>
$ npm install -g nodemon <br>
\$ npm install -g body-parser <br>
\$ npm install -g express-validator@3.2.0 --save <br>
$ npm install -g express-session

### Atividade de nivelamento:

https://github.com/workshopper/learnyounode <br>

$ cd /home/aluno/ <br>
$ git clone https://github.com/workshopper/learnyounode.git <br>
$ cd learnyounode <br>
$ npm install -g learnyounode <br>
$ npm install <br>
$ cd bin <br>
\$ ./learnyounode <br>

### Configuração padrão do projeto:

$ cd /home/aluno/ <br>
$ cd /home/aluno/seu_projeto <br>
$ npm init <br>
$ express --view=ejs <br>
\$ npm install <br>

\$ nodemon app.js <br>
Abrir pelo navegador: http://localhost:3000/ <br><br>

### Implementação do projeto:

Reorganizar os arquivos do projeto em: /public <br><br>

Verificar a redenderização da página inicial "http://localhost:3000/" (index) <br><br>

Criar uma rota de autenticação: /routes/login.js <br>

**Inclusão dinâmica do header e footer**

Separar o cabeçalho e rodapé em views próprias

<% include ./header.ejs %>
<% include ./footer.ejs %>

**Validação server-side usando express-validator e validator.js**

https://medium.com/@kongruksiamza/nodejs-validate-data-and-alert-message-in-ejs-template-engine-f2844a4cb255

**Gerenciamento de sessão**

https://codeforgeek.com/manage-session-using-node-js-express-4/

**Conexão com o PostgreSQL**

CRUD padrão: https://github.com/dannibla/nodejs-postgresql-crud <br>

$ npm install pg <br><br>

Banco de dados padrão (exemplo): <br>

CREATE DATABASE portal WITH ENCODING='UTF8' OWNER=postgres CONNECTION LIMIT=-1; CREATE TABLE noticia (idnoticia integer NOT NULL DEFAULT nextval('noticia_idnoticia_seq'::regclass), titulo character varying(200) NOT NULL,descricao text NOT NULL, tipo character varying(50) NOT NULL, foto character varying(100) NOT NULL, datanoticia date NOT NULL, CONSTRAINT noticia_pkey PRIMARY KEY (idnoticia)) WITH ( OIDS=FALSE ); ALTER TABLE noticia   OWNER TO postgres;
CREATE TABLE usuario (email character varying(100) NOT NULL, senha character varying(50) NOT NULL, CONSTRAINT usuario_pkey PRIMARY KEY (email) 
) WITH ( OIDS=FALSE ); ALTER TABLE usuario OWNER TO postgres;

**Obs: fazer futuramente**

Implementar um formulário com e-mail e senha bem como 3 opções de alert (bootstrap):

- Logout realizado com sucesso.
- E-mail ou senha incorretos, tente novamente.
- Senha bloqueada! Contate a empresa.
