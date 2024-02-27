const
    { Telegraf } = require('telegraf'),    

    { telegramToken } = require('../config.json'),

    { deployCommands } = require('./deploy-commands'),

    { messageListener } = require('./utility/messageListener'),

    { message } = require('telegraf/filters');

const { setBot } = require('../utility/bots')

const client = new Telegraf(telegramToken);

deployCommands(client)

process.once('SIGINT', () =>
{
    client.stop('SIGINT')
});

process.once('SIGTERM', () =>
{
    client.stop('SIGTERM')
});

process.once('exit', () => setBot('The Void Telegram', false) );

setBot('The Void Telegram', true);

client.on('message', async message =>
{
	messageListener(message)
})

client.launch();