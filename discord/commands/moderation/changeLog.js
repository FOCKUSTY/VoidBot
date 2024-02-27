const { SlashCommandBuilder, EmbedBuilder, ChannelType } = require('discord.js');
const { updateGuildLog } = require('../../utils/dataBase')

module.exports =
{
    cooldown: 5,
    data: new SlashCommandBuilder()
	.setName('change-log')
	.setDescription('Изменить метод логирование сообщений !')
    .setNameLocalizations({
        ru:'изменить-логирование',
        "en-US":'change-log'
    })
    .setDescriptionLocalizations({
        ru:'Изменить метод логирование сообщений !',
        "en-US":'Change message logging method !'
    })
    
    .addChannelOption(o=>o.setName('channel').setDescription('Назначьте канал для логирования')
    .setNameLocalizations({ru:'канал',"en-US":'channel'})
    .setDescriptionLocalizations({ru:'Назначьте канал для логирования',"en-US":'Assign a channel for logging'})
    .setRequired(true).addChannelTypes(ChannelType.GuildText))
    
    .addBooleanOption(o=>o.setName('msg-delete').setDescription('Логирование удаленных сообщений ?')
        .setNameLocalizations({ru:'удаление-сообщений',"en-US":'msg-delete'}).setRequired(true)
        .setDescriptionLocalizations({ru:'Логирование удаленных сообщение ?',"en-US":'Logging deleted messages?'}))

    .addBooleanOption(o=>o.setName('msg-update').setDescription('Логирование обновленных сообщений ?')
        .setNameLocalizations({ru:'обновление-сообщений',"en-US":'msg-update'}).setRequired(true)
        .setDescriptionLocalizations({ru:'Логирование обновленных сообщение ?',"en-US":'Logging updated messages?'}))

    .addBooleanOption(o=>o.setName('enable-log').setDescription('Включить/выключить логирование')
        .setNameLocalizations({ru:'вкл-выкл-логирование',"en-US":'enable-log'}).setRequired(true)
        .setDescriptionLocalizations({ru:'Включить/выключить логирование',"en-US":'Turn on/off logging'})),
    async execute(interaction)
    {
        const guild = interaction.guild;
        const channel = interaction.options.getChannel('channel');

        updateGuildLog(`${guild.id}`, interaction.options.getBoolean('msg-delete'), interaction.options.getBoolean('msg-update'), `${channel.id}`, interaction.options.getBoolean('enable-log'));

        await interaction.reply({
            content: `Изменен метод логирования !`,
            ephemeral: true
        });
	},
};