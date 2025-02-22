 
const mysql = require('mysql2')

async function signEmployee(employee){
    try{
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'music',
            password: 'root',
            database: 'musicologist',
            port: '3306'
        })

        const firstName = employee.firstName
        const lastName = employee.lastName
        const birthDate = employee.birthDate
        const email = employee.email
        const phone = employee.phone
        const address = employee.address
        const username = employee.username
        const password = employee.password
        
        const MYSQLQUERY = `INSERT INTO employees (firstname,lastname,email,phone,address,birth,username,password) VALUES("${firstName}","${lastName}","${email}","${phone}","${address}",'${birthDate}',"${username}","${password}")`

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

module.exports = signEmployee