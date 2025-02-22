 
const mysql = require('mysql2')

async function getAddress(id){
    try{
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'music',
            password: 'root',
            database: 'musicologist',
            port: '3306'
        })

        const MYSQLQUERY = `SELECT address, phone, email FROM customers WHERE idcustomer = ${id}`

        const [rows] = await connection.promise().query(MYSQLQUERY)
        
        if (rows.length === 0) {
            console.log("Non ci sono risultati...")
            return {
                success: false,
                address: null,
                phone: null,
                email: null
            };
        }

        const row = rows[0]
        const email = row.email
        const phone = row.phone
        const address = row.address
        
        await connection.end()

        return {
            success: true,
            email: email,
            phone: phone,
            address: address
        }

    }catch(err){
        console.error("Error: ", err)
    }
}

module.exports = getAddress