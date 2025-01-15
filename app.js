require('dotenv').config()

const express = require("express")
const cors = require("cors")
const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc')
const routes = require('./routes')

const app = express()
const port = process.env.PORT || 3334

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'Documentação da API',
        },
    },
    apis: ['./swaggerDefs.js'], // Caminho para o arquivo de definições
}
const specs = swaggerJsdoc(swaggerOptions)


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(routes)


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

console.log('Tk: ', process.env.BLOB_READ_WRITE_TOKEN)

app.listen(port)
