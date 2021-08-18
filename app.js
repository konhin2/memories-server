// 1. IMPORTACIONES
const express = require("express")
const cors = require('cors')

const connectDB = require('./config/db')

const app = express()

// 2. MIDDLEWARES
// CONSEGUIMOS LAS VARIABLES DE ENTORNO
require('dotenv').config()

// NOS CONECTAMOS A BASE DE DATOS
connectDB()

app.use(cors())

app.use(express.json({extended: true}))

// 3. ROUTES
app.use("/api/users", require('./routes/users'))
app.use("/api/auth", require('./routes/auth'))

app.use("/api/posts", require('./routes/posts'))
app.use("/api/comments", require('./routes/comments'))
app.use("/api/likes", require('./routes/likes'))

app.get("/", (req, res) => {
    res.send("Hello World!")
})
// 4. SERVER
module.exports = app