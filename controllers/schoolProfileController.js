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

  static async newNotice(req, res) {
    const { id } = req.params;
    const escola = await Escola.findById(id);
    res.render("escolas/noticias/new", { escola });
  }

  static async saveNotice(req, res) {
    const { id } = req.params;
    const { titulo, descricao, data_post } = req.body;
    const escola = await Escola.findByIdAndUpdate(
      id,
      { $push: { noticias: { titulo, descricao, data_post } } },
      { runValidators: true, new: true, safe: true, upsert: true }
    );
    await escola.save();
    res.redirect("/escola");
  }

  static async editNotice(req, res) {
    const { id } = req.params;
    const { id_noticia } = req.params;
    const escola = await Escola.findById(id);
    const noticia = escola.noticias.find((not) => not._id == id_noticia);
    res.render("escolas/noticias/edit", { escola, noticia });
  }

  static async updateNotice(req, res) {
    const { id, id_noticia } = req.params;
    const noticia = req.body;
    try {
      await Escola.updateOne(
        {
          _id: id,
          "noticias._id": id_noticia,
        },
        { $set: { "noticias.$": noticia } },
        { runValidators: true }
      );
    } catch (err) {
      console.log(err);
    }
    res.redirect("/escola");
  }

  static async deleteNotice(req, res) {
    const { id } = req.params;
    const { noticeId } = req.params;
    try {
      await Escola.findByIdAndUpdate(id, {
        $pull: { noticias: { _id: noticeId } },
      });
    } catch (e) {
      console.log(e);
    }
    res.redirect("/escola");
  }
}

module.exports = SchoolProfileController;
