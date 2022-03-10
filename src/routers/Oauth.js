const Oauth2_Router = require("express").Router()
const {Oauth_Controller, Oauth_login} = require("../controllers/Oauth.controller")
const discord = require("../helpers/discord")

Oauth2_Router.get('/discord/login', Oauth_login)
Oauth2_Router.get("/api/discord/callback/", Oauth_Controller)


module.exports = Oauth2_Router