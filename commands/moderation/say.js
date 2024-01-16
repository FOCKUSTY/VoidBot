const
    {
        SlashCommandBuilder,
        PermissionFlagsBits,
        ChannelType,
        TextInputStyle,
        TextInputBuilder,
        ActionRowBuilder,
        ModalBuilder
    } = require('discord.js'),

    { setChannel, setBool } = require('../../events/modals')

module.exports =
{
    cooldown: 5,
    data: new SlashCommandBuilder()
    .setName('say')
    .setDescription('Сообщение с помощью бота!')
    .setNameLocalizations({ru:'отправить',"en-US":'say'})
    .setDescriptionLocalizations({ru:'Сообщение с помощью бота',"en-US":'Message using a bot'})
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels & PermissionFlagsBits.ManageMessages)
    .addChannelOption(option =>
        option
            .setName(`channel`)
            .setDescription(`Канал на который вы хотите отправить сообщение`)
            .setNameLocalizations({ru:'канал',"en-US":'channel'})
            .setDescriptionLocalizations({ru:'Канал на который вы хотите отправить сообщение',"en-US":'The channel you want to send a message to'})
            .setRequired(true)
            .addChannelTypes(ChannelType.GuildText))
    .addBooleanOption(option =>
        option
        .setName(`embed`).setDescription('Сообщение в виде embed? (Вложенный текст)').setRequired(true)
        .setNameLocalizations({ru:'вложение',"en-US":'embed'})
        .setDescriptionLocalizations({ru:'embed сообщение? (Вложенный текст)',"en-US":'embed message?'})),
    async execute(interaction)
    {

        const int = interaction;
        const channel = int.options.getChannel('channel')
        const bool = int.options.getBoolean('embed');
    
        setChannel(channel, int);
        setBool(bool);

    const modal = new ModalBuilder().setCustomId(`sayModal`).setTitle(`Ваше сообщение !`);

    let ideaDetailPH = `Хочу, чтобы Валя был администратором на The Void Community!!!!`

    if(bool) {
        const msg = new TextInputBuilder()
        .setCustomId('message')
        .setLabel("Ваше сообщение")
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(true)
        .setMaxLength(4000)
        .setPlaceholder(`${ideaDetailPH}`)
        
        const row = new ActionRowBuilder().addComponents(msg);
        modal.addComponents(row);
        await int.showModal(modal)

    } else {
        const msg = new TextInputBuilder()
        .setCustomId('message')
        .setLabel("Ваше сообщение")
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(true)
        .setMaxLength(2000)
        .setPlaceholder(`${ideaDetailPH}`)

        const row = new ActionRowBuilder().addComponents(msg);
        modal.addComponents(row);
        await int.showModal(modal)

    }
},
};