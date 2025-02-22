 
const mysql = require('mysql2')

async function searchFunction(searchName){
    try{
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'music',
            password: 'root',
            database: 'musicologist',
            port: '3306'
        })

        console.log("Searching ", searchName)
        const MYSQLQUERY = `
        SELECT instruments.id, instruments.name, instruments.brand, instruments.price, instruments.description, instruments.picture 
        FROM instruments INNER JOIN categories ON instruments.codCategory = categories.idcategory 
        WHERE instruments.name LIKE '%${searchName}%' OR instruments.brand LIKE '%${searchName}%' OR categories.name LIKE '%${searchName}%'
        UNION 
        SELECT accessories.id, accessories.name, accessories.brand, accessories.price, accessories.description, accessories.picture 
        FROM accessories INNER JOIN categories ON accessories.codCategory = categories.idcategory 
        WHERE accessories.name LIKE '%${searchName}%'OR accessories.brand LIKE '%${searchName}%' OR categories.name LIKE '%${searchName}%'
        UNION 
        SELECT services.id, services.name, services.brand, services.price, services.description, services.picture 
        FROM services INNER JOIN categories ON services.codCategory = categories.idcategory
        WHERE services.name LIKE '%${searchName}%' OR services.brand LIKE '%${searchName}%' OR categories.name LIKE '%${searchName}%'`

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
            desc: row.description,
            picture: row.picture.toString('base64'),
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

module.exports = searchFunction