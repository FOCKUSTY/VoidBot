const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Все доступные команды !')
		.setNameLocalizations({ru:'помощь',"en-US":'help'})
		.setDescriptionLocalizations({ru:'Все доступные команды',"en-US":'All commands'}),
	async execute(interaction) {

		const hat = `:tophat:`

		const commands = [
			`${hat} /8ball`,
			`${hat} /ping`,
			`${hat} /random (И подкоманды)`,
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
			content: `${commands.join(`\n`)}`,
			ephemeral: true
		})
	},
};