const express = require('express')
const cors = require("cors")
const ConnectDB = require('./db')

ConnectDB()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())

const studentsRouter = require("./routes/students")
app.use("/students", studentsRouter)

app.get('/', (req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json' )
    res.json({ app: "works fine" })
})

const PORT = 5000 || process.env.PORT
app.listen(PORT, () => console.log("server running on port: " + PORT))