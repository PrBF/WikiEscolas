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

app.use(session({secret: 'my_secret...', resave: false, saveUninitialized: false}))
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(Escola.authenticate()));
passport.serializeUser(Escola.serializeUser());
passport.deserializeUser(Escola.deserializeUser());

app.use((req, res, next) =>{
    res.locals.currentUser = req.user;
    next();
})

const isLoggedIn = (req, res, next) =>{
    if(req.isAuthenticated()){
        return next();
    }
    req.session.returnTo = req.originalUrl;
    res.redirect("login");
}

app.get('/coordenadas', async (req, res) => {
    const info = await Escola.find({});
    const coordEscolas = [];
    for (var i = 0; i < info.length; i++){
        var objCor = {
            id: info[i]._id,
            nome: info[i].nome,
            lat_log : [info[i].latitude, info[i].longitude]
        }
        coordEscolas.push(objCor);
    }
    res.json(coordEscolas);
})

app.get('/', (req, res) =>{
    res.render('index')
})

app.get('/show', (req, res) =>{
    res.render('show')
})

app.get('/login', (req, res) =>{
    res.render('escolas/login');
})

app.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/show')
})

app.post('/login',
  passport.authenticate('local', { successRedirect: '/escola',
                                   failureRedirect: '/login', })
);

app.get('/escola', isLoggedIn, async(req, res) => {
    const id = req.user;
    const escola = await Escola.findById(id);
    res.render('escolas/index', {escola})
})


app.get('/escola/new', (req, res) =>{
    res.render('escolas/new');
})

app.post ('/escola', async (req, res) =>{
    try{
        const {nome, cnpj, endereco, latitude, longitude, id_inep, responsavel, email, tel1, tel2, facebook, instagram, site, blog, modalidade, tipo_inst, foto, horario_funcMin, horario_funcMax, ano_fund, username,  password, autorizacao} = req.body;
        const escola = new Escola ({nome, cnpj, endereco,  latitude, longitude, id_inep, responsavel, email, tel1, tel2, facebook, instagram, site, blog, modalidade, tipo_inst, foto, horario_funcMin, horario_funcMax, username, ano_fund, autorizacao})
        const escolaRegistrada = await Escola.register(escola, password);
        console.log(escolaRegistrada, err => {
            if (err) return next(err);
        })
    } catch (e){
        console.log(e);
    }
    res.redirect('/login');
    
})


app.get('/escola/:id', async (req, res) =>{
    const {id} = req.params;
    const escola = await Escola.findById(id);
    if (escola){
        res.render('escolas/show', {escola});
    } else {
        res.render('error');
    }
})



app.get('/escola/:id/edit', isLoggedIn, async(req, res) => {
    const {id} = req.params;
    const escola = await Escola.findById(id);
    res.render('escolas/edit', {escola});
})

app.put ('/escola/:id', isLoggedIn, async (req, res) => {
    const {id} = req.params;
    await Escola.findByIdAndUpdate(id, req.body, {runValidators: true, new:true, safe: true, upsert: true});
    res.redirect('/escola');
})


app.listen(4000, () =>{
    console.log("Rodando")
})