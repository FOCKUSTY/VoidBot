const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('random')
		.setDescription('Выбирает случайное число от 0 до 100 !'),
	async execute(interaction) {
		const random = (Math.floor(Math.random() * (200 - 100)) + 100)
		let number = random - 100
		await interaction.reply(`Ваше число - ${number}`)
	},
};