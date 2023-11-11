const { SlashCommandBuilder } = require('discord.js');

    module.exports = {
        cooldown: 5,
        data: new SlashCommandBuilder()
		.setName('kill')
		.setDescription('Убить бота !'),
        async execute(interaction) {
            const client = interaction.client;
            
        if(interaction.user.id === `877154902244216852`) {
            await interaction.reply({
            content: `Бот завершил работу!`,
            ephemeral: true
        })

        console.log(`Бот сбит...`)
        setInterval(() => {
        }, 500);
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