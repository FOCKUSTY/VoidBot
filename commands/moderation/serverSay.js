const {
    SlashCommandBuilder,
    EmbedBuilder,
    PermissionFlagsBits,
    PermissionsBitField,
    TextInputBuilder, 
    ActionRowBuilder, TextInputStyle,
    addComponents, ModalBuilder
} = require('discord.js');
const { color, authorName, iconURL, } = require(`../../developing.json`);
const { setChannel,setBool } = require('../../events/modals');

    module.exports = {
        cooldown: 5,
        data: new SlashCommandBuilder()
		.setName('serversay')
		.setDescription('Сообщение с помощью бота!')
        .addStringOption(o =>o.setName(`channel`).setDescription(`Id канала на который вы хотите отправить сообщение`).setRequired(true))
        .addBooleanOption(o=>o.setName(`embed`).setDescription('Сообщение в виде embed? (Вложенный текст)').setRequired(true)),
        async execute(interaction) {

        const int = interaction;
        const client = int.client;
        const channelId = int.options.getString(`channel`);
        const bool = int.options.getBoolean('embed');
        const channel = client?.channels.cache.get(channelId)
    
        setChannel(channel, int);
        setBool(bool)

        if(!(channel.permissionsFor(interaction.client.user.id).has([PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel]))) {
            await int.reply({
            content:
            `Сообщение не было доставлено на Ваш канал, возможны причины:\nВаш канал не является текстовым каналом\nУ меня не достаточно прав отправить сообщение на Ваш канал`,
            ephemeral: true});
            return
        }

        if (int.user.id === `877154902244216852`) {
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
    } else {
            await int.reply({
                content: `У Вас нет прав на использование этой команды`,
                ephemeral: true
            })
        }

	},
};