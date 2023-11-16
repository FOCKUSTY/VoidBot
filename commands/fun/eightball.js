const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { Random, shuffle } = require("random-js");
const random = new Random();

    module.exports = {
        cooldown: 5,
        data: new SlashCommandBuilder()
		.setName('8ball')
		.setDescription('Предсказание будущего !')
        .addStringOption(option =>
            option.setName('question').setDescription('Ваш вопрос').setRequired(true)),
        async execute(interaction) {

        await interaction.reply({content: `Предсказываю...`, ephemeral: true})

        const texts = [
            'Бесспорно', 'Предрешено', 'Никаких сомнений', 'Определённо да', 'Можешь быть уверен в этом',
            'Мне кажется да', 'Вероятнее всего', 'Хорошие перспективы', 'Знаки говорят да', 'Да',
            'Пока не ясно, попробуй снова', 'Спроси позже', 'Лучше не рассказывать', 'Сейчас нельзя предсказать', 'Сконцентрируйся и спроси опять',
            'Даже не думай', 'Мой ответ нет', 'По моим данным нет', 'Перспективы не очень хорошие',
        ];

        shuffle(texts)

        const rNum = random.integer(0, texts.length-1)
        const text = texts[rNum]

        await interaction.editReply({
		content: `${text}`,
		ephemeral: true});

	},
};