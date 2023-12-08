const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { joinVoiceChannel, getVoiceConnection, AudioPlayerStatus, createAudioResource, createAudioPlayer, NoSubscriberBehavior } = require('@discordjs/voice');
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
		.setName('sos')
		.setDescription('Сигнал сос !')
        .setNameLocalizations({ru:'сос',"en-US":'sos'})
        .setDescriptionLocalizations({ru:'Сигнал сос',"en-US":'Sos signal'}),
        async execute(interaction) {
                
            const musics = []

            const int = interaction;

            const user = int.user;
            const member = interaction.guild?.members.cache.get(user.id);
            const voice = member?.voice;

                const channel = interaction?.member.voice.channelId
                if (!channel) {
                    interaction.reply({content: 'Вы не находитесь в голосовом канале', ephemeral: true});
                } else {
                
        
            setTimeout(() => {
                const connection = joinVoiceChannel({
                    channelId: voice.channel.id,
                    guildId: voice.channel.guild.id,
                    adapterCreator: voice.channel.guild.voiceAdapterCreator,
                });
    
            player.play(createAudioResource(path.join(`../../../voidMusic/morse/sos.wav`)));
    
            connection.subscribe(player);
    
            player.on('error', error => {
                console.error('Error:', error.message, 'with track', error.resource.metadata.title);
            });
    
            player.on(AudioPlayerStatus.Idle, () => {
                player.stop()
                connection.disconnect();
            });
        }, 1000);

            await interaction.reply({
            content: `Воспроизводиться сигнал сос !`,
            ephemeral: true});
        }


	},
};