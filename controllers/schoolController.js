const Escola = require("./../models/escola");

class SchoolController {
  static async coordinates(req, res) {
    const info = await Escola.find({});
    const coordEscolas = [];
    for (var i = 0; i < info.length; i++) {
      var objCor = {
        id: info[i]._id,
        nome: info[i].nome,
        lat_log: [info[i].latitude, info[i].longitude],
      };
      coordEscolas.push(objCor);
    }
    res.json(coordEscolas);
  }

  static showMaps(req, res) {
    res.render("show");
  }

  static newSchool(req, res) {
    res.render("escolas/new");
  }

  static async saveSchool(req, res) {
    const {
      nome,
      cnpj,
      endereco,
      latitude,
      longitude,
      id_inep,
      responsavel,
      email,
      tel1,
      tel2,
      facebook,
      instagram,
      site,
      blog,
      modalidade,
      tipo_inst,
      foto,
      horario_funcMin,
      horario_funcMax,
      ano_fund,
      calendario,
      proj_pol_pedag,
      username,
      autorizacao,
    } = req.body;
    const escola = new Escola({
      nome,
      cnpj,
      endereco,
      latitude,
      longitude,
      id_inep,
      responsavel,
      email,
      tel1,
      tel2,
      facebook,
      instagram,
      site,
      blog,
      modalidade,
      tipo_inst,
      foto,
      horario_funcMin,
      horario_funcMax,
      username,
      ano_fund,
      calendario,
      proj_pol_pedag,
      autorizacao,
    });

    Escola.register(escola, req.body.password, (err) => {
      if (err) {
        console.log(err);
        res.render("escolas/new");
      } else {
        passport.authenticate("local")(req, res, () => {
          res.redirect("/escola");
        });
      }
    });
  }

  static async showById(req, res) {
    const { id } = req.params;
    const escola = await Escola.findById(id);
    if (escola) {
      res.render("escolas/show", { escola });
    } else {
      res.render("error");
    }
  }
}

module.exports = SchoolController;
