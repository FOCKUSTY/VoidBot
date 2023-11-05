const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel, getVoiceConnection, AudioPlayerStatus, createAudioResource, createAudioPlayer, NoSubscriberBehavior } = require('@discordjs/voice');
const { developEmbed } = require(`../../developing`);
const path = require('path');
const fs = require('node:fs');
const { Random } = require("random-js");
const random = new Random();

const player = createAudioPlayer({
    behaviors: {
      noSubscriber: NoSubscriberBehavior.Pause,
    },
});

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
	.setName('voice')
	.setDescription('Присоединиться в голосовой канал !')
    .addSubcommand(subcommand =>
        subcommand
        .setName(`play`)
        .setDescription(`Проиграть музыку`)),
    async execute(interaction) {

        const musics = []

        const formatFiles = [".mpeg", ".mp3", ".mp4", ".opus"]
        const musicsPath = path.join(__dirname, '../../music');
        for (let i = 0; i < formatFiles.length; i++) {
            fs.readdirSync(musicsPath).filter(file => file.endsWith(formatFiles[i])).forEach(e => {
            musics.push(e);
        })}

        const music = random.integer(0, musics.length - 1);
        console.log(music)

        const int = interaction;

        const user = int.user;
        const member = interaction.guild?.members.cache.get(user.id);
        const voiceChannel = member?.voice.channel;

        const connection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: voiceChannel.guild.id,
            adapterCreator: voiceChannel.guild.voiceAdapterCreator,
        });

        player.play(createAudioResource(path.join(`${musicsPath}\\${musics[music]}`)));
              
        connection.subscribe(player);

        player.on('error', error => {
            console.error('Error:', error.message, 'with track', error.resource.metadata.title);
        });

        player.on(AudioPlayerStatus.Idle, () => {
            player.stop()
            connection.destroy()
          });

        console.log(`Сейчас играет: ${musics[music]}`)

        await int.reply({
            embeds: [developEmbed],
            ephemeral: true
        });
    }
};