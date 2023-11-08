const { SlashCommandBuilder } = require('discord.js');
const { developEmbed } = require(`../../developing`);

    module.exports = {
        cooldown: 5,
        data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Забанить человека !'),
        async execute(interaction) {
        
        await interaction.reply({
        embeds: [developEmbed],
		ephemeral: true});

	},
};