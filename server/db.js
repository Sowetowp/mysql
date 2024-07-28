const mysql = require("mysql")
const dotenv = require("dotenv")
dotenv.config()

const connecction = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
    port: process.env.
})