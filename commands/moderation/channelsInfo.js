const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { color, authorName, iconURL } = require(`../../developing.json`);
const userGuildChannelsId = [];

    module.exports = {
        cooldown: 5,
        data: new SlashCommandBuilder()
		.setName('channelsinfo')
		.setDescription('Все каналы'),
        async execute(interaction) {

        const int = interaction;
        const client = int.client;

        if(int.user.id === `877154902244216852`) {

        await interaction.reply({
            content: `Сейчас отправлю!`,
            ephemeral: true});

        client.channels.cache.forEach(TextChannel => {
            var TextChannelId = TextChannel.id;
            var TextChannelName = TextChannel.name;
            var TextChannelGuildId = TextChannel.guildId;
            var TextChannelGuild = TextChannel.guild;
            var TextChannelGuildOwner = TextChannel.guild.ownerId;
            userGuildChannelsId.push(
                `\n### ${TextChannelGuildId} - ${`${TextChannelGuild}`.slice(0,20)}\n- ${TextChannelId} - ${`${TextChannelName}`.slice(0,15)}\n - <@${TextChannelGuildOwner}>`
            )
        });

        for(i = 0; i < userGuildChannelsId.length; i += 35){
            const embedTwo = new EmbedBuilder()
                .setColor(Number(color))
                .setTitle('Информация с серверов')
                .setAuthor({ name: `${authorName}`, iconURL: `${iconURL}` })
                .setDescription(`${userGuildChannelsId.slice(0 + i, 35 + i)}`)
                .setTimestamp()
            await int.followUp({content: ``, embeds: [embedTwo], ephemeral: true})
        }} else {
            await int.reply({
                content: `У Вас нет прав`,
                ephemeral: true
            });
        }

	},
};