const jwt = require("jsonwebtoken");
const UsersRepository = require("../repositories/impl/MongoDBUsersRepository")

//lista de rotas publicas da aplicacao
const routesPublic = [
  {
    url: "/api/login",
    method: "POST",
  },
  {
    url: "/api/docs*",
    method: "GET",
  },
  {
    url: "/api/users",
    method: "POST",
  },
];

module.exports = (req, res, next) => {
  req.logger.info("Verificando permissão de acesso a rota", `rota=${req.url}`);

  //verificando se existe rota publica
  const routePublic = routesPublic.find(route => {

    const routePublicWithWidCard = route.url.indexOf("*") !== -1;
    const urlRequisiçãoPartePublic = req.url.indexOf(route.url.replace("*", "")) !== -1;

    return (
        route.url === req.url ||
      (routePublicWithWidCard && urlRequisiçãoPartePublic)) &&
      route.method === req.method.toUpperCase();
  });

  if (routePublic) {
    req.logger.info("Rota publica, requisição liberada");
    return next();
  }

  const authorization = req.headers.authorization;
  if (!authorization) {
    req.logger.info("Acesso negado, sem header de autorização");
    return res.status(401).json({
      status: 401,
      erro: "Acesso negado, você precisa enviar o header authorization",
    });
  }

  //pega o token de autorização, extraindo a parte do Bearer
  const token = authorization.substr(7);
  if (!token) {
    req.logger.info("Requisição sem token de acesso");
    return res.status(401).json({
      status: 401,
      erro: "Acesso negado, o token de acesso não foi informado",
    });
  }

  //verificando se o token passado é valido
  jwt.verify(token, process.env.KEY_SECRET_JWT, async (err, decoded) => {
    if (err) {
      req.logger.error("Erro ao decodificar o token jwt", `token=${token}`);
      return res.status(401).json({
        status: 401,
        erro: "Acesso negado, problema ao decodificar seu token de autorização",
      });
    }

    req.logger.debug("Token JWT decodificado", `idUsuario=${decoded._id}`);
    //TODO: carregar o usuario a partir do banco de dados
    const user = await UsersRepository.filterUserById(decoded._id);
    if(!user){
      req.logger.error("Usuário não encontrado no banco", `id=${decoded._id}`);
      return res.status(401).json({
        status: 401,
        erro: "Acesso negado, usuário não encontrado",
      });
    }

    req.user = user;
    next();
  });
};
