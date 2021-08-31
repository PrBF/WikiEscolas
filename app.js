const express = require('express')
const app = express()
const path = require('path')
const methodOverride = require('method-override')
const mongoose= require('mongoose');
const Escola = require('./models/escola');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');

app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

mongoose.connect('mongodb://localhost:27017/dbWiki', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() =>{
    console.log("Conexão com o banco estabelecida");
})
.catch(err =>{
    console.log("Erro ao conectar com o banco....");
    console.log(err);
})

app.use(session({secret: 'my_secret', resave: false, saveUninitialized: false}))
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(Escola.authenticate()))

app.get('/', (req, res) =>{
    res.render('index')
})

app.get('/show', (req, res) =>{
    res.render('show')
})

app.get('/login', (req, res) =>{
    res.render('escolas/login');
})

app.get('/escolas/new', (req, res) =>{
    res.render('escolas/new');
})

app.post ('/escola', async (req, res) =>{
    const escola = new Escola (req.body);
    await escola.save();
    res.redirect('/login');
})


app.get('/escolas/:id', async (req, res) =>{
    const {id} = req.params;
    const escola = await Escola.findById(id);
    if (escola){
        res.render('escolas/show', {escola});
    } else {
        res.render('error');
    }
})

app.listen(4000, () =>{
    console.log("Rodando")
})