const res = require('express/lib/response')
const discord = require('../helpers/discord')

module.exports.Oauth_Controller = async (req, res, next) => {
    res.status(200).sendFile("../../public/index.html")
}

module.exports.Oauth_login = async () => {
    res.redirect("https://discord.com/api/oauth2/authorize?client_id=951145014694641745&redirect_uri=https%3A%2F%2Ffuturedev.com%2Fapi%2Fdiscord%2Fcallback%2F&response_type=code&scope=identify")
}