 
const mysql = require('mysql2')

async function deleteCartContent(id) {
    try {
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'music',
            password: 'root',
            database: 'musicologist',
            port: '3306'
        })
        const MYSQLQUERY = `INSERT INTO sales (codCustomer, saleDate, totalPrice, paymentMethod, paymentState) SELECT cart.codCustomer, NOW(), ((SELECT COALESCE(SUM(price), 0) FROM services JOIN servicesCart ON services.id = servicesCart.Codservice JOIN cart ON servicesCart.codCart = cart.id WHERE cart.id = ${id}) + (SELECT COALESCE(SUM(price), 0) FROM instruments JOIN instrumentsCart ON instruments.id = instrumentsCart.codInst JOIN cart ON instrumentsCart.codCart = cart.id WHERE cart.id = ${id}) + (SELECT COALESCE(SUM(price), 0) FROM accessories JOIN accessoriesCart ON accessories.id = accessoriesCart.Codaccessory JOIN cart ON accessoriesCart.codCart = cart.id WHERE cart.id = ${id})) AS totalPrice,"Credit Card","Payment successful" FROM cart WHERE cart.id = ${id};`
        const MYSQLQUERY1 = `DELETE FROM instrumentsCart WHERE instrumentsCart.codCart = ${id}`
        const MYSQLQUERY2 = `DELETE FROM accessoriesCart WHERE accessoriesCart.codCart = ${id}`
        const MYSQLQUERY3 = `DELETE FROM servicesCart WHERE servicesCart.codCart = ${id}`
        await connection.promise().execute(MYSQLQUERY);
        await connection.promise().execute(MYSQLQUERY1);
        await connection.promise().execute(MYSQLQUERY2);
        await connection.promise().execute(MYSQLQUERY3);

        return {
            success: true
        };

    } catch (err) {
        console.error("Error: ", err);

        return {
            success: false,
            error: err.message
        };
    }
}

module.exports = deleteCartContent;
