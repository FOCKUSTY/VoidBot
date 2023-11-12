const { Events, ActivityType } = require('discord.js');
const { Color, color, bold } = require(`colors`);
const { randomActivity, functionRandomActivity, randomNames } = require(`../developing`);
const guilds = [];

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {

		client.user.setPresence({ activities: [{ name: 'activity' }], status: 'idle' }); 
		client.user.setActivity('The Void Community~', { type: ActivityType.Custom});
		client.guilds.cache.forEach(guild => {
			guilds.push(guild.name)
		});

		console.log(`Рандомные активности:`.bold + `\n`);
		for (e of randomActivity) {
			console.log(`${e[0]}`.magenta + ` - ${`${randomActivity.indexOf(e)}`.bold}`);
		};
		console.log();


		console.log(`Готово!`.bold +` `+`The Void`.bgCyan.black+` готов к работе, как `+`${client.user.tag}`.red.bold+`\n`);

		functionRandomActivity(client, randomActivity, randomNames, guilds);

		setInterval(() => {
			functionRandomActivity(client, randomActivity, randomNames, guilds);
        }, 60000);
	},
};