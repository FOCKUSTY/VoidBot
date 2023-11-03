const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
	.setName('user')
	.setDescription('Информация о пользователе.')
	.addUserOption(option =>
		option
		.setName(`member`)
		.setDescription(`Участник`)),
	async execute(interaction) {
		const int = interaction
		let member = int.member
		if (int.options.getUser(`member`)) {
			const user = int.options.getUser(`member`).id
			member = int.guild.members.cache.get(user)
		}
		
		let totalRoles = member.roles.cache
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
		.setTitle(`Об участнике ${member.user.globalName}`)
		.setDescription(`Информация об участнике ${member.user.username} на сервере ${int.guild.name}`)
		.addFields(
			{	name: `Команда запущена:`,
			value: `${int.user} (${int.user.username})\n\n**Участник ${member.user.username} присоединился:**\n${member.joinedAt}`, inline: true	},
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