const { Events, ActivityType, ActivityFlags, ActivityPlatform, GatewayActivityButton } = require('discord.js');
const { Color, color, bold } = require(`colors`);
const { Tags } = require(`../developing`)
const { randomActivity, functionRandomActivity, randomNames, funcGuildTexts, nameTexts, historyRandom, funcKristyAct,
		shuffle, arrKristyAct } = require(`../developing`);
const guilds = [];
const tName = [];

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {

		Tags.sync();

		const gTextLength = funcGuildTexts(`Nothing`, `00000`, true)
		const nTextLength = nameTexts(`FOCKUSTY`, randomNames, tName, true)

		console.log(`Загружаю ${`${randomActivity.length}`.magenta} активность(и)(ей)`);
		console.log(`Загружаю ${`${randomNames.length}`.magenta} имен(имя)(имени)`);
		console.log(`Загружаю ${`${gTextLength}`.magenta} активность(и)(ей) серверов(а)(ых)`);
		console.log(`Загружаю ${`${nTextLength}`.magenta} активность(и)(ей) имен(и)`);
		console.log();

		client.user.setPresence({activities: [{ name: 'activity' }], status: 'idle'}); 
		client.user.setActivity('The Void Community~', {type: ActivityType.Playing});

		client.guilds.cache.forEach(guild => {
			guilds.push(guild)
		});

		console.log(`Рандомные активности:`.bold + `\n`);
		for (e of randomActivity) {
			console.log(`${e[0]}`.magenta + ` - ${`${randomActivity.indexOf(e)}`.bold}`);
		};

		console.log(`Успешно загружено ${`${randomActivity.length}`.magenta} активность(и)(ей)`);
		console.log(`Успешно загружено ${`${randomNames.length}`.magenta} имен(имя)(имени)`);
		console.log(`Успешно загружено ${`${gTextLength}`.magenta} активность(и)(ей) серверов(а)(ых)`);
		console.log(`Успешно загружено ${`${nTextLength}`.magenta} активность(и)(ей) имен(и)`);
		console.log(`Всего загружено: ${`${randomActivity.length+randomNames.length+gTextLength+nTextLength}`.magenta} разных(ые) активности(ей)`);
		console.log();

		console.log(`Готово!`.bold +` `+`The Void`.bgCyan.black+` готов к работе, как `+`${client.user.tag}`.red.bold+`\n`);

		functionRandomActivity(client, randomActivity, randomNames, guilds, funcGuildTexts, nameTexts, historyRandom, funcKristyAct, shuffle, arrKristyAct);

		setInterval(() => {
			functionRandomActivity(client, randomActivity, randomNames, guilds, funcGuildTexts, nameTexts, historyRandom, funcKristyAct, shuffle, arrKristyAct);
        }, 60000);
	},
};