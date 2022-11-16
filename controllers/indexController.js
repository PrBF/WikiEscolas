const Escola = require('./../models/escola');

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
}
  
module.exports = IndexController;