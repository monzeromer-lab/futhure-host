const Joi = require('joi');

const webhook_schema = Joi.object({
    event: Joi.string()
    .only()
    .allow('buy', 'logging')
    .required(),

    user: Joi.number()
    .min(1)
    .required()
})

const product_required = Joi.object({
    event: Joi.string()
    .only()
    .allow('new_order', 'login', 'logout')
    .required(),

    user: Joi.number()
    .min(1)
    .required(),

    product: Joi.number()
    .min(1)
    .required()
})

module.exports = {webhook_schema, product_required}