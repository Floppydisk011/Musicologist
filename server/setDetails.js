 

const mysql = require('mysql2')

async function updateDetails(id, name, surname, birth){
    try{
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'music',
            password: 'root',
            database: 'musicologist',
            port: '3306'
        })

        const MYSQLQUERY = `UPDATE customers SET name = "${name}", surname = "${surname}", birth = '${birth}' WHERE idcustomer = ${id}`

        if(await connection.execute(MYSQLQUERY)){
            return{
                success: true
            }
        }

    }catch(err){
        console.error("Error: ", err)
    }
}

module.exports = updateDetails