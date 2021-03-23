
async function connect(){
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;
 
    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection("mysql://root:boogames11!@127.0.0.1:3306/wiki");
    console.log("Conectado");
    global.connection = connection;
    return connection;
}


async function select(){
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM escola;');
    return rows;
}
 
module.exports = {select}

(async () => {
    const db = require("./db");
    console.log('Começou!');
 
    console.log('SELECT * FROM escola');
    const clientes = await db.select();
    console.log(escola);
})();


async function insert(escola){
    const conn = await connect();
    const sql = 'INSERT INTO escola(nome, endereco, inep, responsavel) VALUES (?,?,?);';
    const values = [escola.nome, escola.endereco, escola.inep, ecola.responsavel];
    return await conn.query(sql, values);
}
