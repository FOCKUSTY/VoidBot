const
    { SlashCommandBuilder, EmbedBuilder } = require('discord.js'),
    { developCommand } = require('../../utils/developCommand'),
    { getBooleanChatting, setBooleanChatting } = require('../../utils/chatting');

module.exports =
{
    cooldown: 5,
    data: new SlashCommandBuilder()
	.setName('stopsay')
	.setDescription('Команда остановки общения ботов !')
    .setNameLocalizations({ru:'остановить-общение',"en-US":'stop-say'})
    .setDescriptionLocalizations({ru:'Команда останавливающая общение ботов !',"en-US":'Stop bot communication'}),
    async execute(interaction)
    {
        
        // return developCommand(interaction);

        if(interaction.user.id != ('877154902244216852'||'827928352131252245')) return await interaction.reply({content:'У Вас нет прав', ephemeral: true})

        const booleanChatting = getBooleanChatting();

        if(booleanChatting)
        {
            setBooleanChatting(false);

            await interaction.reply({
                content: `Заканчиваю общение...`,
                ephemeral: true
            });
        }
        else
        {
            await interaction.reply({
            content: `Общение и так закончено`,
            ephemeral: true});
        };
	},
};