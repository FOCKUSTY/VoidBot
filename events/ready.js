const { Events, ActivityType } = require('discord.js');
const { colors } = require(`colors`)
const { randomActivity, functionRandomActivity } = require(`../developing`)
const guilds = []

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		client.user.setPresence({ activities: [{ name: 'activity' }], status: 'idle' }); 
		client.user.setActivity('The Void Community~', { type: ActivityType.Custom});
		client.guilds.cache.forEach(guild => {
			guilds.push(guild.name)
		});

		functionRandomActivity(client, randomActivity, guilds);

		setInterval(() => {
			functionRandomActivity(client, randomActivity, guilds)
        }, 60000);

		console.log(`Готово! `+`The Void`.bgCyan.black+` готов к работе, как `+`${client.user.tag}`.red.bold+``);
	},
};