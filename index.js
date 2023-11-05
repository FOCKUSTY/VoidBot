const { Client, Collection, GatewayIntentBits, Events, EmbedBuilder } = require('discord.js');
const { token } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');
const userGuildChannelsId = []
const guildChannelsId = []
const logChannelId = `1168616591051739296`
const logGuildId = `1053295032762908782`

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

function sendMsgLogs(m, reason, m2) {
	let attachmentName;
	let attachmentUrl;
	let attachmentProxyUrl;
	let color;
	const r = reason;

	m.attachments.forEach(attachment => {
		attachmentName = attachment.name
		attachmentUrl = attachment.url
		attachmentProxyUrl = attachment.proxyURL
	});
  
	switch (reason) {
	  case "send":
		reason = "отправлено";
		color = "#7fdf7f";
		break;
  
	  case "update":
		reason = "обновлено";
		color = "#7f7f7f";
		break;
  
	  case "delete":
		reason = "удалено";
		color = "#df7f7f";
		break;
  
	  default:
		reason = "||`{ошибка в коде}`||"
		color = "#7f7f7f"
		break;
	}
  
	if (m.author.bot) return;

	let fields = [
	  {
		name: `${m2 ? "Старое с" : "С"}одержание`,
		value: `\`\`\` ${m.content
			.replaceAll('```', ` <script> `)
			.replaceAll('`', `"`)
			}\`\`\``,
		inline: false
	  }
	];
  
	if (m2) fields.push({
	  name: "Новое содержание",
	  value: `\`\`\` ${m2.content
		.replaceAll('```', `<script>`)
		.replaceAll('`', `"`)}\`\`\``,
	  inline: false
	});

	if(attachmentName != undefined & attachmentUrl != undefined) {
		fields.push({
			name: `Вложения:`,
			value: `\`\`\`FileName: ${attachmentName}\nUrl: ${attachmentUrl}\nProxyUrl: ${attachmentProxyUrl}\`\`\``,
			inline: false
		})
	}

	(m.client.channels.cache.get(logChannelId)).send({
	  embeds: [new EmbedBuilder()
		.setColor(color)
		.setAuthor({
		  name: `${m.author.username} (${m.author.id})`,
		  iconURL: m.author.avatarURL() ? m.author.avatarURL() : m.author.defaultAvatarURL
		})
		.setTitle(`${m.client.guilds.cache.get(logGuildId)?.name}`)
		.setDescription(
			`**[Сообщение](${m.url})** было ${reason} от ${m.author} (${m.url})\n
			На сервере ${m.guild} - ${m.guildId}\n
			В канале **[${m.channel.name}](${m.channel.url})** (${m.channel.url})`
			)
		.setThumbnail(m.guild?.iconURL())
		.setTimestamp()
		.addFields(fields)
	  ]
	});

	if(m.content === `!Дай всю информацию о каналах` & m.author.id === `877154902244216852`){
		for(i = 0; i < userGuildChannelsId.length; i += 100){
            const embedTwo = new EmbedBuilder()
                .setColor(0x161618)
                .setTitle('Информация с серверов')
                .setAuthor({ name: `Bottomless Hat`, iconURL: `https://cdn.discordapp.com/icons/1053295032762908782/c349d0ecbd2d23859aba5b0f7bbec1ae.png` })
                .setDescription(`\`\`\`${userGuildChannelsId.slice(0 + i, 100 + i)}\`\`\``)
			client.channels.cache.get(`${m.channel.id}`).send({content: ``, embeds: [embedTwo], ephemeral: true});
		}
	}

	if (m.content != ``) {
		const say = `!say`
		const msg = m.content
		const stringSay = msg[0]+msg[1]+msg[2]+msg[3]
	if(stringSay.toLowerCase() === say & m.author.id === `877154902244216852`){
		try {
		const one = msg.indexOf(` `)
		const two = msg.indexOf(` `, one+1)
		const three = msg.indexOf(` [end text]`)
		const id = msg.slice(one+1, two)
		const mainMsg = msg.slice(two, three)
		const channel = client.channels.cache.get(id)
		console.log(`Id: ${id}`)
		console.log(`Сообщение: ${mainMsg}`)
		channel.send(mainMsg)
		console.log(`Готово! Команда The Void отправила сообщение на <#${id}> (${channel.name} в ${channel.guild})`)
	} catch (err) {
		client.channels.cache.get(m.channel.id).send(`<@${m.author.id}> Введите корректный Id канала или правильно запищите концы и начала строк !
		Ошибка: \`\`\`${err}\`\`\``)
		console.log(`Error! - ${err}`)
	}
	}
	}
  }

client.on(Events.MessageCreate, (m) => sendMsgLogs(m, "send"));
client.on(Events.MessageUpdate, (m, nm) => sendMsgLogs(m, "update", nm));
client.on(Events.MessageDelete, (m) => sendMsgLogs(m, "delete"));

client.on(Events.ClientReady, () => {
	client.channels.cache.forEach(TextChannel => {
		var TextChannelId = TextChannel.id
		var TextChannelName = TextChannel.name
		var TextChannelGuildId = TextChannel.guildId
		var TextChannelGuild = TextChannel.guild
		userGuildChannelsId.push(`\n${TextChannelId}/${`${TextChannelName}`.slice(0, 8)}-${`${TextChannelGuildId}`.slice(0, 2)}${`${TextChannelGuild}`.slice(0, 5)}`)
		guildChannelsId.push(`${TextChannelId}`)
	  })
})

client.login(token)
