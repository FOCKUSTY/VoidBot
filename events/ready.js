const { Events, ActivityType } = require('discord.js');
const { colors, bgCyan } = require(`colors`);

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {

		client.user.setPresence({ activities: [{ name: 'activity' }], status: 'idle' }); 
		client.user.setActivity('The Void Community~', { type: ActivityType.Custom})

		console.log(`Готово! `+`The Void`.bgCyan.black+` готов к работе, как `+`${client.user.tag}`.red.bold+``);
	},
};