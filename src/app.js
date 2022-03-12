const express = require("express")
const app = express()
const discord = require("./helpers/discord")

// import routers
const webhooks = require("./webhooks/events")

// parse request body to json
app.use(express.json())

// encode url
app.use(express.urlencoded({
    extended: false
}))

// use routers
app.use('/', webhooks)

// error handler
app.use((err, req, res, next) => {
    // console.error(err.stack)
    res.status(500).json({
        reqest_url: req.url,
        error: true,
        message: err
    })
  })

module.exports = app