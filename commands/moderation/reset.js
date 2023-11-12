const { SlashCommandBuilder } = require('discord.js');
const { token } = require('../../config.json');
const { randomNames, functionRandomActivity, randomActivity } = require(`../../developing`);
const guilds = []

    module.exports = {
        cooldown: 5,
        data: new SlashCommandBuilder()
		.setName('reset')
		.setDescription('Перезапустить бота'),
        async execute(interaction) {

            const client = interaction.client;

            if(interaction.user.id!=`877154902244216852`) {
                await interaction.reply({content: `У Вас нет прав`, ephemeral: true})
            }

            else {
                await interaction.reply({content: `Бот перезагружается`, ephemeral: true})

                    client.destroy();

                setTimeout(async () => {
                    client.login(token);
                }, 20000);
                setTimeout(async () => {
                    await client.user.setPresence({ activities: [{ name: 'activity' }], status: 'idle' });
                    functionRandomActivity(client, randomActivity, randomNames, guilds);
                    
                    await interaction.editReply({
                    content: `Бот успешно перезапущен !`,
                    ephemeral: true});
                }, 21000);
            }
	},
};