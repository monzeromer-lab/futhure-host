const Oauth2_Router = require("express").Router()
const {Oauth_Controller} = require("../controllers/Oauth.controller")

Oauth2_Router.get("/api/discord/callback/:code", Oauth_Controller)

module.exports = Oauth2_Router