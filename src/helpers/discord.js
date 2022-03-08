const { Client, Intents } = require("discord.js")
const config = require('../../config')

const client = new Client({ intents: [Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILDS] })

client.on('ready', (client) => {
    console.log("ready");
})

client.login(config.discord.DISCORD_TOKEN)

module.exports = client