const mongoose = require('mongoose');

const Schema = mongoose.Schema;  

var adm = mongoose.model("adm", new Schema({
    user: {
        type: String, 
        required: true
    },
    hash: {
        type: String, 
        required: true
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
        acao: {
            type: String
        }
    }]
}), "adm"); 

module.exports = adm