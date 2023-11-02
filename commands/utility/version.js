const { SlashCommandBuilder } = require('discord.js');
const { version } = require('../../package.json');

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('version')
		.setDescription('Вы узнаете версию бота !'),
	async execute(interaction) {
		await interaction.reply({
			content:
			`Версия бота: ${version}`, ephemeral: true
		})
	},
};