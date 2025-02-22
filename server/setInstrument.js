 

const mysql = require('mysql2')

async function setinstrument(instrument){
    try{
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'music',
            password: 'root',
            database: 'musicologist',
            port: '3306'
        })

        const name = instrument.name
        const price = instrument.price
        const description = instrument.description
        const feedback = instrument.feedback
        const brand = instrument.brand
        const dimensions = instrument.dimensions
        const weight = instrument.weight
        const quantity = instrument.quantity
        const image = instrument.image
        const category = instrument.category

        const imageData = Buffer.from(image.split(',')[1], 'base64');
        
        const MYSQLQUERY = `INSERT INTO instruments (name, price, description, feedback, brand, dimensions, weight, quantity, picture, codCategory) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        if(await connection.execute(MYSQLQUERY, [name, price, description, feedback, brand, dimensions,  weight, quantity, imageData, category])){
            console.log("Query eseguita correttamente");
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

module.exports = setinstrument
