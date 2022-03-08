/**
 * this contain server config like port , security modules , ..etc
 */

const Http = require("http")
const app = require('./src/app')

const config = require('./config')

const dotenv = require("dotenv")
dotenv.config()

const Server = Http.createServer(app)

Server.listen(config.server.port)