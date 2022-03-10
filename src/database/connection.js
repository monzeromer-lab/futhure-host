const mysql = require("mysql2/promise")


    // let database = mysql.createConnection({ host: "45.84.205.211", password: "Admin1728391234", user: "u658742806_Future_Host", database: "u658742806_Future_Host" }).catch((error) => {
    //     process.exit(0)
    // })

let database = mysql.createPool({ host: "45.84.205.204", password: "Admin1728391234", user: "u658742806_Future_Host", database: "u658742806_Future_Host", connectionLimit: 8})

module.exports = database