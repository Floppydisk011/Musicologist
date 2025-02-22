 
const mysql = require('mysql2'); 

async function maxId() {
    try {
        const connection = mysql.createConnection({ 
            host: 'localhost',
            user: 'music',
            password: 'root',
            database: 'musicologist',
            port: '3306'
        });

        const MYSQLQUERY = `SELECT MAX(idcustomer) FROM customers;`; 

        const [rows] = await connection.promise().query(MYSQLQUERY);

        const maxCustomerId = rows[0]['MAX(idcustomer)'];

        console.log("Max: " + maxCustomerId)
        return { 
            success: true,
            maxId: maxCustomerId
        };
    } catch (err) {
        console.error("Errore durante l'operazione:", err);
        return { 
            success: false,
            maxId: maxCustomerId
        };
    }
}

module.exports = maxId;
