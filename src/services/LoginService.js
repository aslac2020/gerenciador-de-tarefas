const jwt = require('jsonwebtoken')


class LoginService {
  logar(login, password) {

    const user = {
        id: 1,
        name: 'Usuário Fake',
        email: 'fake@fake.com'
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
