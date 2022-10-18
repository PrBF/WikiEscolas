const Escola = require('./../models/escola')

class IndexController {
    static home(req, res) {
      res.render("index");
    }
    static lgpd(req, res) {
      res.render("lgpd");
    }
  
    static termosCondicoes(req, res) {
      res.render("termos");
    }

    static newSchool(req, res){
        res.render('escolas/new');
    }

    static async getByName(req, res) {
        let{ nome }  = req.body;
        const resultados = await Escola.find({ 'nome' : { '$regex' : nome} });
        res.render('show', {resultados})
    }

  }
  
module.exports = IndexController;