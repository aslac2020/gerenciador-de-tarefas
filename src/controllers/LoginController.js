const HttpController = require("./HttpController");
const LoginService = require("../services/LoginService");

class LoginController extends HttpController {
  configureRoutes(baseUrl) {
    this.express.post(`${baseUrl}/login`, this.login.bind(this));
  }

  async login(req, res) {
    try {
      const body = req.body;
      if (!body || !body.login || !body.password) {
        req.logger.info("Requisição de login inválida");
        return res.status(400).json({
          status: 400,
          error: "Parâmetros de entrada inválidos.",
        });
      }

      const service = new LoginService();
      const result = await service.logar(body.login, body.password);
      if (!result) {
        return res.status(400).json({
          erro: "Login ou senha inválidos",
          status: 400,
        });
      }
      req.logger.info(
        "Requisição de login realizada com sucesso :)",
        `resultado=${JSON.stringify(result)}`
      );

      res.json(result);
    } catch (e) {
      req.logger.error('erro ao realizar o login' + e.message);
      res.status(500).json({
        erro: 'Problema ao realizar login, tente novamente mais tarde',
        status: 500,
      })
    }
  }
}

module.exports = LoginController;
