 
const mysql = require('mysql2')
const getInstruments = require('./getInstruments')
const getAccessories = require('./getAccessories')
const getServices = require('./getServices')
const category = require('./categoryName')
const instrumentUpdater = require('./updateInstruments')
const accessoriesUpdater = require('./updateAccessories')
const servicesUpdater = require('./updateServices')
const updateCart = require('./deleteCartContent')

async function getProduct(id, type){
    try{
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'music',
            password: 'root',
            database: 'musicologist',
            port: '3306'
        })

        if(type === 'single'){
            
            const MYSQLQUERY = `SELECT price FROM accessories WHERE id = ${id} UNION SELECT price FROM instruments WHERE id = ${id} UNION SELECT price FROM services WHERE id = ${id}`

            const [rows] = await connection.promise().query(MYSQLQUERY)

            if (rows.length === 0) {
                console.log("Error no result")
                return {
                    success: false,
                    price: null
                }
            }

            const row = rows[0]
            const price = row.price

            let total = price

            await connection.end()
            
            const cat = await category(id)

            if(cat.category === "Pianos" || cat.category === "Strings" || cat.category === "Woodwinds" || cat.category === "Brass" || cat.category === "Percussions"){
                await instrumentUpdater(id)
            }
            else if(cat.category === "Accessories"){
                await accessoriesUpdater(id)
            }
            else if(cat.category === "Services"){
                await servicesUpdater(id)
            }

            return {
                success: true,
                price: total

            }

        }
        else if(type === "cart"){
            
            const instrumentTotal = await getInstruments(id)
            console.log("Instruments" + instrumentTotal.price)
            const accessoryTotal = await getAccessories(id)
            console.log("Accessories" + accessoryTotal.price)
            const serviceTotal = await getServices(id)
            console.log("Services" + serviceTotal.price)

            let total = 0

            if(instrumentTotal && accessoryTotal && serviceTotal){
                total = parseInt(instrumentTotal.price) + parseInt(accessoryTotal.price) + parseInt(serviceTotal.price);
                console.log("Total price: ", total)
            }

            if(total > 0){
                const updCart = await updateCart(id)
                return {
                    success: true,
                    price: total
    
                }
            }
            else{
                return {
                    success: false,
                    price: null
    
                }
            }
        }

    }catch(err){
        console.error("Error: ", err)
    }
}

module.exports = getProduct