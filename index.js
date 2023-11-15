const { Client, Collection, GatewayIntentBits, Events, InteractionType, EmbedBuilder } = require('discord.js');
const { token } = require('./config.json');
const { color } = require(`./developing.json`);
const fs = require('node:fs');
const path = require('node:path');
const logChannelId = `1171197868909015102`;
const logGuildId = `1169284741846016061`;

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

	let msg;
	let msgAdd;
	let msg2;
	let msg2Add;

	if(m.content.length>=1000) {
		msg = m.content.slice(0, 1000);
		msgAdd = m.content.slice(1000, m.content.length);
	} else {
		msg = m.content.slice(0, m.content.length);
	}
	if(m2) {
		if(m2.content.length>=1000) {
			msg2 = m2.content.slice(0, 1000);
			msg2Add = m2.content.slice(1000, m2.content.length);
		} else {
			msg2 = m2.content.slice(0, m2.content.length);
		}
	}

	const fields = [
		{
		  name: `${m2 ? "Старое с" : "С"}одержание`,
		  value: `\`\`\`${msg ? msg
			.replaceAll("```", "<code>")
			.replaceAll("`", "\"")
			:
			"<Пусто>"
			}\`\`\``,
		  inline: false,
		},
	  ];
	  if (m.attachments.size > 0) {
		fields.push({
		  name: `${m2 ? "Старые в" : "В"}ложения`,
		  value: m.attachments
			.map((att) => `\`\`\`${att.url}\`\`\``)
			.join(`\n&&\n`),
		  inline: false,
		});
	  }
	
	  if (m2) {
		fields.push({
		  name: "Новое содержание",
		  value: `\`\`\`${msg2 ? msg2
			.replaceAll("```", "<code>")
			.replaceAll("`", "\"")
			:
			"<Пусто>"
			}\`\`\``,
		  inline: false,
		});
		if (m2.attachments.size > 0) {
		  fields.push({
			name: "Новые вложения",
			value: `${m2.attachments
			  .map((att) => `\`\`\`${att.url}\`\`\``)
			  .join(`\n&&\n`)}`,
			inline: false,
		  });
		}
	  }
	  if(msgAdd) {
		fields.push({
			name: "Дополнительное содержание",
			value: `\`\`\`${msgAdd ? msgAdd
				.replaceAll("```", "<code>")
				.replaceAll("`", "\"")
				:
				"<Пусто>"
			}\`\`\``,
			inline: false
		})
	  }
	  if(msg2Add) {
		fields.push({
			name: "Дополнительное содержание",
			value: `\`\`\`${msg2Add ? msg2Add
				.replaceAll("```", "<code>")
				.replaceAll("`", "\"")
				:
				"<Пусто>"
			}\`\`\``,
			inline: false
		})
	  }

	  try {
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
				**На сервере:** ${m.guild}\n**Id сервера: **${m.guildId}\n
				**В канале:** **[${m.channel.name}](${m.channel.url})** (${m.channel.url})`
				)
			  .setThumbnail(m.guild?.iconURL())
			  .setTimestamp()
			  .addFields(fields)
			]
		  });
	  } catch (error) {
		console.log(error)
	  }
};

client.on(Events.MessageCreate, (m) => sendMsgLogs(m, "send"));
client.on(Events.MessageUpdate, (m, nm) => sendMsgLogs(m, "update", nm));
client.on(Events.MessageDelete, (m) => sendMsgLogs(m, "delete"));

client.login(token)