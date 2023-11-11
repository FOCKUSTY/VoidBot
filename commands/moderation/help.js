const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Все доступные команды !'),
	async execute(interaction) {

		const hat = `\n:tophat:`

		const commands = [
			`${hat} /ping`,
			`${hat} /random`,
			`${hat} /voice (И подкоманды)`
			`${hat} /ban`
			`${hat} /help`,
			`${hat} /roles`,
			`${hat} /say`,
			`${hat} /test`,
			`${hat} /thevoid`,
			`${hat} /server`,
			`${hat} /user`,
			`${hat} /version`
		]
		
		await interaction.reply({
			content: `${commands}`,
			ephemeral: true
		})
	},
};