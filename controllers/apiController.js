const Escola = require('./../models/escola')

class apiController {
    static async coordenadas (req,res){
        const info = await Escola.find({});
        const coordEscolas = [];
        for (var i = 0; i < info.length; i++){
            var objCor = {
                id: info[i]._id,
                nome: info[i].nome,
                lat_log : [info[i].latitude, info[i].longitude]
            }
            coordEscolas.push(objCor);
        }
        res.json(coordEscolas);
    }
}

module.exports = apiController;