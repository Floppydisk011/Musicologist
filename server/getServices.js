 
const mysql = require('mysql2')
const updateServices = require('./updateServices')

async function searchCategName(id){
    try{
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'music',
            password: 'root',
            database: 'musicologist',
            port: '3306'
        })

        const MYSQLQUERY = `
        SELECT SUM(price) as price 
        FROM services 
        JOIN servicesCart ON services.id = servicesCart.Codservice 
        JOIN cart ON servicesCart.codCart = cart.id 
        WHERE cart.id =  ${id}`

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

        return {
            success: true,
            price: price
        }


    }catch(err){
        console.error("Error: ", err)
    }
}

module.exports = searchCategName