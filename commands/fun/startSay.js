const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { textbool } = require('../../developing');

    module.exports = {
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
        async execute(interaction) {
            
        const msg = interaction.options.getString('message')||'Да начнем же общение';

        const start = textbool(true)

        if(!(start==='Переписка уже идет')) {            
            await interaction.reply({
                content: `Общение начинается...`,
                ephemeral: true});
                
            await interaction.client.channels.cache.get('1175738843203391550').send(`${msg}`)

        } else {
            await interaction.reply({
            content: `Общение и так началось...`,
            ephemeral: true});
        }

	},
};