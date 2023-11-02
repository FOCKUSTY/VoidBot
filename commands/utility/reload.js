const { SlashCommandBuilder, Client, GatewayIntentBits } = require('discord.js');
const { token } = require(`../../config.json`);
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reload')
		.setDescription('Перезагрузка бота'),
	async execute(interaction) {
		client.destroy();
		client.login(token);
		console.log(`Bot was reloaded !`)
		await interaction.reply({
			content: `Бот был перезагружен !`,
			ephemeral: true
		})
	},
};