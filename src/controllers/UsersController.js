const HttpController = require('./HttpController');

class UsersController extends HttpController {
    configureRoutes(baseUrl){
        this.express.post(`${baseUrl}/users`, this.login.bind(this));
    }

    login(req, res){

    const body = req.body;

     if (!body || !body.login || !body.password){
        return res.status(400).json({
            status: 400,
            error: 'Parâmetros de entrada inválidos.'
        })
     }

        res.json({
            token: 'token gerado pela api'
        })
    }
}

module.exports = UsersController;