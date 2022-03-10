const { Client, Intents } = require("discord.js")
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9')
const config = require('../../config')

const client = new Client({ intents: [Intents.FLAGS.GUILDS] })

client.on('ready', (client) => {
	console.log("ready")
})

const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
	new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
	new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
	new SlashCommandBuilder().setName('dm_me').setDescription('I will send you a dm')
].map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(config.discord.DISCORD_TOKEN);

rest.put(Routes.applicationGuildCommands(config.discord.CLIENT_ID, config.discord.guildid), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'server') {
		await interaction.reply(`${interaction.version.toString()}`);
	} else if (commandName === 'user') {
		let avatar = await interaction.user.avatar.toString()
		await interaction.reply(avatar)
	} else if (commandName === "dm_me"){
		let dm = await interaction.user.createDM(true)
		await dm.send("Hi I'm Demo App I'm Here to let you know that I'm Working Lol") 
		await interaction.reply("done")
	}
	
});

client.login(config.discord.DISCORD_TOKEN)

module.exports = client