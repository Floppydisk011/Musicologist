 
const mysql = require('mysql2')
const updateInstrumentsCart = require('./updateInstrumentCart')

async function getTotalInstruments(id){
    try{
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'music',
            password: 'root',
            database: 'musicologist',
            port: '3306'
        })

        const MYSQLQUERY = `
        SELECT SUM(price) as price FROM instruments 
        JOIN instrumentsCart ON instruments.id = instrumentsCart.codInst
        JOIN cart ON instrumentsCart.codCart = cart.id
        WHERE cart.id =  ${id}`

        console.log("Instrument query: " + MYSQLQUERY)
        const [rows] = await connection.promise().query(MYSQLQUERY)
        
        if (rows.length === 0) {
            console.log("Non ci sono risultati...")
            return {
                success: false,
                price: null
            };
        }

        const row = rows[0];
        let price = row.price
        
        if(price === null) {
            price = 0
        }
        
        await connection.end()

        const update = await updateInstrumentsCart(id)

        if(update && update.success) {
            return {
                success: true,
                price: price
            }
        }
        else{
            return {
                success: false,
                price: 0
            }
        }

    }catch(err){
        console.error("Error: ", err)
    }
}

module.exports = getTotalInstruments