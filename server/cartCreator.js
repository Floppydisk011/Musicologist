 
const mysql = require('mysql2')

async function cartCreator(userid){
    try{
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'music',
            password: 'root',
            database: 'musicologist',
            port: '3306'
        })
        
        const MYSQLQUERY = `INSERT INTO cart (codCustomer) VALUES(${userid})`

        if( await connection.execute(MYSQLQUERY)){
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

module.exports = cartCreator;