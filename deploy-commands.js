const { REST, Routes } = require('discord.js');
const { clientId, token } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');
const { colors } = require(`colors`);
const { deployCommands, updateCommands } = require('./utils/deployCommands')

const guildCommands = [];
const guildFoldersPath = path.join(__dirname, 'guildCommands');
const guildCommandFolders = fs.readdirSync(guildFoldersPath);

const globalCommands = [];
const globalFoldersPath = path.join(__dirname, 'commands');
const globalCommandFolders = fs.readdirSync(globalFoldersPath);

deployCommands(guildCommandFolders, guildCommands, guildFoldersPath);
deployCommands(globalCommandFolders, globalCommands, globalFoldersPath);

const rest = new REST().setToken(token);

updateCommands(rest, guildCommands, clientId, 'guild');
updateCommands(rest, globalCommands, clientId, 'global');

/* for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);

		if ('data' in command && 'execute' in command) {
			commands.push(command.data.toJSON());
		} else {
			console.log(`[WARNING] The command at `+`${filePath}`.bold+` is missing a required "data" or "execute" property.`);
		}
	}
}; */

/* (async () => {
	try {
		console.log(`Начало обновления `+`${commands.length} (/)`.cyan+` команд(ы)`);

		const data = await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands },
		)
		console.log(`Успешно обновлено `+`${data.length} (/)`.cyan+` команд(ы)`);
	} catch (error) {
		console.error(error);
		return;
	}
})(); */