const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

    module.exports = {
        cooldown: 5,
        data: new SlashCommandBuilder()
		.setName('kristy')
		.setDescription('Кристи команда !')
        .setDescriptionLocalizations({ru:'Кристи команда',"en-US":'Kristy command'}),
        async execute(interaction) {
        
        await interaction.reply({
		content: `Включите Kristy !`,
		ephemeral: false});

	},
};