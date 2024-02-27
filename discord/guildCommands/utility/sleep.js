const { SlashCommandBuilder } = require('discord.js');

module.exports =
{
    cooldown: 5,
    data: new SlashCommandBuilder()
	.setName('sleep')
	.setDescription('Отправить бота баиньки !')
    .setDescriptionLocalizations({
        ru:'спать',
        'en-US':'sleep',
        ko:'잠'
    })
    .setDescriptionLocalizations({
        ru:'Отправить бота баиньки !',
        "en-US":'Send the bot to sleep !',
        ko:'봇을 잠들게 보내세요!'
    }),
    async execute(interaction)
    {
        const client = interaction.client;
            
        if(interaction.user.id === `877154902244216852`)
        {
            await interaction.reply({
            content: `Бот завершил работу!`,
            ephemeral: true
        })

        console.log(`Бот ложится спать...`)
            await client.destroy();
            setTimeout(() => { process.exit() }, 1000)
        }
        else
        {
            console.log(`Error: Недостаточно прав`)
            await interaction.reply({
                content: `У Вас недостаточно прав`,
                ephemeral: true
            })
        };
	},
};