//busca na raiz do projeto, variaveis do ambiente.
require('dotenv').config();

const App = require('./src/App')

const app = new App();
app.start();

