const { SlashCommandBuilder, ActivityType } = require('discord.js');
const { randomActivity, functionRandomActivity, randomNames, funcGuildTexts, nameTexts, historyRandom } = require(`../../developing`);
const guilds = [];

    module.exports = {
        cooldown: 9600,
        data: new SlashCommandBuilder()
		.setName('randomact')
		.setDescription('Изменить активность бота')
        .setNameLocalizations({ru:'случ-активность',"en-US":'random-act'})
        .setDescriptionLocalizations({ru:'Изменить активность бота',"en-US":'Change bot activity'}),
        async execute(interaction) {
            
            const client = interaction.client;
            
            guilds.splice(0,guilds.length);
            client.guilds.cache.forEach(guild => {
                guilds.push(guild)
            });

        functionRandomActivity(client, randomActivity, randomNames, guilds, funcGuildTexts, nameTexts, historyRandom);

        await interaction.reply({
		content: `Активность успешно изменена`,
		ephemeral: true});

	},
};