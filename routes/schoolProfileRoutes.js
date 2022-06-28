const routes = require("express").Router();
const SchoolProfileController = require("../controllers/schoolProfileController");

routes
  .get("/index", SchoolProfileController.showProfile)
  .get("/:id/edit", SchoolProfileController.editProfile)
  .put("/:id", SchoolProfileController.updateProfile)
  .delete("/:id", SchoolProfileController.deleteProfile);

module.exports = routes;
