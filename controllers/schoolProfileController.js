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

  static async newEvent(req, res) {
    const { id } = req.params;
    const escola = await Escola.findById(id);
    res.render("escolas/eventos/new", { escola });
  }

  static async saveEvent(req, res) {
    const { id } = req.params;
    const {
      nome_evento,
      descricao,
      endereco,
      data_inicio,
      data_fim,
      hora_inicio,
      hora_fim,
    } = req.body;
    const escola = await Escola.findByIdAndUpdate(
      id,
      {
        $push: {
          eventos: {
            nome_evento,
            descricao,
            endereco,
            data_inicio,
            data_fim,
            hora_inicio,
            hora_fim,
          },
        },
      },
      { runValidators: true, new: true, safe: true, upsert: true }
    );
    await escola.save();
    res.redirect("/escola");
  }

  static async editEvent(req, res) {
    const { id, eventId } = req.params;
    const escola = await Escola.findById(id);
    const evento = escola.eventos.find((not) => not._id == eventId);
    res.render("escolas/eventos/edit", { escola, evento });
  }

  static async updateEvent(req, res) {
    const { id, eventId } = req.params;
    const evento = req.body;
    try {
      await Escola.updateOne(
        {
          _id: id,
          "eventos._id": eventId,
        },
        { $set: { "eventos.$": evento } },
        { runValidators: true }
      );
    } catch (err) {
      console.log(err);
    }
    res.redirect("/escola/" + id);
  }

  static async deleteEvent(req, res) {
    const { id } = req.params;
    const { eventId } = req.params;
    try {
      await Escola.findByIdAndUpdate(id, {
        $pull: { eventos: { _id: eventId } },
      });
    } catch (e) {
      console.log(e);
    }
    res.redirect("/escola");
  }

  static async newProject(req, res) {
    const { id } = req.params;
    const escola = await Escola.findById(id);
    res.render("escolas/projetos/new", { escola });
  }

  static async saveProject(req, res) {
    const { id } = req.params;
    const { titulo, descricao, coordenador, contato, data_inicio } = req.body;
    const escola = await Escola.findByIdAndUpdate(
      id,
      {
        $push: {
          projetos: { titulo, descricao, coordenador, contato, data_inicio },
        },
      },
      { runValidators: true, new: true, safe: true, upsert: true }
    );
    escola.save();
    res.redirect("/escola");
  }

  static async editProject(req, res) {
    const { id, projectId } = req.params;
    const escola = await Escola.findById(id);
    const projeto = escola.projetos.find((not) => not._id == projectId);
    res.render("escolas/projetos/edit", { escola, projeto });
  }

  static async updateProject(req, res) {
    const { id, projectId } = req.params;
    const projeto = req.body;
    try {
      await Escola.updateOne(
        {
          _id: id,
          "projetos._id": projectId,
        },
        { $set: { "projetos.$": projeto } },
        { runValidators: true }
      );
    } catch (err) {
      console.log(err);
    }
    res.redirect("/escola");
  }

  static async deleteProject(req, res) {
    const { id } = req.params;
    const { projectId } = req.params;
    try {
      await Escola.findByIdAndUpdate(id, {
        $pull: { projetos: { _id: projectId } },
      });
    } catch (e) {
      console.log(e);
    }
    res.redirect("/escola");
  }
}

module.exports = SchoolProfileController;
