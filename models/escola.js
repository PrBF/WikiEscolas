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
        type: String, 
        required: true
    }, 
    longitude:{
        type: String, 
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
        type: String,
        required: true
    }, 
    tel2: {
        type: String, 
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
    horario_funcMin: {
        type: String, 
    
    },
    horario_funcMax: {
        type: String, 
    },
  
    ano_fund : {
        type: Date
    },
    autorizacao : {
        type: String,
        required: true, 
    },
    noticias: [
        {
            titulo: {
                type: String
            },
            descricao:{
                type:String
            },
            data_post:{
                type: Date
            }
        }
    ],
    projetos : [
        {
            titulo: {
                type: String,
                required: true
            },
            descricao: {
                type: String,
                required: true
            },
            coordenador: {
                type: String,
                required: true
            },
            contato: {
                type: String,
                required: true
            },
            data_inicio: {
                type: Date,
                required: true    
            }
        }
    ],

    eventos : [
        {
            nome_evento: {
                type: String,
                required: true
            },
            descricao: {
                type: String,
                required: true
            },
            endereco: {
                type: String,
                required: true
            },
            data_inicio: {
                type: Date,
                required: true
            },
            data_fim: {
                type: Date,
                required: true
            },
            hora_inicio: {
                type: String,
                required: true
            },
            hora_fim: {
                type: String,
                required: true
            }
        }
    ],
    calendario: {
        type: String
    },
    proj_pol_pedag: {
        type: String
    },
    denuncias: [{
        id_escola: {
            type: String
        },
        nome_escola: {
            type: String
        },
        data_denuncia: {
            type: Date,
            default: Date.now()
        },
    }]

})

escolaSchema.plugin(passportLocalMongoose);

const Escola = mongoose.model("Escola", escolaSchema);

module.exports = Escola;
