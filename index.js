const
	{
		Client,
		Collection,
		GatewayIntentBits,
		Events,
		Partials,
		RichPresenceAssets,
		PresenceManager,
		ClientPresence
	} = require('discord.js'),

	{ modalSubmit } = require('./events/modals'),
	{ skip } = require('./utils/developConsole'),

 	{
		token,
		channelWithKristyChattingId,
		authorId
	} = require('./config.json'),

	{ color, bold } = require('colors'),
	{ sendMessageLog } = require('./utils/messageLog'),
	{ msgPing } = require('./utils/msgPing'),
	{ indexDeployCommands } = require('./utils/deployCommands'),
	{ Random } = require('random-js'),
	{ chattingWithKristy } = require('./utils/chatting');
	
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
	partials: [Partials.Channel],
	presence: [
		RichPresenceAssets,
		PresenceManager,
		ClientPresence
	]
});

client.commands = new Collection();
const globalfoldersPath = path.join(__dirname, 'commands');
const globalcommandFolders = fs.readdirSync(globalfoldersPath);

const guildFoldersPath = path.join(__dirname, 'guildCommands');
const guildCommandFolders = fs.readdirSync(guildFoldersPath);

console.log(`Мои команды:`.bold);
indexDeployCommands(globalcommandFolders, globalfoldersPath, client, 'global');

skip();

console.log('Мои команды гильдии:'.bold);
indexDeployCommands(guildCommandFolders, guildFoldersPath, client, 'guild');

const eventsPath = path.join(__dirname, 'events');
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

client.on(Events.MessageCreate, (message) =>
{
	if(message.channel.type === 1)
	{
		console.log(message.content, message.author.username, message.author.id);
	}
	else
	{
		sendMessageLog(message, "send");
		
		if(message.mentions.users.get(`${authorId}`)) msgPing(message);
		if(message.channel.id===`${channelWithKristyChattingId}`) chattingWithKristy(message);
	};
});

client.on(Events.MessageUpdate, (m, nm) => sendMessageLog(m, "update", nm));
client.on(Events.MessageDelete, (m) => sendMessageLog(m, "delete"));

client.login(token)