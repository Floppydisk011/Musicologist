 
const mysql = require('mysql2')

async function updateServices(id){
    try{
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'music',
            password: 'root',
            database: 'musicologist',
            port: '3306'
        })

        const MYSQLQUERY = `UPDATE services SET quantity = quantity - 1 WHERE id = ${id}`

        if(await connection.execute(MYSQLQUERY)){
            return{
                success: true
            }
        }

    }catch(err){
        console.error("Error: ", err)
    }
}

module.exports = updateServices