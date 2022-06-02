const HttpController = require("./HttpController");
const LoginService = require("../services/LoginService");

class LoginController extends HttpController {
  configureRoutes(baseUrl) {
    this.express.post(`${baseUrl}/login`, this.login.bind(this));
  }

  login(req, res) {
    const body = req.body;

    if (!body || !body.login || !body.password) {
        req.logger.info('Requisição de login inválida');
      return res.status(400).json({
        status: 400,
        error: "Parâmetros de entrada inválidos.",
      });
    }

    const service = new LoginService();
    const result = service.logar(body.login, body.password);
    req.logger.info('Requisição de login realizada com sucesso :)', `resultado=${JSON.stringify(result)}`);

    res.json(result);
  }
}

module.exports = LoginController;
