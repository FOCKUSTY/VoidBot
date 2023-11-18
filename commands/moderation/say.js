const { SlashCommandBuilder, PermissionFlagsBits, ChannelType, PermissionsBitField, EmbedBuilder } = require('discord.js');
const { color, authorName, iconURL } = require(`../../developing.json`)

    module.exports = {
        cooldown: 5,
        data: new SlashCommandBuilder()
		.setName('say')
		.setDescription('Сообщение с помощью бота!')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels & PermissionFlagsBits.ManageMessages)
        .addChannelOption(option =>
            option
                .setName(`channel`)
                .setDescription(`Канал на который вы хотите отправить сообщение`)
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildText))
        .addStringOption(option =>
            option
                .setName('message')
                .setDescription('Ваше сообщение !')
                .setRequired(true)),
        async execute(interaction) {

        const int = interaction;
        const channel = int.options.getChannel(`channel`);
        const msg = int.options.getString(`message`);
        
        if(!(channel.permissionsFor(interaction.client.user.id).has([PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel]))) {
            await int.reply({
            content:
            `Сообщение не было доставлено на Ваш канал, возможны причины:\nВаш канал не является текстовым каналом\nУ меня не достаточно прав отправить сообщение на Ваш канал`,
            ephemeral: true});
            return
        }
        
        channel.send(`${msg.replaceAll(`\\n`, `\n`)}`)
        
        try {

        const embed = new EmbedBuilder()
        .setColor(Number(color))
        .setAuthor({name: `${authorName}`, iconURL: `${iconURL}`})
        .setTitle(`Сообщение:`)
        .setDescription(`${msg.replaceAll(`\\n`, `\n`)}`)
        .setTimestamp()
        
        await int.reply({
		content: `Сообщение было доставлено на: ${channel}`,
		embeds: [embed], ephemeral: true});

    } catch (err) {
        
        await int.reply({
        content:
        `Сообщение не было доставлено на Ваш канал, возможны причины:\nВаш канал не является текстовым каналом\nУ меня не достаточно прав отправить сообщение на Ваш канал\n## Ошибка:\n\`\`\`${err}\`\`\``,
        ephemeral: true});
    }
	},
};