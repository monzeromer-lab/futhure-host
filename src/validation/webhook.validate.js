const {
    webhook_schema,
    product_required
} = require("./schema/webhooks.schema")

module.exports = (req, res, next) => {
    let body = req.body
    let full_validation = webhook_schema.validate({
        body
    }, {
        abortEarly: false,
        convert: false
    })

    let order_validition = order_required.validate(req.body, {
        abortEarly,
        convert: false
    })

    switch (req.body.event) {
        case "buy":
            if (order_validition.error)
                next(order_validition.error.details)

        case "logging":
            if (full_validation.error)
                next(full_validation.error.details)

        default:
            if (full_validation.error) {
                next(validation.error.details)
            } else next()

    }

}