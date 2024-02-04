const
    { REST, Routes } = require('discord.js'),
    { color } = require('colors'),
    { guildId } = require('../config.json'),
    { hat } = require('../../VoidDataBase/data.json'),
    { copy } = require('../utils/copyArray'),
    
    fs = require('node:fs'),
    path = require('node:path'),
    
    allCommands = [],
    
    globalCommands = [],
    guildCommands = [];

const getCommands = (type='all') =>
{
    switch (type)
    {
        case 'all':
            return allCommands;

        case 'global':
            return globalCommands;

        case 'guild':
            return guildCommands;
    
        default:
            return allCommands;
    }
}

let using = 0;

const indexDeployCommands = (commandFolders, foldersPath, client, type) =>
{
    for (const folder of commandFolders)
    {
        const commandsPath = path.join(foldersPath, folder);
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
        for (const file of commandFiles)
        {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);
            if ('data' in command && 'execute' in command)
            {
                const options = command.data.options;
                const name = command.data.name;
                let subcommands = [];
                let spaces = '';
                let text = `Команда ${`${command.data.name}`.magenta}`;
                if(options.length!=0)
                {
                    text = `Команда ${`${command.data.name}`.cyan}`
                    for(let i=0; i<15 - name.length-1; i++) spaces += ' ';
                    subcommands.push(`${spaces} Опции:`);
                    for(let key in command.data.options)
                    {
                        using+=1
                        subcommands.push(`${`${options[key].name}`.cyan}`);
                        if(using <= options.length-1) subcommands.push("|");
                    };
                    using = 0;
                };

                allCommands.push(`${hat} ${command.data.name}`);

                if(type==='global') globalCommands.push(`${command.data.name}`);
                else if(type==='guild') guildCommands.push(`${command.data.name}`);

                client.commands.set(command.data.name, command);
                subcommands.unshift(text);
                if(subcommands.length!=0) console.log(`${subcommands.join(' ')}`);
            }
            else
            {
                console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
            };
        };
    };
};

const deployCommands = (commandFolders, commands, foldersPath) =>
{
    for (const folder of commandFolders)
    {
        const commandsPath = path.join(foldersPath, folder);
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
        for (const file of commandFiles)
        {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);
            if ('data' in command && 'execute' in command)
            {
                commands.push(command.data.toJSON());
            }
            else
            {
                console.log(`[WARNING] The command at `+`${filePath}`.bold+` is missing a required "data" or "execute" property.`);
            };
        };
    };
};

const updateCommands = (rest, commands, clientId, type='global') =>
{
    (async () => {
        try
        {
            
            if(type==='global')
            {
                console.log(`Начало обновления `+`${commands.length} (/)`.cyan+` глобальных команд`);
                
                const data = await rest.put(
                    Routes.applicationCommands(clientId),
                    { body: commands },
                )
                
                console.log(`Успешно обновлено `+`${data.length} (/)`.cyan+` глобальных(ые) команд(ы)`);
            }
            else
            {
                console.log(`Начало обновления `+`${commands.length} (/)`.cyan+` команд(ы) гильдии`);

                const data = await rest.put(
                    Routes.applicationGuildCommands(clientId, guildId),
                    { body: commands },
                )
                
                console.log(`Успешно обновлено `+`${data.length} (/)`.cyan+` команд(ы) гильдии`);
            }

        }
        catch (error)
        {
            console.error(error);
            return;
        }
    })();
}

module.exports =
{
    indexDeployCommands,
    deployCommands,
    updateCommands,
    getCommands
}