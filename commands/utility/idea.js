const { SlashCommandBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle, ModalBuilder } = require('discord.js');
const { Random } = require("random-js");
const { bannedUsers } = require(`../../bannedUser`)
const random = new Random();
let ifTrue = false;

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
	.setName('idea')
	.setDescription('Предложить свою идею !'),
    async execute(interaction) {
    bannedUsers.forEach(async bannedUser => {
        if(interaction.user.id === bannedUser.id) {
            ifTrue = true;
            await interaction.reply({content: `Вы находитесь в черном списке`, ephemeral: true})
            return;
        }
    })
        if(ifTrue===false) {
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