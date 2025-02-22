 
const mysql = require('mysql2')

async function getCustomer(id){
    try{
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'music',
            password: 'root',
            database: 'musicologist',
            port: '3306'
        })

        const MYSQLQUERY = `SELECT name, surname, email, address, phone FROM customers WHERE idcustomer = ${id}`

        const [rows] = await connection.promise().query(MYSQLQUERY)
        
        if (rows.length === 0) {
            console.log("Non ci sono risultati...")
            return {
                success: false,
                name: null,
                surname: null,
                email: null,
                phone: null,
                address: null
            };
        }

        const row = rows[0]
        const name = row.name
        const surname = row.surname
        const email = row.email
        const phone = row.phone
        const address = row.address
        
        await connection.end()

        return {
            success: true,
            name: name,
            surname: surname,
            email: email,
            phone: phone,
            address: address
        }

    }catch(err){
        console.error("Error: ", err)
    }
}

module.exports = getCustomer