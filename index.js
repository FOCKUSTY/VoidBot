const { Client, Collection, GatewayIntentBits, Events, InteractionType, EmbedBuilder } = require('discord.js');
const { token } = require('./config.json');
const { Color, color, bold } = require(`colors`);
const { Tags, sendMsgLogs, randomActivity, randomNames, nameTexts, historyRandom, funcGuildTexts, randomText } = require(`./developing`)
const { Random } = require('random-js')
const fs = require('node:fs');
const path = require('node:path');
const r = new Random();
const actH = [];
const actType = [`Играет в `, `Стримит `, `Слушает `, `Смотрит `, ``, `Соревнуется в `]
const guilds = [];
const members = [];

const client = new Client({
	intents: [
	GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.DirectMessages,
	GatewayIntentBits.MessageContent,
	GatewayIntentBits.GuildVoiceStates,
]});

client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
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

client.on(Events.MessageCreate, (m) => sendMsgLogs(m, "send"));
client.on(Events.MessageUpdate, (m, nm) => sendMsgLogs(m, "update", nm));
client.on(Events.MessageDelete, (m) => sendMsgLogs(m, "delete"));

client.on(Events.InteractionCreate, async int => {
	const user = int.user.globalName;
	const userAvatar = `https://cdn.discordapp.com/avatars/${int.user.id}/${int.user.avatar}.png`;
	let iconURL;
	if(int.guild!=undefined||int.guild!=null) {
		iconURL = `https://cdn.discordapp.com/icons/${int?.guild?.id}/${int?.guild?.icon}.png`
	} else {
		iconURL = `https://cdn.discordapp.com/avatars/${int.user.id}/${int.user.avatar}.png`
	}
	
	if(int.type === InteractionType.ModalSubmit) {

		const ideaTitle = int.fields.getTextInputValue(`ideaTitle`);
		const ideaDetails = int.fields.getTextInputValue(`ideaDetails`);

			const embed = new EmbedBuilder()
			.setColor(0x161618)
			.setAuthor({name: `${user}`, iconURL: `${userAvatar}`})
			.setTitle(`${ideaTitle}`)
			.setThumbnail(`${iconURL}`)
			.setDescription(`${ideaDetails}`)
			.setFields(
				{name: `Пользователь:`, value: `<@${int.user.id}>`, inline: true},
				{name: `\n`, value: `\n`, inline: true},
				{name: `Сервер:`, value: `${int.guild?.name||`Не на сервере`}`, inline: true}
			)
			.setTimestamp();

			client.channels.cache.get(`1171051517910986752`).send({content: ``, embeds: [embed]});

			int.reply({content: `Ваша идея была доставлена!`, embeds: [embed], ephemeral: true});

			console.log(`Идея была доставлена\nИдея: ${ideaTitle}\nОписание: ${ideaDetails}\nНаписал: ${user} (${int.user.id})\nС сервера: ${int.guild?.name||`Не на сервере`} (${int.guild?.id||``})\n`);
			
			try {
				const tag = await Tags.create({
					name: ideaTitle,
					username: int.user.username,
					globalname: int.user.globalName,
					description: ideaDetails,
					guildname: int?.guild?.name||`Не на сервере`
				});
				console.log(`Тег идеи успешно добавлен\nНазвание: ${tag.name}\nОписание: ${tag.description}\nОтправил: ${tag.username}\nС сервера: ${tag.guildname}`)
			} catch (error) {
				console.log(`Ошибка с добавление тега\n${error}`)
			}
		};
})

client.on(Events.MessageCreate, async (m) => {
	if(m.channel?.id!=`1175738843203391550`) return;
	if(m.author.id!=`1164228812217790565`) return;

	m.client.guilds.cache.forEach(guild => {
		guilds.push(guild)
	});
	
	m.guild.members.cache.forEach(member => {
		if(member.id===`1122199797449904179`||member.id===`1020329590612308089`) return;	
		members.push(member.id)
	})

	const member = members[r.integer(0, members.length-1)]

	const text = randomText(randomActivity, randomNames, guilds, funcGuildTexts, nameTexts, historyRandom)

	m.client.channels.cache.get(m.channel.id).sendTyping()
	
	setTimeout( async () => {
		await m.client.channels.cache.get(m.channel.id).send(`${text}\nИ не забыть <@${member}> !`)
	}, 2000);
})

client.login(token)