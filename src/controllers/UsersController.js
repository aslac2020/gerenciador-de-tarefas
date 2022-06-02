const HttpController = require('./HttpController');

class UsersController extends HttpController {
    configureRoutes(baseUrl){
        this.express.post(`${baseUrl}/users`, this.register.bind(this));
    }

    register(req, res){
        const dataUser = req.body;

        req.logger.info('Usuário cadastrado com sucesso');
        res.json(dataUser);
     
    }
}

module.exports = UsersController;