const mongoose = require("mongoose");

class MongoDBConnectionHelper {
  static connect() {
    //criação da conexão com o mongo
    const conexao = mongoose.connect(process.env.MONGO_DB_STRING_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    //conexão com sucesso
    mongoose.connection.on("connected", () =>
      console.log("Conectado ao mongodb")
    );

    //erro na conexão
    mongoose.connection.on("error", (e) =>
      console.error("Erro ao conectar com o Banco de Dados", e.message)
    );

    return conexao;
  }
}

module.exports = MongoDBConnectionHelper;
