const express = require ("express");
const wiki = express();
const path = require('path');

wiki.use(express.urlencoded({extended: true}));

wiki.use(express.static(path.join(__dirname, 'public')));
wiki.set ('view engine', 'ejs');
wiki.set ('views', path.join(__dirname, 'views'));

wiki.get("/", function(req,res){
    res.send ("Pagina inicial");
})

wiki.get("/cadastro_escolas", function(req,res){
    res.render ('cadastro');
})

wiki.post("/dados_escolas", function(req,res){
    const {nome_escola, endereco, INEP, responsavel} = req.body;
    const { email, telefone, modalidade, tipoInst, horario, foto, ano} = req.body;

    res.render ('dados_escolas', {nome_escola, endereco, INEP, responsavel, email, telefone, modalidade, tipoInst, horario, foto, ano});
})


wiki.get ("/visualiza_mapa", function(req,res){
    res.send ("Integração com API");
})



wiki.listen(3000);