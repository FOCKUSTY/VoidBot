const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel, getVoiceConnection, AudioPlayerStatus, createAudioResource, createAudioPlayer, NoSubscriberBehavior } = require('@discordjs/voice');
const { developEmbed } = require(`../../developing`);
const path = require('path');
const fs = require('node:fs');
const { Random } = require("random-js");
const random = new Random();
const { colors } = require(`colors`)

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
    .setNameLocalizations({ru:'голосовой',"en-US":'voice'})
    .setDescriptionLocalizations({ru:'Присоединиться в голосовой канал',"en-US":'Join voice channel'})
    .addSubcommand(subcommand =>
        subcommand
        .setName(`play`)
        .setDescription(`Проиграть музыку`)
        .setNameLocalizations({ru:'возпроизвести',"en-US":'play'})
        .setDescriptionLocalizations({ru:'Проиграть музыку',"en-US":'Play music'}))
    .addSubcommand(subcommand =>
        subcommand
        .setName(`disconnect`)
        .setDescription(`Выйти из голосового канала`)
        .setNameLocalizations({ru:'отсоединиться',"en-US":'disconnect'})
        .setDescriptionLocalizations({ru:'Выйти из голосового канала',"en-US":'Exit voice channel'})),
    async execute(interaction) {

        const musics = []

        const formatFiles = [".mpeg", ".mp3", ".mp4", ".opus"]
        const musicsPath = path.join(__dirname, '../../../voidMusic/music');
        for (let i = 0; i < formatFiles.length; i++) {
            fs.readdirSync(musicsPath).filter(file => file.endsWith(formatFiles[i])).forEach(e => {
            musics.push(e);
        })}

        const music = random.integer(0, musics.length-1);

        const int = interaction;

        const user = int.user;
        const member = interaction.guild?.members.cache.get(user.id);
        const voice = member?.voice;

        if(int.options.getSubcommand()  === `disconnect`) {
            const connection = getVoiceConnection(voice.guild.id);
            if(connection===undefined) {
                await int.reply({content: `Нет подключения к голосовому каналу`, ephemeral: true})
            } else {
                player.on(AudioPlayerStatus.Idle, () => {player.stop()});
                connection.disconnect();
                await int.reply({content: `Успешно отключено от голосового канала`, ephemeral: true});
            };
        }

        else if(int.options.getSubcommand() === `play`) {
            const channel = interaction?.member.voice.channelId
            if (!channel) {
                interaction.reply({content: 'Вы не находитесь в голосовом канале', ephemeral: true});
            } else {
            

        console.log(`Сейчас играет: `+`${musics[music]}`.cyan+` (Индекс: `+`${music}`.red+`)`+`\n`)

        const connection = joinVoiceChannel({
            channelId: voice.channel.id,
            guildId: voice.channel.guild.id,
            adapterCreator: voice.channel.guild.voiceAdapterCreator,
        });


        player.play(createAudioResource(path.join(`${musicsPath}\\${musics[music]}`)));
        // player.play(createAudioResource(path.join(`../../sounds/nea.mp3`)));

        connection.subscribe(player);

        player.on('error', error => {
            console.error('Error:', error.message, 'with track', error.resource.metadata.title);
        });

        player.on(AudioPlayerStatus.Idle, () => {
            player.stop()
            connection.disconnect();
        });

        await int.reply({
            embeds: [developEmbed],
            ephemeral: true
        });
        }}
    }
};