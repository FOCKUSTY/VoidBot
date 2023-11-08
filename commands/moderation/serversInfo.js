const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const clientGuilds = [];

    module.exports = {
        cooldown: 5,
        data: new SlashCommandBuilder()
		.setName('serversinfo')
		.setDescription('Все сервера !'),
        async execute(interaction) {
            
        const int = interaction;
        const client = int.client;
        
        if(int.user.id === `877154902244216852`) {
            
            await interaction.reply({
                content: `Сейчас будет!`,
                ephemeral: true});

        client.guilds.cache.forEach(guild => {
            var clientGuildId = guild.id;
            var clientGuildName = guild;
            var clientGuildOwner = guild.ownerId;
            clientGuilds.push(`\nId: "${clientGuildId}", name: "${clientGuildName}", owner: "<@${clientGuildOwner}>"`)
        });

        for(i = 0; i < clientGuilds.length; i += 100){
            const embedTwo = new EmbedBuilder()
                .setColor(0x161618)
                .setTitle('Информация о серверах')
                .setAuthor({ name: `Bottomless Hat`, iconURL: `https://cdn.discordapp.com/icons/1053295032762908782/c349d0ecbd2d23859aba5b0f7bbec1ae.png` })
                .setDescription(`\`\`\`${clientGuilds.slice(0 + i, 100 + i)}\`\`\``)
			client.channels.cache.get(`${int.channel.id}`).send({content: ``, embeds: [embedTwo], ephemeral: true});
		}} else {
            await int.reply({
                content: `У Вас нет прав`,
                ephemeral: true
            })
        }

	},
};