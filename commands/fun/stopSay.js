const
    { SlashCommandBuilder, EmbedBuilder } = require('discord.js'),
    { developCommand } = require('../../utils/developCommand');


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
        
        return developCommand(interaction);

        if(interaction.user.id != ('877154902244216852'||'827928352131252245')) return await interaction.reply({content:'У Вас нет прав', ephemeral: true})

        const stop = textbool();

        if((stop?.toLocaleLowerCase||stop)===('переписка уже идет'||'Переписка уже идет')) {  
            
            textbool(false);         
            await interaction.reply({
                content: `Заканчиваю общение...`,
                ephemeral: true});
        } else if(stop===false) {

            await interaction.reply({
            content: `Общение и так закончено`,
            ephemeral: true});
        } else {
            textbool(false);

            await interaction.reply({
            content: `Заканчиваю общение...`,
            ephemeral: true});
        }

	},
};