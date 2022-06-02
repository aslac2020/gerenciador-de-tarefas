const UsersRepository = require("../repositories/impl/MongoDBUsersRepository");

class UsersService {
  async register(dataUsers) {
    const listErrors = [];

    if (!dataUsers.name || !dataUsers.name.toString().trim()) {
      listErrors.push("Nome do usuário inválido");
    } else {
      const nameParse = parseInt(dataUsers.name);
      const isNumber = !Number.isNaN(nameParse);

      if (isNumber) {
        listErrors.push('Nome do usuário inválido');
      }
    }

    if (!dataUsers.email || !dataUsers.email.toString().trim()) {
      listErrors.push("E-mail do usuário inválido");
    }else {
        const temArroba = dataUsers.email.indexOf('@') !== -1;
        const temPonto = dataUsers.email.indexOf('.') !== -1;

        if(!temArroba || !temPonto) {
            listErrors.push('E-mail do usuário inválido');
        }else {
            const userEmailRepeat = await UsersRepository.filterUser({
                email: dataUsers.email
            });
            
            if(userEmailRepeat && userEmailRepeat.length){
                listErrors.push('Já existe um usuario com o mesmo email cadastrado');
            }
        }
    }

    if (!dataUsers.password || !dataUsers.password.trim()) {
      listErrors.push("Senha inválida");
    }

    const retorno = {
      errors: null,
      users: null,
    };

    if (listErrors.length) {
      retorno.errors = listErrors;
    } else {
      //fazendo o cadastro do usuario
      const userRegister = await UsersRepository.register({
        name: dataUsers.name,
        email: dataUsers.email,
        password: dataUsers.password,
      });

      retorno.users = userRegister;
    }

    return retorno;
  }
}

module.exports = UsersService;
