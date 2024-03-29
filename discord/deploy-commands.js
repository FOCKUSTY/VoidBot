const
{
    REST,
    Routes,
    Client,
    GatewayIntentBits
} = require('discord.js');

const { clientId, token } = require('../config.json');

const fs = require('node:fs');
const path = require('node:path');
const { colors } = require(`colors`);
const { deployCommands, updateCommands, setCommand} = require('./utils/deployCommands')

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

/* const setCommands = async (guilds) =>
{
    for(let guild of await guilds)
    {
        await updateCommands(rest, globalCommands, clientId, 'guild', `${await guild[0]}`);
    };
}; */

/* module.exports =
{
    setCommands
} */