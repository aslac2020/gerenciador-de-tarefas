const HttpController = require('./HttpController');
const UserService = require('../services/UsersService');

class UsersController extends HttpController {
    configureRoutes(baseUrl){
        this.express.post(`${baseUrl}/users`, this.register.bind(this));
    }

   async register(req, res){
        const dataUser = req.body;

        try {

            const userService = new UserService();
            const returnService = await userService.register(dataUser);

            if(returnService.errors){
                return res.status(400).json({
                    status: 400,
                    erro: returnService.errors.join(', ')
                });
            }

            req.logger.info('Usuário cadastrado com sucesso');
            res.json({
                msg: 'Usuário criado com sucesso'
            });

        } catch (error) {
            req.logger.error('Erro ao cadastrar usuário, error=' + error.message);
            res.status(500).json({
                erro: 'Ocorreu um problema ao cadastrar um usuario :(',
                status: 500
            })

        }
     
    }
}

module.exports = UsersController;