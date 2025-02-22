 
const mysql = require('mysql2')

async function updateInstrumentsCart(id){
    try{
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'music',
            password: 'root',
            database: 'musicologist',
            port: '3306'
        })

        const MYSQLQUERY = `UPDATE instruments JOIN instrumentsCart ON instruments.id = instrumentsCart.codInst JOIN cart ON InstrumentsCart.codCart = cart.id SET quantity = quantity - 1 WHERE cart.id = ${id}`

        if(await connection.execute(MYSQLQUERY)){
            return{
                success: true
            }
        }

    }catch(err){
        console.error("Error: ", err)
    }
}

module.exports = updateInstrumentsCart