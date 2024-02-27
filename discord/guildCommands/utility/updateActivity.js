const
    { SlashCommandBuilder } = require('discord.js'),
    { updateActivities } = require('../../utils/updatejson');

    module.exports = {
        cooldown: 5,
        data: new SlashCommandBuilder()
		.setName('update-act')
		.setDescription('Обновить активности!')
        .setNameLocalizations({
            ru:'обновить-активности',
            "en-US":'update-act',
            ko:'업데이트-활동'
        })
        .setDescriptionLocalizations({
            ru:'Обновить активности !',
            "en-US":'Update activities !',
            ko:"활동 업데이트"
        }),
        async execute(interaction)
        {
        
        updateActivities(interaction.client);
        
        await interaction.reply( { content: `Активности были успешно обновлены !`, ephemeral: true } );

	},
};