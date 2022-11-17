const express = require('express')
const app = express()
const path = require('path')
const methodOverride = require('method-override')
const Escola = require('./models/escola');
const adm = require('./models/adm');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const flash = require('connect-flash')
require('./config/db/connection');
require('dotenv').config();
const bcrypt = require('bcryptjs');

app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', require('./routes/index'));
app.use('/api', require('./routes/api'))

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

app.get('/index', (req, res) => {
    res.render('show')
});

app.get('/login', (req, res) =>{
    let errors = req.flash().error || []
    if (errors.length > 0) errors = "Usuário ou senha incorretos"
    res.render('escolas/login', {errors});
})

app.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/index')
})

app.post('/login',
  passport.authenticate('local', { 
      failureFlash: true,
      failureRedirect: '/login', 

      successRedirect: '/escola',
    })
);

app.post ('/escola', async (req, res) =>{
    const data = req.body;
    const escola = new Escola (data)

    Escola.register(escola, req.body.password, (err) => {
      if (err){
        const errors = req.flash().err || []
        res.render('escolas/new', {errors});
      } else {
          passport.authenticate("local")(req, res, () => {
              res.redirect('/escola')
          })
      }
    })
 
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

app.get('/escola', isLoggedIn, async(req, res) => {
    const id = req.user;
    const escola = await Escola.findById(id);
    res.render('escolas/index', {escola})
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

app.delete('/escola/:id', isLoggedIn, async(req,res) => {
    const {id} = req.params;
    await Escola.findByIdAndDelete(id);
    res.redirect('/');
})

app.get ('/escola/:id/noticia/new', isLoggedIn, async(req, res) => {
    const {id} = req.params;
    const escola = await Escola.findById(id);
    res.render('escolas/noticias/new', {escola});
})

app.post('/escola/:id/noticia', isLoggedIn, async(req, res) => {
    const {id} = req.params;
    const {titulo, descricao, data_post} = req.body;
    const escola = await Escola.findByIdAndUpdate(id, {$push: {noticias: {titulo, descricao, data_post}}}, {runValidators: true, new: true, safe:true, upsert:true})
    await escola.save();
    res.redirect('/escola'); //depois redirecionar para a listagem de noticias da escola
})

app.get('/escola/:id/noticia/:id_noticia/edit', isLoggedIn, async(req,res) => {
    const {id} = req.params;
    const {id_noticia} = req.params;
    const escola = await Escola.findById(id);
    const noticia = escola.noticias.find(not => not._id == id_noticia);
    res.render('escolas/noticias/edit', {escola, noticia})
})

app.put('/escola/:id/noticia/:id_noticia', isLoggedIn, async(req, res) => {
    const {id, id_noticia} = req.params;
    const noticia = req.body;
    try{
        await Escola.updateOne(
            {
              _id: id,
              "noticias._id": id_noticia
            },
            { $set: { "noticias.$" :  noticia} },
            {runValidators: true}
         )
    } catch(err){
        console.log(err);
    }
    res.redirect('/escola')
})

app.delete('/escola/:id/noticia/:id_noticia', isLoggedIn, async(req, res) => {
    const {id} = req.params;
    const {id_noticia} = req.params;
    try{
        await Escola.findByIdAndUpdate(id, {$pull: {noticias: {_id: id_noticia}}})
    } catch(e){
        console.log(e)
    }
    res.redirect('/escola')
})

app.get('/escola/:id/evento/new', isLoggedIn, async(req, res) => {
    const {id} = req.params;
    const escola = await Escola.findById(id);
    res.render('escolas/eventos/new', {escola})
})

app.post('/escola/:id/evento', isLoggedIn, async(req, res) => {
    const {id} = req.params;
    const {nome_evento, descricao, endereco, data_inicio, data_fim, hora_inicio, hora_fim} = req.body;
    const escola = await Escola.findByIdAndUpdate(id, {$push: {eventos: {nome_evento, descricao, endereco, data_inicio, data_fim, hora_inicio, hora_fim}}}, {runValidators: true, new: true, safe:true, upsert:true})
    await escola.save();
    res.redirect('/escola');
})

app.get('/escola/:id/evento/:id_evento', isLoggedIn, async (req, res) => {
    const {id, id_evento } = req.params;
    const escola = await Escola.findById(id);
    const evento = escola.eventos.find(not => not._id == id_evento);
    res.render('escolas/eventos/edit', {escola, evento})
})

app.put('/escola/:id/evento/:id_evento', isLoggedIn, async(req, res) => {
    const {id, id_evento} = req.params;
    const evento = req.body;
    try{
        await Escola.updateOne(
            {
                _id: id, 
                "eventos._id": id_evento
            },
            { $set: { "eventos.$" : evento}},
            {runValidators: true}
        )
    }catch (err){
        console.log(err);
    }

    res.redirect('/escola/' + id)
})

app.delete('/escola/:id/evento/:id_evento', isLoggedIn, async(req, res) => {
    const {id} = req.params;
    const {id_evento} = req.params;
    try{
       await Escola.findByIdAndUpdate(id, {$pull: {eventos: {_id: id_evento}}})
    } catch(e){
        console.log(e)
    }
    res.redirect('/escola')
})

app.get('/escola/:id/projeto/new', isLoggedIn, async(req, res) => {
    const {id} = req.params;
    const escola = await Escola.findById(id);
    res.render('escolas/projetos/new', {escola})
})

app.post ('/escola/:id/projeto', isLoggedIn, async(req, res) => {
    const {id} = req.params;
    const {titulo, descricao, coordenador, contato, data_inicio} = req.body;
    const escola = await Escola.findByIdAndUpdate(id, {$push: {projetos: {titulo, descricao, coordenador, contato, data_inicio}}}, {runValidators: true, new: true, safe: true, upsert: true})
    escola.save();
    res.redirect('/escola')
})

app.get('/escola/:id/projeto/:id_projeto/edit', isLoggedIn, async(req, res) => {
    const {id, id_projeto} = req.params;
    const escola = await Escola.findById(id);
    const projeto = escola.projetos.find(not => not._id == id_projeto);
    res.render('escolas/projetos/edit', {escola, projeto})
})

app.put('/escola/:id/projeto/:id_projeto', isLoggedIn, async(req, res) => {
    const {id, id_projeto} = req.params;
    const projeto = req.body;
    try{
        await Escola.updateOne(
            {
                _id: id, 
                "projetos._id": id_projeto
            }, 
            { $set: { "projetos.$": projeto}},
            {runValidators: true}
        )
    } catch(err){
        console.log(err);
    }
    res.redirect('/escola');
})

app.delete('/escola/:id/projeto/:id_projeto', isLoggedIn, async (req, res) => {
    const {id} = req.params;
    const {id_projeto} = req.params;
    try{
        await Escola.findByIdAndUpdate(id, {$pull: {projetos: {_id: id_projeto}}})
    } catch (e){
        console.log(e)
    }
    res.redirect('/escola')
})

app.get('/administrador', async (req, res) => {
    const data = await Escola.find({}, {denuncias: 1})
    res.render('administrador/index', { data })
});

app.get('/login-adm', async(req, res) => {
    const errors = req.flash().error || []
    res.render('administrador/login', {errors});
})

app.post('/login-adm', async(req, res) => {
    const {password} = req.body;
    const userWiki =  await adm.findOne({});
    try{
        const pass = await bcrypt.compare(password, userWiki.hash);
        if(userWiki.user == process.env.WIKIUSER && pass ) res.redirect('/administrador')
        else throw Error;
    }catch(err){
        res.redirect('/login-adm')
    }
})

app.delete('/administrador/remove/:idEscola', async(req, res) => {
    const {idEscola} = req.params;
    await Escola.findByIdAndDelete(idEscola);
    res.redirect('/administrador')
})

app.post('/escola/:id/denuncia', async (req, res) => {
    const { id } = req.params;
    const {denuncia} = req.body;
    try{
        if(denuncia == 'on'){
            const escola = await Escola.findById(id);
            await Escola.findByIdAndUpdate(id , {$push:{denuncias: {id_escola: escola._id, nome_escola: escola.nome }}});
            res.redirect('/index');    
        } else  {
            console.log('erro');
        }
    }catch(err){
        console.log(err);
    }
})

app.listen(3000, () =>{
    console.log("Rodando")
})