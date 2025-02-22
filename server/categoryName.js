 
const mysql = require('mysql2')

async function searchCategName(id){
    try{
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'music',
            password: 'root',
            database: 'musicologist',
            port: '3306'
        })

        const MYSQLQUERY = `SELECT categories.name FROM instruments INNER JOIN categories ON instruments.codCategory = categories.idcategory WHERE instruments.id=${id} UNION SELECT categories.name FROM accessories INNER JOIN categories ON accessories.codCategory = categories.idcategory WHERE accessories.id=${id} UNION SELECT categories.name FROM services INNER JOIN categories ON services.codCategory = categories.idcategory WHERE services.id=${id}`

        const [rows] = await connection.promise().query(MYSQLQUERY)
        
        if (rows.length === 0) {
            console.log("Non ci sono risultati...")
            return {
                success: false,
                category: null
            };
        }

        const row = rows[0];
        const category = row.name
        
        await connection.end()

        return {
            success: true,
            category: category
        }

    }catch(err){
        console.error("Error: ", err)
    }
}

module.exports = searchCategName