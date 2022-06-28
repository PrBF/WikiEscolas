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
}

module.exports = IndexController;
