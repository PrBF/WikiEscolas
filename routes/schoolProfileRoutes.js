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
  .delete("/:id/notice/:noticeId", SchoolProfileController.deleteNotice);
module.exports = routes;
