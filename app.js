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

app.post ('/confirma', (req, res) =>{
    //falta tipo de instituição
    const {nome_escola, endereco, INEP, responsavel, email, telefone, modalidade, horario, foto,ano} = req.body;
    res.render('confirmacao',{nome_escola, endereco, INEP, responsavel, email, telefone, modalidade, horario, foto,ano})
})

app.get('/escola/:id/show', (req, res) =>{
    const {id} = req.params;
    res.render('escolas/show', {id});
})

app.listen(3000, () =>{
    console.log("Rodando")
})