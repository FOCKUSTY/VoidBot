const { SlashCommandBuilder } = require('discord.js');

    module.exports = {
        cooldown: 5,
        data: new SlashCommandBuilder()
		.setName('say')
		.setDescription('Сообщение на другое сервер !')
        .addStringOption(option =>
            option
                .setName('id')
                .setDescription('Id канала !'))
        .addStringOption(option =>
            option
                .setName('message')
                .setDescription('Ваше сообщение !')),
        async execute(interaction) {

        const int = interaction

        const channelId = int.options.getString(`id`)
        const messageContent = int.options.getString(`message`)

        // guildChannelsId.
        
        await int.reply({
		content: `${channelId} - ${messageContent}`,
		ephemeral: true});

	},
};