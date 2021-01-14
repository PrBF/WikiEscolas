const express = require ("express");
const wiki = express();

wiki.get("/", function(req,res){
    res.send ("Pagina inicial");
})

wiki.get("/cadastro_escolas", function(req,res){
    res.send ("Cadastramento de escolas");
})

wiki.get ("/visualiza_mapa", function(req,res){
    res.send ("Integração com API");
})



wiki.listen(8050);