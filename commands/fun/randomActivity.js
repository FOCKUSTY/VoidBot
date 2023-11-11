const { SlashCommandBuilder, ActivityType } = require('discord.js');
const { randomActivity, functionRandomActivity } = require(`../../developing`)
const guilds = []

    module.exports = {
        cooldown: 43200,
        data: new SlashCommandBuilder()
		.setName('randomact')
		.setDescription('Изменить активность бота'),
        async execute(interaction) {
        const client = interaction.client;

        functionRandomActivity(client, randomActivity, guilds);

        await interaction.reply({
		content: `Активность успешно изменена`,
		ephemeral: true});

	},
};