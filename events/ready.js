const
	{ Events, ActivityType } = require('discord.js'),
	{ Color, color, bold } = require(`colors`),
	{ functionRandomActivity } = require('../utils/randomActivities'),
	{ getActivities, downloadActivities } = require('../utils/updateActivities'),
	{ setGMPlaying } = require('../utils/music'),
	{ setDevelopClient, setDevelop } = require('../utils/develop'),
	{ Tags } = require('../utils/tags'),
	
	guilds = [];

module.exports =
{
	name: Events.ClientReady,
	once: true,
	async execute(client)
	{

		Tags.sync();
		setDevelop(client);

		client.user.setPresence({ activities: [ { name: 'The Void' } ], status: 'idle' });
		client.user.setActivity('The Void Community~', { type: ActivityType.Playing });
		
		client.guilds.cache.forEach(guild => {	guilds.push(guild)	});
		
		setGMPlaying(client);
		setDevelopClient(client);
		
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

				console.log();
		
				console.log(`Готово!`.bold +` `+`The Void`.bgCyan.black+` готов к работе, как `+`${client.user.tag}`.red.bold+`\n`);
		
				functionRandomActivity(client, guilds);
				
				setInterval(() => {
					functionRandomActivity(client, guilds);
				}, 75000);
			}, 5000);
		}
		catch (er)
		{
			console.log(er)
		}

	},
};