 
const mysql = require('mysql2')

async function getInventory(){
    try{
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'music',
            password: 'root',
            database: 'musicologist',
            port: '3306'
        })

        const MYSQLQUERY = `
        SELECT instruments.id, instruments.name, instruments.brand, instruments.price, instruments.quantity 
        FROM instruments 
        UNION 
        SELECT accessories.id, accessories.name, accessories.brand, accessories.price, accessories.quantity
        FROM accessories 
        UNION 
        SELECT services.id, services.name, services.brand, services.price, services.quantity
        FROM services`

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
            id: row.id,
            name: row.name,
            brand: row.brand,
            price: row.price,
            quantity: row.quantity
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

module.exports = getInventory