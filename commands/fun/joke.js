const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { jokes, historyRandom } = require('../../developing');
const { Random } = require('random-js')
const random = new Random
const jokesH = [];

    module.exports = {
        cooldown: 5,
        data: new SlashCommandBuilder()
		.setName('joke')
		.setDescription('Случайная шутка !')
        .setNameLocalizations({ru:'шутка', "en-US":'joke'})
		.setDescriptionLocalizations({ru:'Случайная шутка', "en-US":'Random joke'}),
        async execute(interaction) {

        let jokeNum = random.integer(0, jokes.length-1)
        historyRandom(jokeNum, 0, jokes.length-1, jokesH, 2)
        const joke = jokes[jokeNum]

        await interaction.reply({
		content: `${joke}`,
		ephemeral: true});

	},
};