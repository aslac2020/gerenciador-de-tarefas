const jwt = require("jsonwebtoken");
const md5 = require("md5");
const UsersRepository = require("../repositories/impl/MongoDBUsersRepository");

class LoginService {
  async logar(login, password) {
    const filterUser = {
      email: login,
      password: md5(password),
    };

    let user = null;
    const listUsers = await UsersRepository.filterUser(filterUser);
    if (listUsers && listUsers.length) {
      user = listUsers[0];
    }else {
      return null;
    }

    //gerar token jwt
    const token = jwt.sign({ _id: user.id }, process.env.KEY_SECRET_JWT);

    return {
      ...user,
      token: token,
    };
  }
}

module.exports = LoginService;
