const { SlashCommandBuilder } = require('discord.js');
const { randomNames } = require(`../../developing`)
const { Random } = require("random-js");
const random = new Random();

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('random')
		.setDescription('Выбирает случайное число между двумя!')
		.addSubcommand(subcommand =>
			subcommand
			.setName(`number`)
			.setDescription(`Рандомное число`)
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
			)))
		.addSubcommand(subcommand =>
			subcommand
			.setName(`name`)
			.setDescription(`Рандомное имя`)),
	async execute(interaction) {

		const subcommand = interaction.options.getSubcommand()

		if(subcommand===`name`) {
			await interaction.reply(`# :tophat:\n## Выбираю случайно имя...`)

			const rNum = random.integer(0, randomNames.length-1)
			const rName = randomNames[rNum]
			await interaction.editReply(`Ваше имя: ${rName}`)
		}

		if(subcommand===`number`) {
		await interaction.reply(`# :tophat:\n## Выбираю между двух чисел...`)

		const first = interaction.options.getInteger(`first`)
		const second = interaction.options.getInteger(`second`)
		let randomNumber;

		if(first != second) {

		if(second>first){randomNumber = random.integer(first, second)}
		else if(second<first){randomNumber = random.integer(second, first)}

		setTimeout(() => {
			interaction.editReply(`Ваше число: \`${randomNumber}\``)
		}, 1000)
	} else {
		const secondRandomNumber = random.integer(0, 10000)

		function equals() {
			setTimeout(() => {
				interaction.editReply(`# :tophat:\n## Ой, числа одинаковые... Выбираю сам...`);
		}, 1500)
			setTimeout(() => {
				interaction.editReply(`Ваше число: \`${randomNumber}\` ||(Выбрано между ${first} и ${secondRandomNumber})||`);
			}, 2200)
		}

		if(secondRandomNumber>first){
			randomNumber = random.integer(first, secondRandomNumber);
			equals();
		}
		else if(first>secondRandomNumber){
			randomNumber = random.integer(secondRandomNumber, first);
			equals();
		} else {
			interaction.editReply(`# :tophat:\n## И мои числа одинаковые...(`)
		}
	}
	}}
};