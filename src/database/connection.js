const mysql = require("mysql2")

let database = mysql.createConnection({ host: "45.84.205.211", password: "Admin1728391234", user: "u658742806_Future_Host", database: "u658742806_Future_Host" })

module.exports = database