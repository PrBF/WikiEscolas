const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const connection = require("./db/config/connection.js");
const Escola = require("./models/escola");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const flash = require("connect-flash");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));
app.use(flash());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const school = require("./routes/schoolRoutes");
const index = require("./routes/indexRoutes");
const profile = require("./routes/schoolProfileRoutes");
app.use("/index", index);
app.use("/escolas", school);
app.use("/profile", profile);

app.use(
  session({ secret: "my_secret...", resave: false, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(Escola.authenticate()));
passport.serializeUser(Escola.serializeUser());
passport.deserializeUser(Escola.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.session.returnTo = req.originalUrl;
  res.redirect("login");
};

app.get("/login", (req, res) => {
  const errors = req.flash().error || [];
  res.render("escolas/login", { errors });
});

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/show");
});

app.post(
  "/login",
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",

    successRedirect: "/escola",
  })
);

app.get("/escola/:id/evento/new", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const escola = await Escola.findById(id);
  res.render("escolas/eventos/new", { escola });
});

app.post("/escola/:id/evento", isLoggedIn, async (req, res) => {
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
});

app.get("/escola/:id/evento/:id_evento", isLoggedIn, async (req, res) => {
  const { id, id_evento } = req.params;
  const escola = await Escola.findById(id);
  const evento = escola.eventos.find((not) => not._id == id_evento);
  res.render("escolas/eventos/edit", { escola, evento });
});

app.put("/escola/:id/evento/:id_evento", isLoggedIn, async (req, res) => {
  const { id, id_evento } = req.params;
  const evento = req.body;
  try {
    await Escola.updateOne(
      {
        _id: id,
        "eventos._id": id_evento,
      },
      { $set: { "eventos.$": evento } },
      { runValidators: true }
    );
  } catch (err) {
    console.log(err);
  }

  res.redirect("/escola/" + id);
});

app.delete("/escola/:id/evento/:id_evento", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const { id_evento } = req.params;
  try {
    await Escola.findByIdAndUpdate(id, {
      $pull: { eventos: { _id: id_evento } },
    });
  } catch (e) {
    console.log(e);
  }
  res.redirect("/escola");
});

app.get("/escola/:id/projeto/new", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const escola = await Escola.findById(id);
  res.render("escolas/projetos/new", { escola });
});

app.post("/escola/:id/projeto", isLoggedIn, async (req, res) => {
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
});

app.get(
  "/escola/:id/projeto/:id_projeto/edit",
  isLoggedIn,
  async (req, res) => {
    const { id, id_projeto } = req.params;
    const escola = await Escola.findById(id);
    const projeto = escola.projetos.find((not) => not._id == id_projeto);
    res.render("escolas/projetos/edit", { escola, projeto });
  }
);

app.put("/escola/:id/projeto/:id_projeto", isLoggedIn, async (req, res) => {
  const { id, id_projeto } = req.params;
  const projeto = req.body;
  try {
    await Escola.updateOne(
      {
        _id: id,
        "projetos._id": id_projeto,
      },
      { $set: { "projetos.$": projeto } },
      { runValidators: true }
    );
  } catch (err) {
    console.log(err);
  }
  res.redirect("/escola");
});

app.delete("/escola/:id/projeto/:id_projeto", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const { id_projeto } = req.params;
  try {
    await Escola.findByIdAndUpdate(id, {
      $pull: { projetos: { _id: id_projeto } },
    });
  } catch (e) {
    console.log(e);
  }
  res.redirect("/escola");
});

app.listen(4000, () => {
  console.log("Rodando");
});
