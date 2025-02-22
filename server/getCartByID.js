 
const mysql = require('mysql2')

async function getCart(id){
    try{
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'music',
            password: 'root',
            database: 'musicologist',
            port: '3306'
        })

        const MYSQLQUERY = `SELECT id FROM cart WHERE codCustomer = ${id}`

        const [rows] = await connection.promise().query(MYSQLQUERY)
        
        if (rows.length === 0) {
            console.log("Non ci sono risultati...")
            return {
                success: false,
                idcart: null
            };
        }

        const row = rows[0];
        const idcart = row.id
        
        await connection.end()

        return {
            success: true,
            idcart: idcart
        }

    }catch(err){
        console.error("Error: ", err)
    }
}

module.exports = getCart