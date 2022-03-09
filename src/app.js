const express = require("express")
const app = express()


// import routers
const Oauth_Router = require("./routers/Oauth")

// parse request body to json
app.use(express.json())

// encode url
app.use(express.urlencoded({
    extended: false
}))

// use routers
app.use('/', Oauth_Router)

module.exports = app