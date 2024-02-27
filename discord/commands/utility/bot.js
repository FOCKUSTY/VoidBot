const
    { SlashCommandBuilder, EmbedBuilder } = require('discord.js'),
    { version } = require('../../package.json'),
    { getCommands, getCommandNames } = require('../../utils/deployCommands'),
    { authorId, guildId, kristyAuthorId } = require('../../../config.json'),
    { getAmount } = require('../../utils/user'),
    { color, getDevelop } = require('../../utils/develop')

module.exports =
{
    cooldown: 5,
    data: new SlashCommandBuilder()
	    .setName('bot')
	    .setDescription('Информация о боте !')
        .setNameLocalizations({ru:'бот',"en-US":'bot'})
        .setDescriptionLocalizations({ru:'Информация о боте !',"en-US":'Info about bot !'}),
    async execute(interaction)
    {
        const botNickname = interaction.client.user.username;
        const guild = await interaction.client.guilds.fetch(`${guildId}`);
        const author = await guild.members.fetch(`${authorId}`);
        const support = await guild.members.fetch(`${kristyAuthorId}`);

        const embed = new EmbedBuilder()
            .setColor(color)
            .setTitle('Информация о The Void\'s bot')
            .setAuthor({name: `${botNickname}`, iconURL: getDevelop('iconURL')})
            .addFields(
            {
                name: 'Псевдоним:',
                value: `${botNickname}`,
                inline: false
            },

            {
                name: 'Версия:',
                value: `${version}`,
                inline: false
            },

            {
                name: 'Основной сервер:',
                value: `${guild.name}: ${guild.id}`,
                inline: false
            },

            {
                name: 'Создатель:' ,
                value: `${author?.user.globalName||author.user.username}: ${author.id}`,
                inline: false
            },

            {
                name: 'Количество глобальных команд:' ,
                value: `${getCommandNames('global').length}`,
                inline: false
            },

            {
                name: 'Количетсво команд гильдии:' ,
                value: `${getCommandNames('guild').length}`,
                inline: false
            },

            {
                name: 'Количество серверов:' ,
                value: `${getAmount('totalguilds')}`,
                inline: false
            },

            {
                name: 'Поддержка:' ,
                value: `${support?.user.globalName||support?.user.username}: ${support.id}`,
                inline: false
            },
            )
            .setTimestamp()

        await interaction.reply({
            embeds: [embed],
            ephemeral: true
        });
	},
};