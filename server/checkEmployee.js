 
const mysql = require('mysql2')

async function checkEmployee(id){
    try{
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'music',
            password: 'root',
            database: 'musicologist',
            port: '3306'
        })

        const MYSQLQUERY = `SELECT id FROM employees WHERE id = '${id}'`

        const [rows] = await connection.promise().query(MYSQLQUERY)
        
        if (rows.length === 0) {
            console.log("Non ci sono risultati...")
            return {
                success: false,
                data: null
            };
        }
        else{
            console.log(`${rows.length} risultati trovati`)
        }

        const row = rows[0]
        const idEmployee = row.id
        
        await connection.end()

        if(id == idEmployee){
            return {
            success: true
            }
        }
        else{
            return {
                success: false
                }
        }
        

        
    }catch(err){
        console.error("Error: ", err)
    }
}

module.exports = checkEmployee