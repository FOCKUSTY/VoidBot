const
    { SlashCommandBuilder } = require('discord.js'),
    { Random } = require("random-js"),
    { shuffle } = require(`../../utils/shuffle`),
    random = new Random();

module.exports =
{
    cooldown: 5,
    data: new SlashCommandBuilder()
	.setName('8ball')
	.setDescription('Предсказание будущего !')
    .setNameLocalizations({ru:'шар', "en-US":'8ball'})
	.setDescriptionLocalizations({ru:'Предсказание будущего', "en-US":'Predicting the future'})
    .addStringOption(o =>o.setName('question').setDescription('Ваш вопрос').setRequired(true)
        .setNameLocalizations({ru:'вопрос', "en-US":'question'})
        .setDescriptionLocalizations({ru:'Ваш вопрос', "en-US":'Your question'})),
    async execute(interaction)
    {

        await interaction.reply({ content: `Предсказываю...`, ephemeral: true })

        let texts =
        [
            'Бесспорно', 'Это было предрешено', 'Никаких сомнений', 'Определённо да', 'Можешь быть уверен в этом',
            'Думаю да...', 'Наверное...', 'Хорошие перспективыююю', 'Знаки говорят да...', 'Да',
            'Звезд на небе не видно, попробуй позже', 'Спроси позже', 'Лучше не рассказывать', 'Погода для предсказывание плохая', 'Сконцентрируйся и спроси опять',
            'Даже не думай', 'Мой ответ нет', 'По моим данным нет', 'Перспективы не очень хорошие',
        ];

        shuffle(texts);

        const
            rNum = random.integer(0, texts.length-1),
            text = texts[rNum],
            question = interaction.options.getString(`question`);

        setTimeout(async () =>
        {            
            await interaction.editReply({
            content: `Ваш вопрос: ${question}\nМой ответ: ${text}`,
            ephemeral: true});
        }, 1000);
	},
};