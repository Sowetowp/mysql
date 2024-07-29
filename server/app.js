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
    const { name } = req.body
    let db = dbService.getDbServiceInstance()
    const result = db.insertNewName(name)
    result
        .then(data => res.json({ data: data }))
        .catch(err => console.log(err))
})

// read
app.get("/getAll", (req, res) => {
    let db = dbService.getDbServiceInstance()
    const result = db.getAllData()
    result
        .then(data => res.json({ data: data }))
        .catch(err => console.log(err))
})

// update
app.patch("/update", (req, res) => {
    // const {id, name} = req.body
    // let db = dbService.getDbServiceInstance()
    // const result = db.updateRow(id, name)
    // result
    //     .then(data => res.json({ success: data }))
    //     .catch(err => console.log(err))
})

// delete
app.delete("/delete/:id", (req, res) => {
    const {id} = req.params
    let db = dbService.getDbServiceInstance()
    const result = db.deleteRow(id)
    result
        .then(data => res.json({ success: data }))
        .catch(err => console.log(err))
})

app.listen(process.env.PORT, () => { console.log("app is running") })