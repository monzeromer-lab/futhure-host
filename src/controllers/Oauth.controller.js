const res = require('express/lib/response')
// const discord = require('../helpers/discord')
const path = require('path')
// const fetch = require('node-fetch')
const { discord } = require('../../config')
let filePath = path.resolve(__dirname, '../../public/index.html')

console.log(filePath)

module.exports.Oauth_Controller = async (req, res, next) => {
    let { code } = req.params

    if (code) {
        fetch(`https://discord.com/api/oauth2/token?client_id=${discord.CLIENT_ID}&client_secret=${discord.CLIENT_SECRET}&grant_type=authorization_code&redirect_uri=http://40.85.188.65:4789/api/discord/callback&code=${code}&scope=identify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }).then((state) => {
            state.json().then((obj) => {
                console.log(obj);
            })
        }).catch((er) => {
            console.log(er);
        })
    }

    res.status(200).sendFile(filePath)
}

    module.exports.Oauth_login = async (req, res, next) => {
        res.redirect("https://discord.com/api/oauth2/authorize?client_id=951145014694641745&redirect_uri=http://40.85.188.65:4789/api/discord/callback/&response_type=code&scope=identify")
    }