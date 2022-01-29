const express = require("express")
const app = express()
const API_PREFIX = "/api/v1"

const cookieParser  = require("cookie-parser")
const fileUpload = require("express-fileupload")
const morgan = require("morgan")

// swagger Docs middleware
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./swagger.yaml')

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))


// regular middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// middleware for parsing cookies and file upload
app.use(cookieParser())
app.use(fileUpload())

// Logger middleware
app.use(morgan("tiny"))

// router imports
const homeRoutes = require("./routes/home")

// router middlewares
app.use(`${API_PREFIX}`, homeRoutes)

module.exports = app