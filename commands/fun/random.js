const { SlashCommandBuilder } = require('discord.js');
const { Random } = require("random-js");
const random = new Random();

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
		let randomNumber;

		if(first != second) {

		if(second>first){randomNumber = random.integer(first, second)}
		else if(second<first){randomNumber = random.integer(second, first)
			setTimeout(() => {
				interaction.editReply(`# :tophat:\n## Ой кажется первое число больше\n## Меняю местами...`)
			}, 500)
		}

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
	},
};