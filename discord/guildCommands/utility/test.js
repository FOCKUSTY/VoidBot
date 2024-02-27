const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
	.setName('test')
	.setDescription('Тестовая команда !')
    .setNameLocalizations({
        ru:'тест',
        "en-US":'test',
        ko:'시험'
    })
    .setDescriptionLocalizations({
        ru:'Тестовая команда',
        "en-US":'Test command',
        ko:'테스트 팀'
    }),
        async execute(interaction)
        {
        
        // interaction.member.send({content: `Test message?`})

        await interaction.reply({
		content: `Test message?`,
		ephemeral: true});

	},
};