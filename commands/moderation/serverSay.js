const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, PermissionsBitField } = require('discord.js');
const { color, authorName, iconURL } = require(`../../developing.json`)

    module.exports = {
        cooldown: 5,
        data: new SlashCommandBuilder()
		.setName('serversay')
		.setDescription('Сообщение с помощью бота!')
        .addStringOption(option =>
            option
                .setName(`channel`)
                .setDescription(`Id канала на который вы хотите отправить сообщение`)
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('message')
                .setDescription('Ваше сообщение !')
                .setRequired(true)),
        async execute(interaction) {

        const int = interaction;
        const client = int.client;
        const channelId = int.options.getString(`channel`);
        const msg = int.options.getString(`message`);
        const channel = client.channels.cache.get(channelId)

        if(!(channel.permissionsFor(interaction.client.user.id).has([PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel]))) {
            await int.reply({
            content:
            `Сообщение не было доставлено на Ваш канал, возможны причины:\nВаш канал не является текстовым каналом\nУ меня не достаточно прав отправить сообщение на Ваш канал`,
            ephemeral: true});
            return
        }

        if (int.user.id === `877154902244216852`) {
        try {

            channel.send(`${msg.replaceAll(`\\n`, `\n`)}`)

            const embed = new EmbedBuilder()
                .setColor(Number(color))
                .setAuthor({name: `${authorName}`, iconURL: `${iconURL}`})
                .setTitle(`Сообщение:`)
                .setDescription(`${msg.replaceAll(`\\n`, `\n`)}`)
                .setTimestamp()
    
            await interaction.reply({
                content: `Сообщение было отправлено на ${channel}\nСервер: \`${channel.guild}\`\nId: \`${channel.guild.id}\``,
                embeds: [embed], ephemeral: true
            })

        } catch(err) {
            await int.reply({
                content: `Ошибка, возможные проблемы:\n\`${channel}\` не является каналом\nЯ не могу отправить туда сообщение\nОшибка:\`\`\`${err}\`\`\``,
                ephemeral: true
            })
        }} else {
            await int.reply({
                content: `У Вас нет прав на использование этой команды`,
                ephemeral: true
            })
        }

	},
};