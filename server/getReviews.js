 
const mysql = require('mysql2')

async function getReviews(id){
    try{
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'music',
            password: 'root',
            database: 'musicologist',
            port: '3306'
        })

        const MYSQLQUERY = `SELECT customers.name as "FirstName", customers.surname as "LastName", reviews.value as "Value", reviews.reviewContent as "Content", reviews.id as "Id" FROM reviews JOIN customers ON reviews.codCustomer = customers.idcustomer WHERE reviews.codProduct = ${id}`
        
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

        const JSONobjects = rows.map(row => ({
            id: row.Id,
            firstname: row.FirstName,
            lastname: row.LastName,
            value: row.Value,
            content: row.Content
        }))

        const jsonData = { oggetti: JSONobjects }
        
        await connection.end()

        return {
            success: true,
            data: jsonData
        }

        
    }catch(err){
        console.error("Error: ", err)
    }
}

module.exports = getReviews