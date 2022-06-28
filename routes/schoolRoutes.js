const routes = require("express").Router();
const schoolController = require("./../controllers/schoolController");

routes
  .get("/coordenadas", schoolController.coordinates)
  .get("/index", schoolController.showMaps)
  .get("/new", schoolController.newSchool)
  .post("/escola", schoolController.saveSchool)
  .get("/:id", schoolController.showById);

module.exports = routes;
