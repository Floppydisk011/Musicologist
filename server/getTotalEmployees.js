 
const mysql = require('mysql2')

async function getTotalEmployees(){
    try{
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'music',
            password: 'root',
            database: 'musicologist',
            port: '3306'
        })

        const MYSQLQUERY = `SELECT COUNT(employees.id) as employees FROM employees`

        const [rows] = await connection.promise().query(MYSQLQUERY)
        
        if (rows.length === 0) {
            console.log("Non ci sono risultati...")
            return {
                success: false,
                emp: null
            };
        }

        const row = rows[0]
        const emp = row.employees
        
        await connection.end()

        return {
            success: true,
            emp: emp
        }

        
    }catch(err){
        console.error("Error: ", err)
    }
}

module.exports = getTotalEmployees