const { SlashCommandBuilder, ActivityType } = require('discord.js');
const { randomActivity, functionRandomActivity, randomNames, funcGuildTexts, nameTexts } = require(`../../developing`);
const guilds = [];

    module.exports = {
        cooldown: 43200,
        data: new SlashCommandBuilder()
		.setName('randomact')
		.setDescription('Изменить активность бота'),
        async execute(interaction) {
            
            const client = interaction.client;
            
            guilds.splice(0,guilds.length);
            client.guilds.cache.forEach(guild => {
                guilds.push(guild.name)
            });

        functionRandomActivity(client, randomActivity, randomNames, guilds, funcGuildTexts, nameTexts );

        await interaction.reply({
		content: `Активность успешно изменена`,
		ephemeral: true});

	},
};