 
const mysql = require('mysql2')

async function refundOperation(id){
    try{
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'music',
            password: 'root',
            database: 'musicologist',
            port: '3306'
        })
        
        const MYSQLQUERY = `UPDATE sales SET sales.paymentState = "Refunded" WHERE sales.id = ${id}`;

        if(await connection.execute(MYSQLQUERY)){
            console.log("Query eseguita correttamente")
            return{
                success: true
            }
        }
    }catch(err){
        console.log("errore")
        console.error(err);
        return{
            success: false
        }
    }
}

module.exports = refundOperation;