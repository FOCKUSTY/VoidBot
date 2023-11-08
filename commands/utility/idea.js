const { SlashCommandBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle, ModalBuilder } = require('discord.js');
const { Random } = require("random-js");
const { bannedUsers } = require(`../../bannedUser`)
const random = new Random();
let booleanVar = false;

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
	.setName('idea')
	.setDescription('Предложить свою идею !'),
    async execute(interaction) {
    bannedUsers.forEach(async bannedUser => {
        if(interaction.user.id === bannedUser.id) {
            booleanVar = true;
            await interaction.reply({content: `Вы находитесь в черном списке`, ephemeral: true})
            return;
        }
    })
        if(booleanVar===false) {
    const modal = new ModalBuilder()
	.setCustomId(`ideaModal`)
	.setTitle(`Ваша идея`);

    let ideaPH = `Добавить Валю в команду The Void Community`
    let ideaDetailPH = `Хочу, чтобы Валя был администратором на The Void Community!!!!`
        
    const objectIdeas = [
        {idea: `Добавить Валю в команду The Void Community`, ideaDetail: `Хочу, чтобы Валя был администратором на The Void Community!!!!`},
        {idea: `Добавить Kristy на The Void Community`, ideaDetail: `Хочу, чтобы Kristy была на The Void Community и сотрудничала с The Void`},
        {idea: `Добавить отдых`, ideaDetail: `Хочу, чтобы FOCKUSTY и acula_1 (Валя) отдыхали!!`},
        {idea: `Добавить команду \`/выходной\``, ideaDetail: `Команда \`/выходной\` будет определять день, когда разработчики будут отдыхать`},
        {idea: `Добавить в музыку "Спокойной ночи малыши"`, ideaDetail: `Хочу, чтобы при команде \`/voice play\` проигрывалась "Спокойной ночи малыши"`},
        {idea: `Убрать задержку`, ideaDetail: `Хочу, чтобы задержки не было вообще`},
        {idea: `Скрестить The Void и Kristy`, ideaDetail: `Хочу, чтобы Kristy и The Void стали парой. Я уверен(а), они будут хорошо смотреться!!`},
        {idea: `Добавить зарплату разработчикам`, ideaDetail: `Хочу, чтобы у разработчиков бота была зарплата. Как у Kristy Community так и The Void Community !!! А то не справедливо, что разработчики стараюсь и просто так`},
        {idea: `Устроить вечеринку`, ideaDetail: `Хочу вечеринку в честь FOCKUSTY и Вали!!`},
        {idea: `Купить FOCKUSTY ноутбук`, ideaDetail: `FOCKUSTY нужнен ноутбук, он иногда путешествует и не может работать, с помощью ноутбука он сможет заниматься кодингом в любой время`},
    ]

    randomNumber = random.integer(0, objectIdeas.length-1);
    ideaPH = objectIdeas[randomNumber].idea
    ideaDetailPH = objectIdeas[randomNumber].ideaDetail

    const idea = new TextInputBuilder()
        .setCustomId('ideaTitle')
        .setLabel("Напишите Вашу идею")
        .setStyle(TextInputStyle.Short)
        .setMaxLength(256)
        .setRequired(true)
        .setPlaceholder(`${ideaPH}`);
    const ideaDetail = new TextInputBuilder()
        .setCustomId('ideaDetails')
        .setLabel("Опишите идею в деталях")
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(true)
        .setPlaceholder(`${ideaDetailPH}`);

    const firstActionRow = new ActionRowBuilder().addComponents(idea);
    const secondActionRow = new ActionRowBuilder().addComponents(ideaDetail);

    modal.addComponents(firstActionRow, secondActionRow);
    
    await interaction.showModal(modal);}

	},
};