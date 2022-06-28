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
const dotenv = require("dotenv");
dotenv.config();

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

app.listen(process.env.PORT, () => {
  console.log("Rodando");
});
