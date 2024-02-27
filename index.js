const
	{
		Client,
		Collection,
		GatewayIntentBits,
		Events,
		Partials,
		RichPresenceAssets,
		PresenceManager,
		ClientPresence,
		REST
	} = require('discord.js'),

	{ modalSubmit } = require('./discord/events/modals'),
	{ skip } = require('./discord/utils/developConsole'),

 	{
		token,
		channelWithKristyChattingId,
		authorId,
		logGuildId,
		logChannelId,
		kristyId,
		clientId,
		telegramToken
	} = require('./config.json'),

    {
        Telegraf
    } = require('telegraf'),    

    {
        deployCommands
    } = require('./telegram/deploy-commands'),

    {
        message
    } = require('telegraf/filters'),

	{
		messageDeleteLog,
		messageUpdateLog,
		messageCreateLog
	} = require('./discord/utils/logging/messageLog'),

	{
		presenceListener
	} = require('./discord/utils/activity'),

	{
        msgPing
    } = require('./discord/utils/msgPing'),

    {
        chattingWithKristy
    } = require('./discord/utils/chatting'),

    {
        checkKristyStatus
    } = require('./discord/utils/activity'),

	{ messageListener } = require('./telegram/utility/messageListener'),

	{ color, bold } = require('colors'),
	{ sendMessageLog } = require('./discord/utils/messageLog'),
	{ indexDeployCommands, updateCommands } = require('./discord/utils/deployCommands'),
	{ Random } = require('random-js');

const util = require('util')
const fs = require('node:fs');
const path = require('node:path');
const r = new Random();
const actH = [];

const client = new Client({
	intents:
	[
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.GuildPresences
	],
	partials:
	[
		Partials.Channel
	],
	presence:
	[
		RichPresenceAssets,
		PresenceManager,
		ClientPresence
	]
});

const tClient = new Telegraf(telegramToken);

client.commands = new Collection();

const globalfoldersPath = path.join(__dirname, 'discord/commands');
const globalcommandFolders = fs.readdirSync(globalfoldersPath);

const guildFoldersPath = path.join(__dirname, 'discord/guildCommands');
const guildCommandFolders = fs.readdirSync(guildFoldersPath);

const telegramFoldersPath = path.join(__dirname, 'telegram/commands');
const telegramCommandFolders = fs.readdirSync(telegramFoldersPath);

console.log(`Мои команды:`.bold);
indexDeployCommands(globalcommandFolders, globalfoldersPath, client, 'global');

skip();

console.log('Мои команды гильдии:'.bold);
indexDeployCommands(guildCommandFolders, guildFoldersPath, client, 'guild');

skip();

console.log('Мои telegram команды:'.bold);
deployCommands(tClient, telegramCommandFolders, telegramFoldersPath);

const eventsPath = path.join(__dirname, 'discord/events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles)
{
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once)
	{
		client.once(event.name, (...args) => event.execute(...args));
	}
	else
	{
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.on(Events.InteractionCreate, async interaction => modalSubmit(interaction) );

client.on(Events.MessageCreate, (message) => messageCreateLog(message));
client.on(Events.MessageUpdate, (m, nm) => messageUpdateLog(m, nm, sendMessageLog));
client.on(Events.MessageDelete, (m) => messageDeleteLog(m, sendMessageLog));

let oldActivity;

client.on(Events.PresenceUpdate, (oldPresence, newPresence) =>
{
	if(newPresence.userId === kristyId || newPresence.userId === authorId)
	{
		for(let activity of newPresence.activities)
		{
			if(activity.name === 'Custom Status')
			{
				if(oldActivity != activity.state)
				{
					oldActivity = activity.state;
					checkKristyStatus(client, `${activity.state}`.toLocaleLowerCase());
				}
				else return;
			}
		};
	}
	else return;
});

process.once('SIGINT', () =>
{
    tClient.stop('SIGINT')
});

process.once('SIGTERM', () =>
{
    tClient.stop('SIGTERM')
});

client.login(token);

tClient.on('message', async message => messageListener(message) );

tClient.launch();