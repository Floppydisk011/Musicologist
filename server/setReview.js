 
const mysql = require('mysql2')

async function setReview(idCustomer, value, reviewContent,codProduct){
    try{
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'music',
            password: 'root',
            database: 'musicologist',
            port: '3306'
        })
        
        const MYSQLQUERY = `INSERT INTO reviews (codCustomer,value,reviewContent,codProduct) VALUES (?,?,?,?);`;

        if(await connection.execute(MYSQLQUERY, [idCustomer, value, reviewContent,codProduct])){
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

module.exports = setReview
