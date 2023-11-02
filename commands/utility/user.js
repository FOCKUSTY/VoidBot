const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
	.setName('user')
	.setDescription('Информация о пользователе.'),
	async execute(interaction) {
		const int = interaction
		
		let totalRoles = int.member.roles.cache
		let memberRoles = new Map();
		const guildUserRoles = []

		totalRoles.forEach(role => {
			memberRoles.set(role.position, role.id)
		})

		const memberRolesSort = new Map([...memberRoles.entries()].sort((a, b) => b[0] - a[0]));

		memberRolesSort.forEach(roleId => {
			guildUserRoles.push(`\n<@&${roleId}>`)
		})

		await int.reply({
			content: `# :tophat:\n Собираем информацию...`,
			fetchReply: true, ephemeral: true
		})

		const embed = new EmbedBuilder()
		.setColor(0x161618)
		.setAuthor({name: int.guild.name, iconURL: `https://cdn.discordapp.com/icons/${int.guild.id}/${int.guild.icon}.png` })
		.setTitle(`Об участнике "${int.user.username}"`)
		.setDescription(`Информация об участнике ${int.user} на сервере ${int.guild.name}`)
		.addFields(
			{	name: `Команда запущена:`,
			value: `${int.user} (${int.user.username})\n\n**Который присоединился:**\n${int.member.joinedAt}`, inline: true	},
			{	name: `Роли участника:`, value: `${guildUserRoles}`, inline: true},
		)
		.setThumbnail(`https://cdn.discordapp.com/avatars/${int.user.id}/${int.user.avatar}.png`)
		.setTimestamp()
		.setFooter({ text: `${int.guild.id} - ${int.guild.name}`, iconURL: `https://cdn.discordapp.com/icons/${int.guild.id}/${int.guild.icon}.png` });

		int.editReply({
			content: ``,
			embeds: [embed], 
			ephemeral: true
		}
		)
	},
};