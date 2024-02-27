const
	{ Events, ActivityType, REST } = require('discord.js'),
	{ Color, color, bold } = require(`colors`),
	{ functionRandomActivity } = require('../utils/randomActivities'),
	{ getActivities, downloadActivities } = require('../utils/updatejson'),
	{ setGMPlaying } = require('../utils/music'),
	{ setDevelopClient, setDevelop } = require('../utils/develop'),
	{ setUsernames, getAmount } = require('../utils/user'),
	{ Tags, logMessagesSchema, deleteTable, sequelize } = require('../utils/dataBase'),
	{ checkNumber } = require('../utils/stages'),
	{ skip } = require('../utils/developConsole'),
	{ changeComma } = require('../utils/changeComma'),
	{ readAllMessageFromIdeaChannel } = require('../utils/ideaMethods'),
	{ checkKristyNickname } = require('../utils/checkNickname'),
	{ setActivity } = require('../utils/activity'),
	{ updateCommands, getCommands } = require('../utils/deployCommands'),
	{ clientId, token } = require('../../config.json'),
	{ setBot } = require('../../utility/bots')
	
	fs = require('fs'),
	path = require('node:path'),

	guilds = [];

const rest = new REST().setToken(token);

module.exports =
{
	name: Events.ClientReady,
	once: true,
	async execute(client)
	{

		// deleteTable(logMessagesSchema);

		Tags.sync();
		logMessagesSchema.sync();

		setDevelop(client);
		setGMPlaying(client);
		setDevelopClient(client);
		setUsernames(client);
		readAllMessageFromIdeaChannel(client);

		setBot('The Void Discord', true);

		client.user.setPresence({ activities: [ { name: 'The Void' } ], status: 'idle' });
		client.user.setActivity('The Void Community~', { type: ActivityType.Playing });
		
		client.guilds.cache.forEach(guild => {	guilds.push(guild)	});

		try
		{			
			setTimeout(async () =>
			{
				downloadActivities();

				const randomActivity = getActivities('randomActivity');

				console.log(`Рандомные активности:`.bold + `\n`);
				for ( let el of randomActivity )
				{
					console.log(`${el[0]}`.magenta + ` - ${`${randomActivity.indexOf(el)}`.bold}`);
				};

				const dumplingCount = getAmount('totalUsers');
				const serversCount = getAmount('totalGuilds');
				const botsCount = getAmount('totalBots');

				const dumplingCountNumeral = checkNumber(dumplingCount, {dumpling: ['пельмень', 'пельменя', 'пельменей']});
				const serversCountNumeral = checkNumber(serversCount, {servers: ['сервер', 'сервера', 'серверов']});
				const botsCountNumeral = checkNumber(botsCount, {spareParts: ['запчасть', 'запчасти', 'запчастей']});

				const dumplingsCountFromEachServer = Math.round(dumplingCount/serversCount*10)/10;
				const botsCountNumberalFromEachServer = Math.round(botsCount/serversCount*10)/10;

				const dumplingsCountFromEachServerNumeral = checkNumber(dumplingsCountFromEachServer, {dumpling: ['пельмень', 'пельменя', 'пельменей']})
				const botsCountNumberalFromEachServerNumeral = checkNumber(botsCountNumberalFromEachServer, {spareParts: ['запчасть', 'запчасти', 'запчастей']})

				skip();
				
				console.log(`Всего собрано ${dumplingCount} ${dumplingCountNumeral} с ${serversCount} ${serversCountNumeral}`);
				console.log(`Также собрано ${botsCount} ${botsCountNumeral} с ${serversCount} ${serversCountNumeral}`)
				console.log(`В среднем с каждого сервера ${changeComma(dumplingsCountFromEachServer)} ${dumplingsCountFromEachServerNumeral}, а также ${changeComma(botsCountNumberalFromEachServer)} ${botsCountNumberalFromEachServerNumeral}`);
				
				skip();

				console.log(`Готово!`.bold +` `+`The Void`.bgCyan.black+` готов к работе, как `+`${client.user.tag}`.red.bold+`\n`);

				setTimeout(() => {
					setActivity(client, 'Собираю пельмени...', 'actTypes.cust');
					
					setTimeout(() => { setActivity( client, `Собрал! Всего собрано ${dumplingCount} ${dumplingCountNumeral} с ${serversCount} ${serversCountNumeral}`, 'actTypes.cust' ) }, 3000);
					setTimeout(() => { setActivity( client, `Также подсчитано ${botsCount} ${botsCountNumeral} с ${serversCount} ${serversCountNumeral}`, 'actTypes.cust') }, 10000);
					setTimeout(() => { setActivity( client, `В среднем ${changeComma(dumplingsCountFromEachServer)} ${dumplingsCountFromEachServerNumeral} и ${changeComma(botsCountNumberalFromEachServer)} ${botsCountNumberalFromEachServerNumeral}`, 'actTypes.cust') }, 15000);
				}, 1000);

				setTimeout(() =>
				{					
					functionRandomActivity(client, guilds, false, true);
					checkKristyNickname(client, true);
				}, 20000);


				setInterval(async () => { checkKristyNickname(client, false) }, 600000);
				setInterval(async () => { functionRandomActivity(client, guilds, false, true) }, 70000);
			}, 5000);
		}
		catch (err)
		{
			console.log(err)
		}

	},
};