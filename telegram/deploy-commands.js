const fs = require('node:fs');
const path = require('node:path');
const { color } = require('colors')
const { message } = require('telegraf/filters');

const globalFoldersPath = path.join(__dirname, 'commands');
const globalCommandFolders = fs.readdirSync(globalFoldersPath);

const commands = new Map();

const deployCommands = (client, commandFolders=globalCommandFolders, foldersPath=globalFoldersPath) =>
{
    for (const folder of commandFolders)
    {
        const commandsPath = path.join(foldersPath, folder);
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    
        for (const file of commandFiles)
        {
    
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);
    
            if('execute' in command && 'name' in command)
            {
                console.log(`Telegram команда: ${`${command.name}`.magenta}`);

                if(!command.options) commands.set(command.name, command.execute);
                else commands.set(command.name, [command.execute, command.options]);

                client.command(command.name, async message => command.execute(message));
            }
            else
            {
                console.error(`Потерян 'execute' или 'name' в ${command?.name || 'Имени нет'}\nПуть: ${filePath}`);
            }
        };
    };
};

module.exports =
{
    deployCommands,
    commands
}