const webhooks = require("express").Router()
const validition = require("../validation/webhook.validate")
const msg_event = require("../events/order_end")

webhooks.post("/webhooks/", validition, (req, res) => {
    let { event,
        user,
        product = null
    } = req.body

    switch (event) {
        case "login":
            msg_event.emit("login", user)

        case "logout":
            msg_event.emit("logout", user)
    
        case "new_order":
            msg_event.emit("new_order", user, product)
    }
    
})

module.exports = webhooks