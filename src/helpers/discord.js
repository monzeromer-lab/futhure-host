const {
	Client,
	Intents
} = require("discord.js")
const {
	SlashCommandBuilder
} = require('@discordjs/builders');
const {
	REST
} = require('@discordjs/rest');
const {
	Routes
} = require('discord-api-types/v9')
const config = require('../../config')
const database = require("../database/connection")

const client = new Client({
	intents: [Intents.FLAGS.GUILDS]
})

client.on('ready', (client) => {
	console.log("ready")
})

const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
	new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
	new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
	new SlashCommandBuilder().setName('إشتراكي').setDescription('سأرسل اليك معلومات اشتراكك في الخاص')
].map(command => command.toJSON());

const rest = new REST({
	version: '9'
}).setToken(config.discord.DISCORD_TOKEN);

rest.put(Routes.applicationGuildCommands(config.discord.CLIENT_ID, config.discord.guildid), {
		body: commands
	})
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);


function getTimeleft(dateFromDatebase) {
	let date = new Date(dateFromDatebase);
	date.setDate(date.getDate() - Date.now());

	return date;
}
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const {
		commandName
	} = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'server') {
		await interaction.reply(`${interaction.version.toString()}`);
	} else if (commandName === 'user') {
		let avatar = await interaction.user.avatar.toString()
		await interaction.reply(avatar)
	} else if (commandName === "إشتراكي") {
		// confirm dm message
		let dm = await interaction.user.createDM(true)
		// save user id
		let userId = interaction.user.id

		// get the user data from the database and his subscription*
		let [user_id] = await database.execute(`select user_id from discord_ids where discord_id = ${userId}`)

		if (user_id.affectedRows >= 1) {
			let [products, fields] = await database.execute(`select name, date from orders where statut = 1 and user_id = ${user_id[0].id}`)

			// generate the message
			let subs = `
		أنت مشترك في الآتي:
		${products.forEach((obj, index, arr) => {
			`${index}. باقة ${obj.name} وتبقى ${getTimeleft(obj.date)} لإنتهاء الإشتراك`
		  })}
		
		`
			await dm.send(subs)
			await interaction.reply(`تم الإرسال`)
		} else {
			
			await interaction.reply(`login with discord!`)
		}

	}

});

// client.on("messageCreate", async (msg) => {
// 	if (msg.content === "إشتراكي") {
// 		let userId = msg.mentions.repliedUser.id
// 		let user_id = await database.execute(`select user_id from discord_ids where discord_id = ${userId}`)
// 		let 
// 		msg.reply()
// 	}

// })

client.login(config.discord.DISCORD_TOKEN)

module.exports = client