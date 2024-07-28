const express = require("express")
const app = express()
const cors = require("cors")
const dotenv = require("dotenv")
dotenv.config()

const dbService = require("./db.js")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// create
app.post("/insert", (req, res) => {

})

// read
app.get("/getAll", (req, res) => {
    let db = dbService.getDbServiceInstance()
    const result = db.getAllData()
    result
    .then(data=> response.json({data:data}))
    .catch()
})

// update

// delete


app.listen(process.env.PORT, () => { console.log("app is running") })