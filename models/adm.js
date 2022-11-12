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
    }
}), "adm"); 

module.exports = adm