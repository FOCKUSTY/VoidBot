const
    { SlashCommandBuilder } = require('discord.js'),
    { updateActivities } = require('../../utils/updateActivities');

    module.exports = {
        cooldown: 5,
        data: new SlashCommandBuilder()
		.setName('update-act')
		.setDescription('Обновить активности!')
        .setNameLocalizations({ru:'обновить-активности',"en-US":'update-act'})
        .setDescriptionLocalizations({ru:'Обновить активности !',"en-US":'Update activities !'}),
        async execute(interaction)
        {
        
        updateActivities();
        
        await interaction.reply( { content: `Активности были успешно обновлены !`, ephemeral: true } );

	},
};