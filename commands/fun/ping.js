const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Ответит Pong!'),
    async execute(interaction) {
        const sent = await interaction.reply({ content: '# Pong ! :tophat:\n Считаем время...', fetchReply: true, ephemeral: true});
        let awaitSecond = Math.round((sent.createdTimestamp - interaction.createdTimestamp) / 1000 * Math.pow(10, 1)) / Math.pow(10, 1)
        await interaction.editReply({content: `# Pong ! :tophat:\n- Задержка бота: \n - ${sent.createdTimestamp - interaction.createdTimestamp}ms\n - ${awaitSecond}s`, ephemeral: true})
    },
};