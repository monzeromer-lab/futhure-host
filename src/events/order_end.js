const events = require("events")
const discord = require("../helpers/discord")
const database = require("../database/connection")

let msg = new events.EventEmitter()

msg.on("login", (userId) => {
    let [result, field] = await database.query(`INSERT INTO logging (event, user_id) VALUES ("login", ${userId})`)
})

msg.on("logout", async (userId) => {
    let [result, field] = await database.query(`INSERT INTO logging (event, user_id) VALUES ("logout", ${userId})`)
})

msg.on("new_order", async (userId, productId) => {
    let discordId = await database.execute(`SELECT discord_id FROM discord_ids WHERE user_id = ${userId}`)
    let user_name = await database.execute(`SELECT name FROM user WHERE id = ${userId}`)
    let product_name = await database.execute(`SELECT name FROM product WHERE id = ${productId}`)

    // send a message in discord
    discord.users.fetch(discordId[0].discord_id).then((Dm) => {
        Dm.send(`thank you ${user_name[0].name} for your sub in ${product_name[0].name}`)
    })

    // start a new date
    let date = new Date(); // Now
    date.setDate(date.getDate() + 25);

    let messageTime = date.getMilliseconds()
    
    setTimeout(()=> {
        // send a message in discord
        discord.users.fetch(discordId[0].discord_id).then((Dm) => {
            Dm.send(`thank you ${user_name[0].name} for your sub in ${product_name[0].name}`)
        })
    }, messageTime)

})

module.exports = msg