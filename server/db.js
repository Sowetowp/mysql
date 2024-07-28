const mysql = require("mysql")
const dotenv = require("dotenv")
dotenv.config()

const connecction = mysql.createConnection