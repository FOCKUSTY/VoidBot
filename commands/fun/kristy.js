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
		.setName('kristy')
		.setDescription('Кристи команда !')
        .setNameLocalizations({ru:'кристи',"en-US":'kristy'})
        .setDescriptionLocalizations({ru:'Кристи команда',"en-US":'Kristy command'})
        .addSubcommand(s=>s.setName('voice').setDescription('Воспроизведет звук')
        .setNameLocalizations({ru:'голос',"en-US":'voice'}).setDescriptionLocalizations({ru:'Воспроизведет звук',"en-US":'Play sound'})),
        async execute(interaction) {
        
        const subcommand = interaction.options.getSubcommand()
        
        if(subcommand==='voice') {
    
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
    
            player.play(createAudioResource(path.join(`../../../voidMusic/morse/kristyLove.wav`)));
    
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
            content: `Воспроизводиться код морзе !`,
            ephemeral: true});
        }}


	},
};