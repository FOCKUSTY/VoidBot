const { Events, ActivityType, ActivityFlags, ActivityPlatform, GatewayActivityButton } = require('discord.js');
const { Color, color, bold } = require(`colors`);
const {
	randomActivity, functionRandomActivity,
	actLengths, actLength, downloadActivities,
	pseudoRandomNumber, setDevelop, Tags, download, getDevelop, calcNewYear
} = require(`../developing`);
const guilds = [];
/* const history = [];
const historyMany = []; */

let actDownload = 0;

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {

		Tags.sync();
		setDevelop(client)
		client.user.setPresence({activities: [{ name: 'The Void' }], status: 'idle'}); 
		client.user.setActivity('The Void Community~', {type: ActivityType.Playing});
		client.guilds.cache.forEach(guild => {
			guilds.push(guild)
		});
		let BottomlessHatGuild = await client.guilds.cache.get('1053295032762908782');
		BottomlessHatGuild.setName(`Bottomless Hat - ${calcNewYear()} !`)

/* 		for(let i = 0; i < 300; i++) {
			console.log(`${i} - 0`, pseudoRandomNumber(0, 100, 3, 2, history));
			console.log();
			console.log(`${i} - 1`, pseudoRandomNumber(5123, 62632, 10, 10, historyMany));
		} */


		setTimeout(() => { downloadActivities();
			console.log(`Рандомные активности:`.bold + `\n`);
			for (e of randomActivity) {
				console.log(`${e[0]}`.magenta + ` - ${`${randomActivity.indexOf(e)}`.bold}`);
			};
			console.log()

			console.log(`Всего ${`${actLength()}`.magenta} Активность(и)(ей)`);
			actDownload+=actLength();
			for(el of actLengths) {
				console.log(`Всего ${`${el[0]}`.magenta} ${el[1]}`);
				actDownload += Number(el[0]);
			};

			console.log(`Всего загружено: ${`${actDownload}`.magenta} разных(ые) активности(ей)`);
			console.log();
	
			console.log(`Готово!`.bold +` `+`The Void`.bgCyan.black+` готов к работе, как `+`${client.user.tag}`.red.bold+`\n`);
	
			functionRandomActivity(client, guilds);

			setInterval(async () => {
				BottomlessHatGuild.setName(`Bottomless Hat - ${calcNewYear()} !`)
			}, 148000);

			setInterval(() => {
				functionRandomActivity(client, guilds);
			}, 60000);
		}, 5000);

	},
};