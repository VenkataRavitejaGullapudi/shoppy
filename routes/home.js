const express = require("express")
const { home } = require("../controllers/homeController")

const homeRoutes = express.Router()

homeRoutes.route("/").get(home)

module.exports = homeRoutes