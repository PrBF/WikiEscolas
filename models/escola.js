const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const escolaSchema = new mongoose.Schema({
    nome:{
        type: String,
        required: true
    }, 
    username:{
        type: String, 
        required: true
    },
    cnpj:{
        type: String
    },
    endereco:{
        type: String, 
        required: true
    }, 
    latitude:{
        type: Number, 
        required: true
    }, 
    longitude:{
        type: Number, 
        required: true
    },
    id_inep: {
        type: Number,
        required: true
    },
    responsavel: {
        type: String,
        required: true
    }, 
 
    email:{
        type: String, 
        required: true
    },

    tel1: {
        type: Number,
        required: true
    }, 
    tel2: {
        type: Number, 
    },

    facebook: {
        type: String, 
    }, 
    youtube: {
        type: String,
    },
    instagram: {
        type: String
    },
    site: {
        type: String
    }, 
    blog: {
        type: String
    },
 
    modalidade:{
        type: String,
        required: true
    },
    tipo_inst: {
        type: String, 
        required: true
    },
    foto: {
        type: String,
    }, 
    horario_func: {
        horario_funcMin: {
            type: Date, 
       
        },
        horario_funMax: {
            type: Date, 
        },
    }, 
    ano_fund : {
        type: Date
    }
})

escolaSchema.plugin(passportLocalMongoose);

const Escola = mongoose.model("Escola", escolaSchema);

module.exports = Escola;