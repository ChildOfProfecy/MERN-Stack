const express = require("express")

const errorMiddleware = require("./middleWare/error")

const app = express()

app.use(express.json())

//Imports Route
const product = require("./routes/productRoute")

app.use("/api/v1",product)


//MiddleWare For Error

app.use(errorMiddleware);


module.exports = app