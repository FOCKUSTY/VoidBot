const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

    module.exports = {
        cooldown: 5,
        data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('Тестовая команда !'),
        async execute(interaction) {

        
        // interaction.member.send({content: `Test message?`})
        
        await interaction.reply({
		content: `Test message?`,
		ephemeral: true});

	},
};