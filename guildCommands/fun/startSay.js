const
    { SlashCommandBuilder, EmbedBuilder } = require('discord.js'),
    { developCommand } = require('../../utils/developCommand'),
    { getBooleanChatting, setBooleanChatting } = require('../../utils/chatting');

module.exports =
{
    cooldown: 5,
    data: new SlashCommandBuilder()
	.setName('startsay')
	.setDescription('Команда запуска общения ботов !')
    .setNameLocalizations({ru:'начать-общение',"en-US":'start-say'})
    .setDescriptionLocalizations({ru:'Команда запускающая общения ботов !',"en-US":'Launch bot communication'})
    
    .addStringOption(option =>
        option.setName('message').setDescription('Сообщение, которое вы хотите отправить')
        .setNameLocalizations({ru: 'сообщение', "en-US":'message'})
        .setDescriptionLocalizations({ru:'Сообщение, которое вы хотите отправить',"en-US":'Message, which you want to send'})),

    async execute(interaction)
    {
        
        // return developCommand(interaction);

        const msg = interaction.options.getString('message')||'Да начнем же общение';

        const start = getBooleanChatting();

        if(!start)
        {

            setBooleanChatting(true);

            await interaction.reply({
                content: `Общение начинается...`,
                ephemeral: true
            });
                
            const channel = await interaction.client.channels.cache.get('1175738843203391550');

            await channel.sendTyping();

            setTimeout(async () => {
                await channel.send(`${msg}`)
            }, 2000);
        }
        else
        {
            await interaction.reply({
            content: `Общение и так началось...`,
            ephemeral: true
            });
        }

	},
};