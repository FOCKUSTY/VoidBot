const { Events, ActivityType } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {

		client.user.setPresence({ activities: [{ name: 'activity' }], status: 'idle' }); 
		client.user.setActivity('The Void Community~', { type: ActivityType.Custom})

		console.log(`Готово! The Void готов к работе, как ${client.user.tag}`);
	},
};