const express = require('express')
const app = express()
const path = require('path')
const methodOverride = require('method-override')

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

app.post ('/escolas', async (req, res) =>{
    const novaEscola = new Escola(req.body);
    await novaEscola.save();
    res.redirect('/');
})

app.get('/escola/:id/show', (req, res) =>{
    const {id} = req.params;
    res.render('escolas/show', {id});
})

app.listen(3000, () =>{
    console.log("Rodando")
})
