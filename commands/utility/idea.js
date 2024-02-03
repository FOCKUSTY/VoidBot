const
    {
        SlashCommandBuilder,
        ActionRowBuilder,
        TextInputBuilder,
        TextInputStyle,
        ModalBuilder
    } = require('discord.js'),

    { Random } = require("random-js"),
    { bannedUsers } = require(`../../../VoidDataBase/users/bannedUsers.json`),
    { getActivities } = require('../../utils/updateActivities'),
    random = new Random();
    
let booleanVar = false;

module.exports =
{
    cooldown: 5,
    data: new SlashCommandBuilder()
	.setName('idea')
	.setDescription('Предложить свою идею !')
    .setNameLocalizations({ru:'идея',"en-US":'idea'})
    .setDescriptionLocalizations({ru:'Предложить свою идею',"en-US":'Suggest your idea'}),
    async execute(interaction) {

    bannedUsers.forEach(async bannedUser => {
        if(interaction.user.id === bannedUser.id)
        {
            booleanVar = true;
            await interaction.reply( { content: `Вы находитесь в черном списке`, ephemeral: true } );
            return;
        };
    });

    const objectIdeas = getActivities('objectIdeas');

    if(booleanVar===false)

    {
        const modal = new ModalBuilder()
            .setCustomId(`ideaModal`)
            .setTitle(`Ваша идея`);

        let ideaPH = `Добавить Валю в команду The Void Community`,
            ideaDetailPH = `Хочу, чтобы Валя был администратором на The Void Community!!!!`;

        const randomNumber = random.integer(0, objectIdeas.length-1);
        ideaPH = objectIdeas[randomNumber].idea;
        ideaDetailPH = objectIdeas[randomNumber].ideaDetail;

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
    
        await interaction.showModal(modal);
    }

	},
};