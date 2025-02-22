 
const mysql = require('mysql2')

async function setAccessory(accessory){
    try{
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'music',
            password: 'root',
            database: 'musicologist',
            port: '3306'
        })

        const name = accessory.name
        const brand = accessory.brand
        const price = accessory.price
        const description = accessory.description
        const feedback = accessory.feedback
        const quantity = accessory.quantity
        const image = accessory.image
        const category = accessory.category

        const base64Data = image.split(',')[1];

        const imageBuffer = Buffer.from(base64Data, 'base64');
        
        const MYSQLQUERY = `INSERT INTO accessories (name, brand, price, description, feedback, quantity, picture, codCategory) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

        if (await connection.execute(MYSQLQUERY, [name, brand, price, description, feedback, quantity, imageBuffer, category])) {
            console.log("Query eseguita correttamente");
            return {
                success: true
            };
        }
        }catch(err){
            console.log("errore")
            console.error(err);
            return{
                success: false
            }
        }
}

module.exports = setAccessory