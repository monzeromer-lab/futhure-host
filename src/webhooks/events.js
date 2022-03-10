const webhooks = require("express").Router()

webhooks.post("/webhooks", (req, res) => {
    let { event,
        user
    } = req.body
    
})

module.exports = webhooks