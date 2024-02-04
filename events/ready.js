const
	{ Events, ActivityType } = require('discord.js'),
	{ Color, color, bold } = require(`colors`),
	{ functionRandomActivity } = require('../utils/randomActivities'),
	{ getActivities, downloadActivities } = require('../utils/updateActivities'),
	{ setGMPlaying } = require('../utils/music'),
	{ setDevelopClient, setDevelop } = require('../utils/develop'),
	{ setUsernames, getAmount } = require('../utils/user'),
	{ Tags } = require('../utils/dataBase'),
	{ checkNumber } = require('../utils/stages'),
	{ skip } = require('../utils/developConsole'),
	{ changeComma } = require('../utils/changeComma'),
	{ readAllMessageFromIdeaChannel } = require('../utils/ideaMethods'),
	
	guilds = [];

module.exports =
{
	name: Events.ClientReady,
	once: true,
	async execute(client)
	{

		Tags.sync();
		setDevelop(client);
		setGMPlaying(client);
		setDevelopClient(client);
		setUsernames(client);
		readAllMessageFromIdeaChannel(client);

		client.user.setPresence({ activities: [ { name: 'The Void' } ], status: 'idle' });
		client.user.setActivity('The Void Community~', { type: ActivityType.Playing });
		
		client.guilds.cache.forEach(guild => {	guilds.push(guild)	});

		try
		{			
			setTimeout(() =>
			{
				downloadActivities();

				const randomActivity = getActivities('randomActivity')

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

				functionRandomActivity(client, guilds, false, true);
				
				setInterval(() => {
					functionRandomActivity(client, guilds, false, true);
				}, 75000);
			}, 5000);
		}
		catch (err)
		{
			console.log(err)
		}

	},
};