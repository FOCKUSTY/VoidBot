const { message } = require('telegraf/filters');
const { messageListener, setMessageId } = require('../../utility/messageListener')

module.exports =
{
    name: 'start',
    async execute(interaction)
    {
        await interaction.reply('Привет, пользователь. Посмотри, что я умею /help !');
    }
};