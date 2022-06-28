const routes = require("express").Router();
const IndexController = require("../controllers/indexController");

routes
  .get("/", IndexController.home)
  .get("/lgpd", IndexController.lgpd)
  .get("/termos-e-condicoes", IndexController.termosCondicoes);

module.exports = routes;
