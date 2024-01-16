const { Client, Collection, GatewayIntentBits, Events, InteractionType, EmbedBuilder, time,
	MessageMentions: {USERS_PATTERN}
} = require('discord.js');
const { modalSubmit } = require('./events/modals')
const { token } = require('./config.json');
const { color, bold } = require('colors')
/* const {
	Tags,
	sendMsgLogs,
	randomText,
	textbool,
	getBotReply,
	dateCheck, checkDate,
	sendLogMsg
} = require(`./developing`) */
const { Random } = require('random-js')
const fs = require('node:fs');
const path = require('node:path');
const r = new Random();
const actH = [];
/* const actType = [`Играет в `, `Стримит `, `Слушает `, `Смотрит `, ``, `Соревнуется в `]
const guilds = [];
const history = []; */
let using = 0;

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
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

console.log(`Мои команды:`.bold)
for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			const options = command.data.options;
			const name = command.data.name;
			let subcommands = [];
			let spaces = '';
			let text = `Команда ${`${command.data.name}`.magenta}`;
			if(options.length!=0)
			{
				text = `Команда ${`${command.data.name}`.cyan}`
				for(let i=0; i<12 - name.length-1; i++) spaces += ' ';
				subcommands.push(`${spaces} Опции:`);
				for(let key in command.data.options)
				{
					using+=1
					subcommands.push(`${`${options[key].name}`.cyan}`);
					if(using <= options.length-1) subcommands.push("|");
				}; using = 0;
			};
			
			client.commands.set(command.data.name, command);
			subcommands.unshift(text);
			if(subcommands.length!=0) console.log(`${subcommands.join(' ')}`);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.on(Events.InteractionCreate, async int => modalSubmit(int) );

/* client.on(Events.MessageCreate, (m) => sendMsgLogs(m, "send"));
client.on(Events.MessageUpdate, (m, nm) => sendMsgLogs(m, "update", nm));
client.on(Events.MessageDelete, (m) => sendMsgLogs(m, "delete"));
client.on(Events.MessageCreate, async (m) => sendLogMsg(m))

 */
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