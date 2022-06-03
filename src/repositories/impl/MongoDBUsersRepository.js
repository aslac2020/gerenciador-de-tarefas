const UsersRepository = require("../UsersRepository");
const Users = require("../../models/Users");

//pega usuario do banco de dados
const transformUser = (userDb) => {
  return {
    id: userDb._doc._id,
    name: userDb._doc.name,
    email: userDb._doc.email,
  };
};

class MongoDBUsersRepository {
  static register(dataUser) {
    return Users.create(dataUser);
  }

  //define o metodo filtro como default
  static async filterUser(filter = {}) {
    let users = await Users.find(filter);
    if (users) {
      users = users.map(u => transformUser(u));
    }

    return users;
  }

  static async filterUserById(idUser) {
    const userDb = await Users.findById(idUser);
    if(userDb){
        return transformUser(userDb);
    }

    return null;
  }
}

module.exports = UsersRepository(MongoDBUsersRepository);
