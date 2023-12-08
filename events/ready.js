const { Events, ActivityType, ActivityFlags, ActivityPlatform, GatewayActivityButton } = require('discord.js');
const { Color, color, bold } = require(`colors`);
const { Tags, download } = require(`../developing`)
const { randomActivity, functionRandomActivity, actLengths, actLength, downloadActivities } = require(`../developing`);
const guilds = [];

let actDownload = 0;

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {

		Tags.sync();

		client.user.setPresence({activities: [{ name: 'The Void' }], status: 'idle'}); 
		client.user.setActivity('The Void Community~', {type: ActivityType.Playing});

		client.guilds.cache.forEach(guild => {
			guilds.push(guild)
		});

		setTimeout(() => {
			
			downloadActivities();	
			console.log(`Рандомные активности:`.bold + `\n`);
			for (e of randomActivity) {
				console.log(`${e[0]}`.magenta + ` - ${`${randomActivity.indexOf(e)}`.bold}`);
			};

			console.log(`Всего ${`${actLength()}`.magenta} Активность(и)(ей)`);
			for(el of actLengths) {
				console.log(`Всего ${`${el[0]}`.magenta} ${el[1]}`);
				actDownload += Number(el[0]);
			};

			console.log(`Всего загружено: ${`${actDownload}`.magenta} разных(ые) активности(ей)`);
			console.log();
	
			console.log(`Готово!`.bold +` `+`The Void`.bgCyan.black+` готов к работе, как `+`${client.user.tag}`.red.bold+`\n`);
	
			functionRandomActivity(client, guilds);
	
			setInterval(() => {
				functionRandomActivity(client, guilds);
			}, 60000);
		}, 5000);

	},
};