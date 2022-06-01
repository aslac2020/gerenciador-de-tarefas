const AppConstants = require('../enum/AppConstants');

class HttpController{
    constructor(instanciaExpress){
        if(!instanciaExpress){
           throw new Error('A instância do express é obrigatória') 
        }

        this.express = instanciaExpress;
        this.configureRoutes(AppConstants.BASE_API_URL);
    }

    configureRoutes(baseUrl){
        throw new Error('Método configurarRotas precisa ser implementado')
    }
}

module.exports = HttpController;