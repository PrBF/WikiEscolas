const Escola = require("./../models");

class SchoolProfileController {
  static async showProfile(req, res) {
    const id = req.user;
    const escola = await Escola.findById(id);
    res.render("escolas/index", { escola });
  }

  static async editProfile(req, res) {
    const { id } = req.params;
    const escola = await Escola.findById(id);
    res.render("escolas/edit", { escola });
  }

  static async updateProfile(req, res) {
    const { id } = req.params;
    await Escola.findByIdAndUpdate(id, req.body, {
      runValidators: true,
      new: true,
      safe: true,
      upsert: true,
    });
    res.redirect("/escola");
  }

  static async deleteProfile(req, res) {
    const { id } = req.params;
    await Escola.findByIdAndDelete(id);
    res.redirect("/");
  }
}

module.exports = SchoolProfileController;
