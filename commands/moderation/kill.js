const { SlashCommandBuilder } = require('discord.js');

    module.exports = {
        cooldown: 5,
        data: new SlashCommandBuilder()
		.setName('kill')
		.setDescription('Убить бота !')
        .setDescriptionLocalizations({ru:'убить','en-US':'kill'})
        .setDescriptionLocalizations({ru:'Убить бота !',"en-US":'Kill the bot !'}),
        async execute(interaction) {
            const client = interaction.client;
            
        if(interaction.user.id === `877154902244216852`) {
            await interaction.reply({
            content: `Бот завершил работу!`,
            ephemeral: true
        })

        console.log(`Бот сбит...`)
            await client.destroy();
            setTimeout(() => {
                process.exit();}, 1000)
        } else {
            console.log(`Error: Недостаточно прав`)
            await interaction.reply({
                content: `У Вас недостаточно прав`,
                ephemeral: true
            })
        };
	},
};