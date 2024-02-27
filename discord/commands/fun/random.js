const
	{ SlashCommandBuilder } = require('discord.js'),
	{ getActivities } = require(`../../utils/updatejson`),
	{ Random } = require("random-js"),
	random = new Random();

module.exports =
{
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('random')
		.setDescription('Случайный выбор !')
		.setNameLocalizations({ru:'случайное', "en-US":'random'})
		.setDescriptionLocalizations({ru:'Случайный выбор', "en-US":'Random choice'})
		.addSubcommand(subcommand =>
			subcommand
			.setName(`number`)
			.setDescription(`Рандомное число`)
			.setNameLocalizations({ru:'число', "en-US":'number'})
			.setDescriptionLocalizations({ru:'Случайное число из двух', "en-US":'Random number between two'})
			.addIntegerOption(option => (
				option
				.setName(`first`)
				.setDescription(`Первое число`)
				.setNameLocalizations({ru:'первое', "en-US":'first'})
				.setDescriptionLocalizations({ru:'Первое число', "en-US":'First number'})
				.setRequired(true)
			))
			.addIntegerOption(option => (
				option
				.setName(`second`)
				.setDescription(`Второе число`)
				.setNameLocalizations({ru:'второе', "en-US":'second'})
				.setDescriptionLocalizations({ru:'Второе число', "en-US":'Second number'})
				.setRequired(true)
			)))
		.addSubcommand(subcommand =>
			subcommand
			.setName(`name`)
			.setDescription(`Рандомное имя`)
			.setNameLocalizations({ru:'имя', "en-US":'name'})
			.setDescriptionLocalizations({ru:'Случайное имя', "en-US":'Random name'})),
	async execute(interaction)
	{

		const subcommand = interaction.options.getSubcommand()

		if(subcommand===`name`)
		{
			await interaction.reply(`# :tophat:\n## Выбираю случайно имя...`)

			const
				randomNames = getActivities('randomNames'),
				rNum = random.integer(0, randomNames.length-1),
				rName = randomNames[rNum];
			
			await interaction.editReply(`Ваше имя: ${rName}`)
		}

		if(subcommand===`number`)
		{
		await interaction.reply(`# :tophat:\n## Выбираю между двух чисел...`)

		const
			first = interaction.options.getInteger(`first`),
			second = interaction.options.getInteger(`second`);
		
		let randomNumber;

		if(first != second)
		{
			if(second>first) randomNumber = random.integer(first, second)
			else if(second<first) randomNumber = random.integer(second, first)

			setTimeout(() =>
			{
				interaction.editReply(`Ваше число: \`${randomNumber}\``)
			}, 1000)
		}
		else
		{
			const secondRandomNumber = random.integer(0, 10000)

			function equals()
			{
				setTimeout(() =>
				{
					interaction.editReply(`# :tophat:\n## Ой, числа одинаковые... Выбираю сам...`);
				}, 1500)
				
				setTimeout(() =>
				{
					interaction.editReply(`Ваше число: \`${randomNumber}\` ||(Выбрано между ${first} и ${secondRandomNumber})||`);
				}, 2200)
			}

			if(secondRandomNumber>first)
			{
				randomNumber = random.integer(first, secondRandomNumber);
				equals();
			}
			
			else if(first>secondRandomNumber)
			{
				randomNumber = random.integer(secondRandomNumber, first);
				equals();
			}
			
			else interaction.editReply(`# :tophat:\n## И мои числа одинаковые...(`);
		}
	}}
};