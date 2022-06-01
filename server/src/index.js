const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const routes = require("./routes")

const app = express()

mongoose.connect("mongodb+srv://Vitor:1337@mongo.tvdf7.mongodb.net/?retryWrites=true&w=majority")

app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(3333)