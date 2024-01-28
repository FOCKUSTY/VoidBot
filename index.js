const { Client, Collection, GatewayIntentBits, Events, InteractionType, EmbedBuilder, time,
	MessageMentions: {USERS_PATTERN}
} = require('discord.js');
const { modalSubmit } = require('./events/modals');
const { skip } = require('./utils/developConsole')
const { token } = require('./config.json');
const { color, bold } = require('colors');
const { sendMessageLog } = require('./utils/messageLog');
const { msgPing } = require('./utils/msgPing');
const { indexDeployCommands } = require('./utils/deployCommands');
const { Random } = require('random-js');
const fs = require('node:fs');
const path = require('node:path');
const r = new Random();
const actH = [];

const client = new Client({
	intents: [
	GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildMembers,
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.DirectMessages,
	GatewayIntentBits.MessageContent,
	GatewayIntentBits.GuildVoiceStates,
	GatewayIntentBits.GuildPresences,
]});

client.commands = new Collection();
const globalfoldersPath = path.join(__dirname, 'commands');
const globalcommandFolders = fs.readdirSync(globalfoldersPath);

const guildFoldersPath = path.join(__dirname, 'guildCommands');
const guildCommandFolders = fs.readdirSync(guildFoldersPath);

console.log(`Мои команды:`.bold);
indexDeployCommands(globalcommandFolders, globalfoldersPath, client);
skip()
console.log('Мои команды гильдии:'.bold);
indexDeployCommands(guildCommandFolders, guildFoldersPath, client);

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

client.on(Events.MessageCreate, (m) => sendMessageLog(m, "send"));
client.on(Events.MessageUpdate, (m, nm) => sendMessageLog(m, "update", nm));
client.on(Events.MessageDelete, (m) => sendMessageLog(m, "delete"));
client.on(Events.MessageCreate, async (m) => msgPing(m))


/* let bool = false;
let bool_com = false;
let count = 0; */

/* async function chatting(m, text) {
	setTimeout(async () => {
		await m.reply(`${text}`);
		count = 0;
		bool_com = textbool(false);
	}, 2000);
};

client.on(Events.MessageCreate, async (m) => {
	if(m.channel?.id!=`1175738843203391550`) return;
	const kristyUser = await m.guild?.members?.fetch(`1164228812217790565`);
	const kristyStatus = kristyUser.presence?.status;

	if(kristyStatus===undefined||kristyStatus===null||kristyStatus==='offline') return;
	// if(m.author.id!=`877154902244216852`) return;
	if(m.author.id!=`1164228812217790565`) return;
	if(m.mentions.users.get('1122199797449904179')===undefined) return;
	if(bool_com) return;

	count++;
	if(count>1) return;

	bool_com = textbool(true);

	if(!bool) {
		bool = true;
		client.guilds.cache.forEach(guild => {
			guilds.push(guild)
		});
	};

		const text = randomText(guilds);

		m.client.channels.cache.get(m.channel.id).sendTyping();

		chatting(m, text);
	}
) */

client.login(token)