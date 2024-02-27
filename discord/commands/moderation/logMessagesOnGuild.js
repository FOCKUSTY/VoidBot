const { SlashCommandBuilder, EmbedBuilder, ChannelType } = require('discord.js');
const { addNewLogGuild } = require('../../utils/dataBase');

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
	.setName('enable-log')
	.setDescription('Включить прослушиватель сообщений на сервере!')
    .setNameLocalizations({ru:'включить-логирование',"en-US":'enable-log'})
    .setDescriptionLocalizations({ru:'Включить прослушиватель сообщений на сервере!',"en-US":'Enable message listener on the server!'})
    .addChannelOption(o=>o.setName('channel').setDescription('Назначьте канал для логирования')
        .setNameLocalizations({ru:'канал',"en-US":'channel'})
        .setDescriptionLocalizations({ru:'Назначьте канал для логирования',"en-US":'Assign a channel for logging'})
        .setRequired(true).addChannelTypes(ChannelType.GuildText))
    .addBooleanOption(o=>o.setName('msg-delete').setDescription('Логирование удаленных сообщений ?')
        .setNameLocalizations({ru:'удаление-сообщений',"en-US":'msg-delete'}).setRequired(true)
        .setDescriptionLocalizations({ru:'Логирование удаленных сообщение ?',"en-US":'Logging deleted messages?'}))
    .addBooleanOption(o=>o.setName('msg-update').setDescription('Логирование обновленных сообщений ?')
        .setNameLocalizations({ru:'обновление-сообщений',"en-US":'msg-update'}).setRequired(true)
        .setDescriptionLocalizations({ru:'Логирование обновленных сообщение ?',"en-US":'Logging updated messages?'})),
        async execute(interaction)
        {
        
            // return await interaction.reply({content:'Функция в разработке', ephemeral: true})

            const guild = interaction.guild;
            const channel = interaction.options.getChannel('channel');

            addNewLogGuild(`${guild.id}`, interaction.options.getBoolean('msg-delete'), interaction.options.getBoolean('msg-update'), `${guild.name}`, `${channel.id}`, true, true);

            await interaction.reply({
		        content: `Теперь я буду отправлять логи сообщений на Ваш сервер !`,
		        ephemeral: true
            });

	},
};