const mongoose = require('mongoose');

const escolaSchema = new mongoose.Schema({
    nome:{
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
    id_inep: {
        type: Number,
        required: true
    },
    responsavel: {
        type: String,
        required: true
    }, 
    contato: {
        email:{
            type: String, 
            required: true
        },
        telefone: {
            tel1: {
                type: Number,
                required: true
            }, 
            tel2: {
                type: Number, 
                required: true
            }
        }, 
        redes: {
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
            }
        }
    }, 
    modalidade:{
        regular:{
            type: String
        }, 
        eja:{
            type: String
        }, 
        proeja: {
            type: String
        }, 
        prof_tec: {
            type: String
        },
        indigena:{
            type: String
        },
        quilombola:{
            type: String
        },
        educacao_campo:{
            type: String
        }

    },
    tipo_inst: {
        federal:{
            type: String
        }, 
        estadual:{
            type: String
        }, 
        municipal:{
            type: String
        }
    },
    username: {
        type: String, 
        required: true
    },
    foto: {
        type: String,
    }, 
    horario_func: {
        type: Date,
        required: true
    }, 
    ano_fund : {
        type: Date
    }
})


const Escola = mongoose.model("Escola", escolaSchema);

module.exports = Escola;