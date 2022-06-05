const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const http = require("http")

const routes = require("./routes")
const { setupWebsocket } = require("./websocket")

const app = express()

const server = http.Server(app)

setupWebsocket(server)

mongoose.connect("mongodb+srv://Vitor:1337@mongo.tvdf7.mongodb.net/?retryWrites=true&w=majority")

app.use(cors())
app.use(express.json())
app.use(routes)

server.listen(3333)