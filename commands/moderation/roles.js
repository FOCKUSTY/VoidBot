const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

    module.exports = {
        cooldown: 5,
        data: new SlashCommandBuilder()
		.setName('roles')
		.setDescription('Все роли на сервере !')
		.setNameLocalizations({ru:'роли',"en-US":'roles'})
		.setDescriptionLocalizations({ru:'Все роли на сервере',"en-US":'All roles on guild'}),
        async execute(interaction) {
			const int = interaction

			let totalRoles = int.guild.roles.cache
			let guildRoles = new Map();
			const serverRoles = []

			totalRoles.forEach(role => {
				if(role.name==='@everyone') return;
				guildRoles.set(role.position, role.id)
			})

			const guildRolesSort = new Map([...guildRoles.entries()].sort((a, b) => b[0] - a[0]));

			guildRolesSort.forEach(roleId => {
				serverRoles.push(`\n<@&${roleId}>`)
			})

        await int.reply({ content: '# :tophat:\n Считаем роли...', fetchReply: true, ephemeral: true});

			const embed = new EmbedBuilder()
			.setColor(0x161618)
			.setAuthor({ name: int.guild.name, iconURL: `https://cdn.discordapp.com/icons/${int.guild.id}/${int.guild.icon}.png` })
			.setTitle(`${int.guild.name} - Роли`)
			.setDescription(`${serverRoles}`)
			.setTimestamp()
			.setFooter({ text: `${int.guild.id} - ${int.guild.name}`, iconURL: `https://cdn.discordapp.com/icons/${int.guild.id}/${int.guild.icon}.png` });

		int.editReply({
			content: ``,
			embeds: [embed],
			ephemeral: true
			})

	},
};