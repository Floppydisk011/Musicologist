 
const mysql = require('mysql2')

async function removeCartItem(id, category, customer){
    try{
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'music',
            password: 'root',
            database: 'musicologist',
            port: '3306'
        })

        let table = ""
        let target = ""
        let tableAttribute = ""

        if(category === 1){
            table = "instrumentsCart"
            target = "instruments"
            tableAttribute = "codInst"
        }
        else if(category === 2){
            table = "accessoriesCart"
            target = "accessories"
            tableAttribute = "codAccessory"
        }
        else{
            table = "servicesCart"
            target = "services"
            tableAttribute = "codService"
        }
        
        const MYSQLQUERY = `
            DELETE FROM ${table}
            WHERE id IN (
                SELECT ${table}.id
                FROM ${table}
                INNER JOIN cart ON ${table}.codCart = cart.id
                INNER JOIN ${target} ON ${table}.${tableAttribute} = ${target}.id
                WHERE cart.codCustomer = ${customer} AND ${target}.id = ${id}
            );`;

        if(await connection.execute(MYSQLQUERY)){
            console.log("Query eseguita correttamente")
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

module.exports = removeCartItem