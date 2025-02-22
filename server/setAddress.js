 

const mysql = require('mysql2')

async function updateAddressInfo(id, address, email, phone){
    try{
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'music',
            password: 'root',
            database: 'musicologist',
            port: '3306'
        })

        const MYSQLQUERY = `UPDATE customers SET address = "${address}", email = "${email}", phone = "${phone}" WHERE idcustomer = ${id}`

        if(await connection.execute(MYSQLQUERY)){
            return{
                success: true
            }
        }

    }catch(err){
        console.error("Error: ", err)
    }
}

module.exports = updateAddressInfo