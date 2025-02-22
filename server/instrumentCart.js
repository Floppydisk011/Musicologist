 
const mysql = require('mysql2')

async function instrumentCart(idcustomer){
    try{
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'music',
            password: 'root',
            database: 'musicologist',
            port: '3306'
        })

        console.log("Customer ID: ", idcustomer)
        const MYSQLQUERY = `
        SELECT instruments.*
        FROM cart
        INNER JOIN instrumentsCart ON cart.id = instrumentsCart.codCart
        INNER JOIN instruments ON instrumentsCart.codInst = instruments.id
        WHERE cart.codCustomer = ${idcustomer}`

        const [rows] = await connection.promise().query(MYSQLQUERY)
        
        if (rows.length === 0) {
            console.log("Non ci sono risultati...")
            return {
                success: true,
                data: null
            };
        }
        else{
            console.log(`${rows.length} risultati trovati`)
        }

        const JSONobjects = rows.map(row => ({
            id: row.id,
            name: row.name,
            price: row.price,
            desc: row.description,
            fedb: row.feedback,
            brand: row.brand,
            dimension: row.dimensions,
            weight: row.weight,
            quantity: row.quantity,
            picture: row.picture.toString('base64'),
            category: row.codCategory
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

module.exports = instrumentCart