const { Events, Client, GatewayIntentBits, Collection } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const fs = require('node:fs');

client.cooldowns = new Collection();

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		const int = interaction
		
		if (!int.isChatInputCommand()) return;

		const command = int.client.commands.get(int.commandName);

		const fsLog = fs.createWriteStream(	`./command.log`, {	flags: 'a'	} )

const textLog = `
-------[New command use] -------
The command was launched !:
Command name   : ${int.commandName}
Command used   : ${int.user}
Command used   : ${int.user.username}
Command used   : ${int.user.globalName}
Command guild  : ${int.guild.id}
Command guild  : ${int.guild.name}
Command time   : <t:${Math.floor(int.createdTimestamp / 1000 - 35)}>
Command time   : <t:${Math.floor(int.createdTimestamp / 1000 - 35)}:R>
Test           : 
-------[New command use] -------
`

		// fsLog.write(textLog)
		console.log(textLog)

		
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
				return int.reply({ content: `Пожалуйста подождите, у Вас задержка на команду \`${command.data.name}\`. Вы сможете использовать команду <t:${expiredTimestamp}:R>.`, ephemeral: true });
			}
		}

		timestamps.set(interaction.user.id, now);
		setTimeout(() => timestamps.delete(int.user.id), cooldownAmount);

		try {
			await command.execute(int);
		} catch (error) {
			console.error(`Error executing ${int.commandName}`);
			console.error(error);
		}
	},
};