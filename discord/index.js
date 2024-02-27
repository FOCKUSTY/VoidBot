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

	{ modalSubmit } = require('./events/modals'),
	{ skip } = require('./utils/developConsole'),

 	{
		token,
		channelWithKristyChattingId,
		authorId,
		logGuildId,
		logChannelId,
		kristyId,
		clientId,
	} = require('../config.json'),

	{ color, bold } = require('colors'),
	{ sendMessageLog } = require('./utils/messageLog'),
	{ msgPing } = require('./utils/msgPing'),
	{ indexDeployCommands, updateCommands } = require('./utils/deployCommands'),
	{ Random } = require('random-js'),
	{ getLogGuild } = require('./utils/dataBase'),
	{ checkKristyStatus } = require('./utils/activity'),
	// { setCommands } = require('./deploy-commands'),
	{ chattingWithKristy } = require('./utils/chatting');

const { setBot } = require('../utility/bots')

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
		sendMessageLog(message, "send", undefined, logGuildId, logChannelId);
		
		if(message.mentions.users.get(`${authorId}`)) msgPing(message);
		if(message.channel.id===`${channelWithKristyChattingId}`) chattingWithKristy(message);
	};
});

client.on(Events.MessageUpdate, (m, nm) =>
{
	getLogGuild('findAll')
		.then((guildId) =>
		{
			getLogGuild('findOne', guildId)
				.then(async (data) =>
				{
					if(data?.optionupdate && (data.guildid === m.guild.id) )
					{
						await sendMessageLog(m, "update", nm, `${data.guildid}`, `${data.channellogid}`)
					}
				});
		});

	sendMessageLog(m, "update", nm, logGuildId, logChannelId);
})
client.on(Events.MessageDelete, (m) =>
{
	getLogGuild('findAll')
		.then((guildId) =>
		{
			getLogGuild('findOne', guildId)
				.then(async (data) =>
				{
					if(data?.optionupdate && (data.guildid === m.guild.id) )
					{
						await sendMessageLog(m, "update", undefined, `${data.guildid}`, `${data.channellogid}`)
					}
				});
		});

	sendMessageLog(m, "delete", undefined, logGuildId, logChannelId);
});

client.on(Events.PresenceUpdate, (oldPresence, newPresence) =>
{
	if(newPresence.userId != kristyId) return;
	checkKristyStatus(client, newPresence?.activities?.state);
});

process.once('exit', () => setBot('The Void Discord', false) );

client.login(token);