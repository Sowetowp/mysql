const mysql = require("mysql")
const dotenv = require("dotenv")
let instance = null
dotenv.config()

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
})

connection.connect((err) => {
    if (err) {
        console.log(err.message)
    }
    console.log("db" + " " + connection.state)
})

class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService()
    }

    async getAllData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM names;"
                connection.query(query, (err, result) => {
                    if (err) reject(new Error(err.message))
                    resolve(result)
                })
            })
            console.log(response)
            return response
        } catch (error) {
            console.log(error)
        }
    }
    async function insertNewName(name) {
        try {
            const dateAdded = new Date();
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO names (name, date_added) VALUES (?,?);"
                connection.query(query, [name, dateAdded], (err, result) => {
                    if (err) {
                        console.error('Error executing query:', err.message);
                        reject(new Error(err.message));
                    } else {
                        resolve(result.insertId);
                    }
                });
            });
            console.log('Insert ID:', insertId);
            return insertId; // Optional: return the insertId if needed
        } catch (error) {
            console.error('Error:', error.message);
        }
    }
}

module.exports = DbService