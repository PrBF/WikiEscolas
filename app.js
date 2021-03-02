const express = require ('express');
const wiki = express();
const path = require('path');
const methodOverride = require('method-override');


wiki.use(express.urlencoded({extended: true}));
wiki.use(methodOverride('_method'));
wiki.use(express.static(path.join(__dirname, 'public')));
wiki.set ('view engine', 'ejs');
wiki.set ('views', path.join(__dirname, 'views'));

wiki.get('/', function(req,res){
    res.send ("Pagina inicial");
})

wiki.get('/escolas/cadastro_escolas', function(req,res){
    res.render ('escolas/new');
})

wiki.post('/escolas', function(req,res){
    const {nome_escola, endereco, INEP, responsavel} = req.body;
    const { email, telefone, modalidade, tipoInst, horario, foto, ano} = req.body;

    res.render ('escolas/show', {nome_escola, endereco, INEP, responsavel, email, telefone, modalidade, tipoInst, horario, foto, ano});
})

wiki.get('/escolas/:INEP/edit', (req,res) =>{
    res.send("atualização dos dados da escola");
})

wiki.patch('/escolas/:INEP', (req,res) =>{
    const {codigo} = req.params;
    const {nome_escola, endereco, responsavel} = req.body;
    const novoNome = req.body.nome_escola;
    const novoEndereco = req.body.endereco;
    const novoResponsavel = req.body.responsavel;
    const novoEmail = req.body.email;
    const novoTelefone = req.body.telefone;
    const atualizaModalidade = req.body.modalidade;
    const atualizaTipoInst = req.body.tipoInst;
    const atualizaHorario = req.body.horario;
    const atualizaFoto = req.body.foto;
    const atualizaAno = req.body.ano;
    const { email, telefone, modalidade, tipoInst, horario, foto, ano} = req.body;
    //const de filtro de busca
    //atribuição
    res.redirect('/escolas/'+ codigo);
})

wiki.delete('/escolas/:INEP', (req,res) =>{
    const {codigo} = req.params;
    //filtro de código 
    res.redirect('/escolas');
})

wiki.get ('/visualiza_mapa', function(req,res){
    res.send ("Integração com API");
})


wiki.listen(3000, () =>{
    console.log("Servidor rodando!");
});