const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { randomActivity, functionRandomActivity, randomNames, funcGuildTexts, nameTexts, historyRandom } = require(`../../developing`);
const { Random } = require('random-js');
const r = new Random();
const actH = [];
const actType = [`Играет в `, `Стримит `, `Слушает `, `Смотрит `, ``, `Соревнуется в `]

    module.exports = {
        cooldown: 5,
        data: new SlashCommandBuilder()
		.setName('botsay')
		.setDescription('Общение с ботом')
        .setNameLocalizations({ru:'бот-общение', "en-US":'botsay'})
		.setDescriptionLocalizations({ru:'Общение с ботом', "en-US":'Chat with a bot'})
        .addStringOption(option =>
            option.setName(`message`).setDescription(`Ваше сообщение`).setRequired(false)),
        async execute(interaction) {

            let rNum = r.integer(0, randomActivity.length-1);
            rNum = historyRandom(rNum, 0, randomActivity.length-1, actH, 5);

            const type = randomActivity[rNum][1].type

        await interaction.reply({
		content: `${actType[type]}${randomActivity[rNum][0]}`,
		ephemeral: true});

	},
};