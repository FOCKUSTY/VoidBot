const { SlashCommandBuilder, Client, GatewayIntentBits } = require('discord.js');
const client = new Client({intents: [GatewayIntentBits.Guilds,]})

    module.exports = {
        cooldown: 5,
        data: new SlashCommandBuilder()
		.setName('kill')
		.setDescription('Убить бота !'),
        async execute(interaction) {
            
        if(interaction.user.id === `877154902244216852`) {
            await interaction.reply({
            content: `Бот завершил работу!`,
            ephemeral: true
        })

        console.log(`Бот сбит...`)
        let i = 0
        setInterval(() => {
            console.log(i++)
        }, 1000);
        setTimeout(() => {
            client.destroy();
            process.exit();
        }, 7000)} else {
            console.log(`Error: Not enough rights`)
            await interaction.reply({
                content: `У Вас недостаточно прав`,
                ephemeral: true
            })
        };
	},
};