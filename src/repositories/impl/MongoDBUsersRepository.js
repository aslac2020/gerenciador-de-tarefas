const UsersRepository = require('../UsersRepository');
const Users = require('../../models/Users');

class MongoDBUsersRepository {
    static register(dataUser){
       return Users.create(dataUser);
    }

    //define o metodo filtro como default
    static filterUser(filter = {}){
        return Users.find(filter);

    }
}

module.exports = UsersRepository(MongoDBUsersRepository);