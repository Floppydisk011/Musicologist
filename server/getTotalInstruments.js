 
const mysql = require('mysql2')

async function getTotalInstruments(){
    try{
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'music',
            password: 'root',
            database: 'musicologist',
            port: '3306'
        })

        const MYSQLQUERY = `SELECT SUM(instruments.price) as totalInstruments, SUM(instruments.quantity) as instrumentNum FROM instruments`

        const [rows] = await connection.promise().query(MYSQLQUERY)
        
        if (rows.length === 0) {
            console.log("Non ci sono risultati...")
            return {
                success: false,
                instrumentNum: null,
                instrumentValue: null
            };
        }

        const row = rows[0]
        const instrumentNum = row.instrumentNum
        const instrumentValue = row.totalInstruments
        
        await connection.end()

        return {
            success: true,
            instrumentNum: instrumentNum,
            instrumentValue: instrumentValue
        }

        
    }catch(err){
        console.error("Error: ", err)
    }
}

module.exports = getTotalInstruments