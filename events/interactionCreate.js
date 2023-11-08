const { Events, Client, GatewayIntentBits, Collection, InteractionType, EmbedBuilder } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const { color } = require(`../developing.json`);
const { colors } = require(`colors`)

client.cooldowns = new Collection();

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		const int = interaction;
		
		if (!int.isChatInputCommand()) return;

		const user = int.user.globalName
        const userIconURL = `https://cdn.discordapp.com/avatars/${int.user.id}/${int.user.avatar}.png`

		const command = int.client.commands.get(int.commandName);

		const subcommands = []

		for (let key in int.options) {
			if (int.options.hasOwnProperty(key)) {
				if(int.options[`_group`]!=null){subcommands.push(`Группа: ${int.options[`_group`]}`)};
				if(int.options[`_subcommand`]!=null){subcommands.push(`Подкоманда: ${int.options[`_subcommand`]}`)};
				if(int.options[`_group`]===null && int.options[`_subcommand`]===null) {subcommands.push(`Нет подкоманд`)};
				break;
			}
		}

console.log(
	`Было замечено использование команды`.bold + `\n` +
	`Название команды: ` + `/${int.commandName}`.red + `\n` +
	`${subcommands}` + `\n` +
	`Команду использовал: ` + `${int.user} - ${int.user.username} (${int.user.globalName})`.green + `\n` +
	`В канале: ` + `${int.channel} - (${int.channel.name})`.yellow + `\n` +
	`Время использования: ` + `<t:${Math.floor(int.createdTimestamp / 1000 - 35)}> (<t:${Math.floor(int.createdTimestamp / 1000 - 35)}:R>)`.cyan + `\n` +
	`Время в часах: ` + ``+`${new Date().toLocaleString()}`.magenta+`` + '\n'
)
		
		if (!command) {
			console.error(`No command matching ${int.commandName} was found.`);
			return;
		}

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

		try {
			await command.execute(int);
		} catch (error) {
			console.error(`Error executing ${int.commandName}`);
			console.error(error);
		}
	},
};