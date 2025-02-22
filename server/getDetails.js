 
const mysql = require('mysql2')

async function getDetails(id){
    try{
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'music',
            password: 'root',
            database: 'musicologist',
            port: '3306'
        })

        const MYSQLQUERY = `SELECT name, surname, birth FROM customers WHERE idcustomer = ${id}`

        const [rows] = await connection.promise().query(MYSQLQUERY)
        
        if (rows.length === 0) {
            console.log("Non ci sono risultati...")
            return {
                success: false,
                name: null,
                surname: null,
                birth: null
            };
        }

        const row = rows[0]
        const name = row.name
        const surname = row.surname
        const birth = row.birth
        
        await connection.end()

        return {
            success: true,
            name: name,
            surname: surname,
            birth: birth
        }

    }catch(err){
        console.error("Error: ", err)
    }
}

module.exports = getDetails