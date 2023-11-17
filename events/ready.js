const { Events, ActivityType } = require('discord.js');
const { Color, color, bold } = require(`colors`);
const { Tags } = require(`../developing`)
const { randomActivity, functionRandomActivity, randomNames, funcGuildTexts, nameTexts } = require(`../developing`);
const guilds = [];

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {

		Tags.sync();
		console.log(`Загружаю ${`${randomActivity.length}`.magenta} активность(и)(ей)\n`)

		client.user.setPresence({activities: [{ name: 'activity' }], status: 'idle'}); 
		client.user.setActivity('The Void Community~', {type: ActivityType.Playing});
		client.guilds.cache.forEach(guild => {
			guilds.push(guild.name)
		});

		console.log(`Рандомные активности:`.bold + `\n`);
		for (e of randomActivity) {
			console.log(`${e[0]}`.magenta + ` - ${`${randomActivity.indexOf(e)}`.bold}`);
		};
		console.log(`Успешно загружено ${`${randomActivity.length}`.magenta} активность(и)(ей)\n`)

		console.log(`Готово!`.bold +` `+`The Void`.bgCyan.black+` готов к работе, как `+`${client.user.tag}`.red.bold+`\n`);

		functionRandomActivity(client, randomActivity, randomNames, guilds, funcGuildTexts, nameTexts );

		setInterval(() => {
			functionRandomActivity(client, randomActivity, randomNames, guilds, funcGuildTexts, nameTexts);
        }, 60000);
	},
};