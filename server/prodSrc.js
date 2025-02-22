 
const mysql = require('mysql2')
const categoryFinder = require('./categoryName')

async function getProduct(id){
    try{
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'music',
            password: 'root',
            database: 'musicologist',
            port: '3306'
        })

        const categoryName = await categoryFinder(id)

        if(categoryName.category === "Pianos" || categoryName.category === "Strings" || categoryName.category === "Woodwinds" || categoryName.category === "Brass" || categoryName.category === "Percussions"){
            
            const MYSQLQUERY = `SELECT * FROM instruments WHERE instruments.id = ${id}`

            const [rows] = await connection.promise().query(MYSQLQUERY)

            if (rows.length === 0) {
                console.log("Error no result")
                return {
                    success: false,
                    category: null,
                    data: null
                }
            }

            const row = rows[0]
            const name = row.name
            const price = row.price
            const description = row.description
            const feedback = row.feedback
            const brand = row.brand
            const dimensions = row.dimensions

            const weight = row.weight
            const quantity = row.quantity
            const picture = row.picture.toString('base64')

            const product = {
                name: name,
                price: price,
                description: description,
                feedback: feedback,
                brand: brand,
                dimensions: dimensions,
                weight: weight,
                quantity: quantity,
                picture: picture
            }

            await connection.end()

            return {
                success: true,
                category: categoryName.category,
                product: product

            }

        }
        else if(categoryName.category === "Accessories"){
            const MYSQLQUERY = `SELECT * FROM accessories WHERE accessories.id = ${id}`

            const [rows] = await connection.promise().query(MYSQLQUERY)

            if (rows.length === 0) {
                console.log("Error no result")
                return {
                    success: false,
                    category: null,
                    data: null
                }
            }

            const row = rows[0]
            const name = row.name
            const price = row.price
            const description = row.description
            const feedback = row.feedback
            const brand = row.brand
            const quantity = row.quantity
            const picture = row.picture.toString('base64')

            const product = {
                name: name,
                price: price,
                description: description,
                feedback: feedback,
                brand: brand,
                quantity: quantity,
                picture: picture
            }

            await connection.end()

            return {
                success: true,
                category: categoryName.category,
                product: product

            }
        }
        else if(categoryName.category === "Services"){
            const MYSQLQUERY = `SELECT * FROM services WHERE services.id = ${id}`

            const [rows] = await connection.promise().query(MYSQLQUERY)

            if (rows.length === 0) {
                console.log("Error no result")
                return {
                    success: false,
                    category: null,
                    data: null
                }
            }

            const row = rows[0]
            const name = row.name
            const price = row.price
            const description = row.description
            const feedback = row.feedback
            const brand = row.brand
            const picture = row.picture.toString('base64')

            const product = {
                name: name,
                price: price,
                description: description,
                feedback: feedback,
                brand: brand,
                picture: picture
            }

            await connection.end()

            return {
                success: true,
                category: categoryName.category,
                product: product

            }
        }

    }catch(err){
        console.error("Error: ", err)
    }
}

module.exports = getProduct