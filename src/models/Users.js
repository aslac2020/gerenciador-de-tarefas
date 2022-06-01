const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const md5 = require('md5');

const messageError = '*campo obrigatório';
const UsersSchema = new Schema({
    name: {
        type: String,
        required: [true, messageError]
    },
    email: {
        type: String,
        required: [true, messageError]
    },
    password: {
        type: String,
        required: [true, messageError]
    }
});

//antes de salvar no banco ele criptografia a senha
UsersSchema.pre('save', function (next) {
    this.password = md5(this.password);
    next();
});

//faz o link do schema com a collection;
const Users = mongoose.model('usuarios', UsersSchema);
module.exports = Users;
