const express = require("express")
const cookie = require("cookie-parser")
const errorMiddleware = require("./middleWare/error")

const app = express()

app.use(express.json())
app.use(cookie);
//Imports Route
const product = require("./routes/productRoute")
const user = require("./routes/userRoutes")
app.use("/api/v1",product)
app.use("/api/v1",user)

//MiddleWare For Error

app.use(errorMiddleware);


module.exports = app