const express = require("express")
const cors = require("cors")
const routes = require('./routes')

const app = express()
const port = process.env.PORT || 3334

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(routes)

app.listen(port)
