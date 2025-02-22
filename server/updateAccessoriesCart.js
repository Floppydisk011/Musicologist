 
const mysql = require('mysql2')

async function updateAccessoriesCart(id){
    try{
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'music',
            password: 'root',
            database: 'musicologist',
            port: '3306'
        })

        const MYSQLQUERY = `UPDATE accessories JOIN accessoriesCart ON accessories.id = accessoriesCart.codAccessory JOIN cart ON accessoriesCart.codCart = cart.id SET quantity = quantity - 1 WHERE cart.id = ${id}`

        if(await connection.execute(MYSQLQUERY)){
            return{
                success: true
            }
        }

    }catch(err){
        console.error("Error: ", err)
    }
}

module.exports = updateAccessoriesCart