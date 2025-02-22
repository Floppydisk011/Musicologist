 
const mysql = require('mysql2')

async function addProduct(idcart, idproduct, category){
    try{
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'music',
            password: 'root',
            database: 'musicologist',
            port: '3306'
        })
        let MYSQLQUERY

        if(category === "Pianos" || category === "Strings" || category === "Woodwinds" || category === "Brass" || category === "Percussions"){
            MYSQLQUERY = `INSERT INTO  instrumentsCart (codCart,codInst) VALUES(${idcart},${idproduct})`
        }
        else if(category === "Accessories"){
            MYSQLQUERY = `INSERT INTO  accessoriesCart (codCart, codAccessory) VALUES(${idcart},${idproduct})`
        }
        else if(category === "Services"){
            MYSQLQUERY = `INSERT INTO  servicesCart (codCart, codService) VALUES(${idcart},${idproduct})`
        }

        if( await connection.execute(MYSQLQUERY)){
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

module.exports = addProduct;