const Oauth2_Router = require("express").Router()
const {Oauth_Controller, Oauth_login} = require("../controllers/Oauth.controller")
const discord = require("../helpers/discord")

Oauth2_Router.get('/discord/login', Oauth_login)
Oauth2_Router.get("/api/discord/callback/:code", Oauth_Controller)
Oauth2_Router.get('/sup', (req, res)=> {
    discord.users.send("Hola!").then((done) => {
        res.end()
    }).catch((err) => {
        res.send(err)
    })

})

module.exports = Oauth2_Router