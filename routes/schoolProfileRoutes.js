const routes = require("express").Router();
const SchoolProfileController = require("../controllers/schoolProfileController");

routes
  .get("/index", SchoolProfileController.showProfile)
  .get("/:id/edit", SchoolProfileController.editProfile)
  .put("/:id", SchoolProfileController.updateProfile)
  .delete("/:id", SchoolProfileController.deleteProfile)
  .get("/:id/notice/new", SchoolProfileController.newNotice)
  .post("/:id/notice", SchoolProfileController.saveNotice)
  .get("/:id/notice/:noticeId/edit", SchoolProfileController.editNotice)
  .put("/:id/notice/:noticeId", SchoolProfileController.updateNotice)
  .delete("/:id/notice/:noticeId", SchoolProfileController.deleteNotice)
  .get("/:id/event/new", SchoolProfileController.newEvent)
  .post("/:id/event", SchoolProfileController.saveEvent)
  .get("/:id/event/:eventId", SchoolProfileController.editEvent)
  .put("/:id/event/:eventId", SchoolProfileController.updateEvent)
  .delete("/:id/event/:eventId", SchoolProfileController.deleteEvent)
  .get("/:id/project/new", SchoolProfileController.newProject)
  .post("/:id/project", SchoolProfileController.saveProject)
  .get("/:id/project/:projectId/edit", SchoolProfileController.editProject)
  .put("/:id/project/:projectId", SchoolProfileController.updateProject)
  .delete("/:id/project/:projectId", SchoolProfileController.deleteProject);

module.exports = routes;
