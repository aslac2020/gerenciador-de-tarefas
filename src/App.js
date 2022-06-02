const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger/swagger.json');
const LoginController = require('./controllers/LoginController');
const AppConstants = require('./enum/AppConstants');
const MongoDBConnectionHelper = require('./helpers/MongoDBConnectionHelper');

const logger = require('./middlewares/logger');
const jwt = require('./middlewares/jwt');

class App {

    #controllers;
    start(){
        //configurar Express
        this.#configureExpress();
        //Conexão com o banco de dados
        this.#configureBancoDados();
        // carregar os controllers
        this.#loadingController();
        //iniciar o servidor
        this.#initServer();
    }

    #configureExpress = () => {
        this.express = express();

        //registra o log das requisições
        this.express.use(logger);

        this.express.use(express.urlencoded({ extended: true }));
        this.express.use(express.json());

        //registra o log jwt para validar o acesso do usuario
        this.express.use(jwt);

        //configuração do swagger
        this.express.use(`${AppConstants.BASE_API_URL}/docs`, 
         swaggerUi.serve, 
         swaggerUi.setup(swaggerFile)
        );

    }

    #configureBancoDados = () => {
        MongoDBConnectionHelper.connect();
    }

    #loadingController = () => {
        this.#controllers = [
            new LoginController(this.express)
        ];
    }

    #initServer = () => {
        const port = process.env.EXPRESS_PORT || 3001;
        this.express.listen(port, () => {
            console.log(`Aplicação executando na porta ${port}`);
        });
    }

}

module.exports = App;