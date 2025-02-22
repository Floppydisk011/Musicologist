 
const mysql = require('mysql2')

async function getShipments(){
    try{
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'music',
            password: 'root',
            database: 'musicologist',
            port: '3306'
        })

        const MYSQLQUERY = `SELECT Shipments.id, Shipments.status, sales.totalPrice, customers.address, customers.name, customers.surname FROM Shipments JOIN sales ON Shipments.codSale = sales.id JOIN customers ON sales.codCustomer = customers.idcustomer `

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
            state: row.status,
            date: row.saleDate,
            price: row.totalPrice,
            address: row.address,
            name: row.name,
            surname: row.surname
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

module.exports = getShipments