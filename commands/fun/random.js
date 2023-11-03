const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('random')
		.setDescription('Выбирает случайное число между двумя!')
		.addIntegerOption(option => (
			option
			.setName(`first`)
			.setDescription(`Первое число`)
			.setRequired(true)
		))
		.addIntegerOption(option => (
			option
			.setName(`second`)
			.setDescription(`Второе число`)
			.setRequired(true)
		)),
	async execute(interaction) {
	
		await interaction.reply(`# :tophat:\n## Выбираю между двух чисел...`)

		const first = interaction.options.getInteger(`first`)
		const second = interaction.options.getInteger(`second`)

		let random;
		if(first>second){random = (Math.floor(Math.random() * (first - second)) + second)}
		else if(first<second){
			random = (Math.floor(Math.random() * (second - first)) + first)
			setTimeout(() => {
				interaction.editReply(`# :tophat:\n## Ой кажется второе число больше\n## Меняю местами...`)
			}, 500)
		}

		setTimeout(() => {
			interaction.editReply(`Ваше число: \`${random}\``)
		}, 2000)

	},
};