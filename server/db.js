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
                const query = "SELECT * FROM endorse;"
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
    async insertNewName(name, secret, comment) {
        try {
            const dateAdded = new Date();
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO endorse (name, date_added, secret, comment) VALUES (?,?,?,?);"
                connection.query(query, [name, dateAdded, secret, comment], (err, result) => {
                    if (err) {
                        console.error('Error executing query:', err.message);
                        reject(new Error(err.message));
                    } else {
                        resolve(result.insertId);
                    }
                });
            });
            console.log('Insert ID:', insertId);
            return {
                id: insertId,
                name: name,
                dateAdded: dateAdded,
                secret: secret,
                comment: comment
            };
        } catch (error) {
            console.error('Error:', error.message);
        }
    }
    async deleteRow(id) {
        try {
            id = parseInt(id, 10)
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM names WHERE id = ?"
                connection.query(query, [id], (err, result) => {
                    if (err) {
                        console.error('Error executing query:', err.message);
                        reject(new Error(err.message));
                    } else {
                        resolve(result.affectedRows);
                    }
                });
            });
            return response === 1 ? true : false
        } catch (error) {
            console.log(error)
            return false
        }
    }
    async updateRow(id, name, secret, comment) {
        try {
            id = parseInt(id, 10)
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE names SET name = ? SET comment = ? WHERE id = ?"
                connection.query(query, [name, id], (err, result) => {
                    if (err) {
                        console.error('Error executing query:', err.message);
                        reject(new Error(err.message));
                    } else {
                        resolve(result.affectedRows);
                    }
                });
            });
            return response === 1 ? true : false
        } catch (error) {
            console.log(error)
            return false
        }
    }
    async search(name) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM names WHERE name = ?;"
                connection.query(query, [name], (err, result) => {
                    if (err) reject(new Error(err.message))
                    resolve(result)
                })
            })
            return response
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = DbService