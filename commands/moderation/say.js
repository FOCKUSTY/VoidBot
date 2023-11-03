const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

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
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('message')
                .setDescription('Ваше сообщение !')
                .setRequired(true)),
        async execute(interaction) {

        const int = interaction
        const channel = int.options.getChannel(`channel`)
        const msg = int.options.getString(`message`)
        
        try {

        channel.send(`${msg}`)
        
        await int.reply({
		content: `Сообщение было доставлено на: ${channel}`,
		ephemeral: true});

    } catch (err) {
        
        await int.reply({
        content:
        `Сообщение не было доставлено на: ${channel}, возможны причины:\n${channel} - Не является текстовым каналом\nУ меня не достаточно прав отправить сообщение на ${channel}\n## Ошибка:\n\`\`\`${err}\`\`\``,
        ephemeral: true});
    }
	},
};