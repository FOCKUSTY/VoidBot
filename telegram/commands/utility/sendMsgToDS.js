const { getBot } = require('../../../utility/bots');
const { loadOptions } = require('../../utility/loadOptions');
const { sendMessage } = require('../../../discord/utils/develop');
const { messageListener, setMessageId } = require('../../utility/messageListener')

module.exports =
{
    name: 'send_to_ds',
    options: ['message', 'channelId'],
    description: 'Команда, отправляющая сообщение в Discord от "Вашего" имени',
    async execute(interaction)
    {
        if( !getBot('The Void Discord') ) return await interaction.reply('Я не могу подключиться к The Void Discord');

        await interaction.reply('Введите своё сообщение')
        
        const chat = interaction.update.message.chat;
        const message = interaction.update.message;
        const from = interaction.update.message.from;
        const update = interaction.update;

        const replyMessages =
        [
            'Введите ID канала в Discord, куда Вы хотите отправить сообщение',
            'Введите Discord ID (Если у Вас привязан аккаунт, можете ввести 0):',
            'Введите одноразовый четырех значный код'
        ];

        const methods =
        [
            [ 'message',     'send' ],
            [ 'channel ID',  'send' ],
            [ 'discord ID',  'send' ],
            [ '4-code',      'send' ]
        ];

        setMessageId(chat.id, message.message_id + 2, from.id, 'one+ msg', replyMessages, replyMessages.length, methods);
    }
};