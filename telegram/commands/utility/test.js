const { message } = require('telegraf/filters');
const { messageListener, setMessageId } = require('../../utility/messageListener')

module.exports =
{
    name: 'test',
    async execute(interaction)
    {
        await interaction.reply('Test !');

        const chat = interaction.update.message.chat;
        const message = interaction.update.message;
        const from = interaction.update.message.from;
        const update = interaction.update;

        // setMessageId(chat.id, message.message_id + 2, from.id, 'пароль|one+ msg', 'Введите пароль');
    }
}