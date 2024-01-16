const
	{
		Events,
		Client,
		GatewayIntentBits,
		Collection,
	} = require('discord.js'),
	
	{ dateCheck } = require('../utils/date'),
	{ Color, color, bold } = require(`colors`),
 	
	date = new Date(),
	client = new Client({intents: [GatewayIntentBits.Guilds]})

client.cooldowns = new Collection();

module.exports =
{
	name: Events.InteractionCreate,
	async execute(interaction)
	{
		const int = interaction;
		
		if (!int.isChatInputCommand()) return;
		
		// const user = int.user.globalName;
		// const userAvatar = `https://cdn.discordapp.com/avatars/${int.user.id}/${int.user.avatar}.png`;

		const command = int.client.commands.get(int.commandName);

		// const commandName = int.commandName;

		const subcommands = [];
		for (let key in int.options) {
			const group = int.options[`_group`];
			const subcommand = int.options[`_subcommand`];
			const hoistedOptions = int.options[`_hoistedOptions`];
			if (int.options.hasOwnProperty(key)) {
				if(group!=null)
				{
					subcommands.push(`Группа: ${group}`);
				};
				if(subcommand!=null)
				{
					subcommands.push(`Подкоманда: ${subcommand}`);
				};
				if(hoistedOptions[0]?.name!=undefined)
				{
					for(let i in hoistedOptions) subcommands.push(`Опция: ${hoistedOptions[i]?.name}`);
				};
				if(group===null && subcommand===null && hoistedOptions[0]?.name===undefined)
				{
					subcommands.push(`Нет подкоманд`);
				};
				break;
			}
		};

console.log(
	`Было замечено использование команды` + `\n` +
	`Название команды: ` + `${int.commandName}`.red + `\n` +
	`${subcommands.join(`\n`)}` + `\n` +
	`Команду использовал: ` + `${int.user} - ${int.user.username} (${int.user.globalName})`.green + `\n` +
	`Аккаунт создан с ` + `${dateCheck(int.user.createdAt)||`Не известно`}`.magenta + `\n` +
	`На сервере: ` + `${int?.guild||`Не на сервере`}`.yellow+`\n`+
	`Сервер создан с `+`${dateCheck(int?.guild?.createdAt)||`Не на сервере`}`.magenta+ `\n` +
	`Участник на сервере с `+`${dateCheck(int?.member?.joinedAt)||`Не на сервере`}`.magenta+`` + `\n` +
	`В канале: ` + `${int?.channel||`Личные сообщения`} ${int?.channel?.name||`с ботом`}`.yellow + `\n` +
	`Время использования: ` + `<t:${Math.floor(int.createdTimestamp / 1000 - 35)}> (<t:${Math.floor(int.createdTimestamp / 1000 - 35)}:R>)`.cyan + `\n` +
	`Время в часах: ` + ``+`${date.toLocaleString()}`.magenta+`` + '\n'
);
		
		if (!command) {
			console.error(`No command matching ${int.commandName} was found.`);
			return;
		};

		const { cooldowns } = client;

		if (!cooldowns.has(command.data.name)) {
			cooldowns.set(command.data.name, new Collection());
		}

		const now = Date.now();
		const timestamps = cooldowns.get(command.data.name);
		const defaultCooldownDuration = 3;
		const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1000;

		if (timestamps.has(int.user.id)) {
			const expirationTime = timestamps.get(int.user.id) + cooldownAmount;
		
			if (now < expirationTime) {
				const expiredTimestamp = Math.round(expirationTime / 1000);
				return int.reply({content: `Пожалуйста подождите, у Вас задержка на команду \`${command.data.name}\`. Вы сможете использовать команду <t:${expiredTimestamp}:R>.`, ephemeral: true });
			}
		}

		timestamps.set(int.user.id, now);
		setTimeout(() => timestamps.delete(int.user.id), cooldownAmount);
		if(int.user.id===`877154902244216852`){timestamps.delete(`877154902244216852`)}

		try {
			await command.execute(int);
		} catch (error) {
			console.error(`Error executing ${int.commandName}`);
			console.error(error);
		}
	},
};