const { SlashCommandBuilder } = require('discord.js');
const { getCommands } = require('../../utils/deployCommands')

module.exports =
{
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Все доступные команды !')
		.setNameLocalizations({ru:'помощь',"en-US":'help'})
		.setDescriptionLocalizations({ru:'Все доступные команды',"en-US":'All commands'}),
	async execute(interaction)
	{

		const commands = getCommands();
		
		await interaction.reply({
			content: `${commands.join(`\n`)}`,
			ephemeral: true
		})
	},
};