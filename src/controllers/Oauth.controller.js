const res = require('express/lib/response')
const discord = require('../helpers/discord')

module.exports.Oauth_Controller = async (req, res, next) => {
    res.status(200).sendFile("../../public/index.html")
}

module.exports.Oauth_login = async () => {
    res.redirect("github redirect link")
}