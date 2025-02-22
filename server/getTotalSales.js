 
const mysql = require('mysql2')

async function getTotalSales(){
    try{
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'music',
            password: 'root',
            database: 'musicologist',
            port: '3306'
        })

        const currentDate = new Date();
        const currentMonthNumber = currentDate.getMonth() + 1;
        const currentMonthFormatted = currentMonthNumber.toString().padStart(2, '0');

        const MYSQLQUERY = `SELECT SUM(sales.totalPrice) as total FROM sales WHERE MONTH(sales.saleDate) = ${currentMonthFormatted} AND sales.paymentState = "Payment successful"`

        const [rows] = await connection.promise().query(MYSQLQUERY)
        
        if (rows.length === 0) {
            console.log("Non ci sono risultati...")
            return {
                success: false,
                data: null
            };
        }

        const row = rows[0]
        const total = row.total
        
        await connection.end()

        return {
            success: true,
            data: total
        }

        
    }catch(err){
        console.error("Error: ", err)
    }
}

module.exports = getTotalSales