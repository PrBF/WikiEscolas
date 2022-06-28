const mongoose = require("mongoose");

const connection = mongoose
  .connect("mongodb://localhost:27017/dbWiki", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conexão com o banco estabelecida");
  })
  .catch((err) => {
    console.log("Erro ao conectar com o banco....");
    console.log(err);
  });

module.exports = connection;
