const routes = require("express").Router();
const IndexController = require("../controllers/indexController");

routes
  .get("/", IndexController.home)
  .get("/lgpd", IndexController.lgpd)
  .get("/termos-e-condicoes", IndexController.termosCondicoes)
  .get('/new', IndexController.newSchool)
  // .get('/:id', IndexController.showSchool)
  .post('/search', IndexController.getByName)


module.exports = routes;