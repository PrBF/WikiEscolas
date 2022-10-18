const routes = require("express").Router();
const ApiController = require("../controllers/apiController");

routes
  .get("/", ApiController.coordenadas);

module.exports = routes;