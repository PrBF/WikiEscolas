const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const connection = mongoose
  .connect(
    `mongodb://localhost:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Conexão com o banco estabelecida");
  })
  .catch((err) => {
    console.log("Erro ao conectar com o banco....");
    console.log(err);
  });

module.exports = connection;