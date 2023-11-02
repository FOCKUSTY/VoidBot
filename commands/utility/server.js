const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Информация о сервере.'),
	async execute(interaction) {
		const int = interaction

		const verLevl = int.guild.verificationLevel
		let verLevel
		if(verLevl === 0){verLevel = `Нет`}
		else if(verLevl === 1){verLevel = `Маленький`}
		else if(verLevl === 2){verLevel = `Средний`}
		else if(verLevl === 3){verLevel = `Высокий`}
		else if(verLevl === 4){verLevel = `Серьёзный`}

		var guildDescriptionName
		var guildDescriptionValue
		if(int.guild.description == null) {
			guildDescriptionName = `На сервере нет описания`
			guildDescriptionValue = `**Даже не ищите его**`
		} else {guildDescriptionName = `Описание сервера: `
				guildDescriptionValue = int.guild.description}
		
		await int.reply({ content: '# :tophat:\n Ищем информацию...', fetchReply: true, ephemeral: true});

		var totalRoles = int.guild.roles.cache.size

	const embed = new EmbedBuilder()
	.setColor(0x161618)
	.setTitle('Информация')
	.setAuthor({ name: int.guild.name, iconURL: `https://cdn.discordapp.com/icons/${int.guild.id}/${int.guild.icon}.png` })
	.setDescription(`Информация о сервере ${int.guild.name}`)
    .addFields(
		{ name: `Сервер создан`, value: `${int.guild.createdAt}`, inline: true },
		{ name: `${guildDescriptionName}`, value: `${guildDescriptionValue}`, inline: true },
        { name: `На сервере`, value: `${int.guild.memberCount} участника`, inline: true },
		{ name: 'Количество ролей на сервере:', value: `${totalRoles}`, inline: true },
		{ name: 'Уровень проверки:', value: `${verLevel}`, inline: true },
		{ name: 'Команду запустил:', value: `${int.user} (${int.user.username})`, inline: true },
	)
	.setThumbnail(`https://cdn.discordapp.com/icons/${int.guild.id}/${int.guild.icon}.png`)
	.setTimestamp()
	.setFooter({ text: `Id: ${int.guild.id}`, iconURL: `https://cdn.discordapp.com/icons/${int.guild.id}/${int.guild.icon}.png` });

			int.editReply({
				content: ``,
				embeds: [embed],
				ephemeral: true
				})
		}
	};