const
    { SlashCommandBuilder } = require('discord.js'),
    {
        joinVoiceChannel,
        getVoiceConnection,
        AudioPlayerStatus,
        createAudioResource,
        createAudioPlayer,
        NoSubscriberBehavior
    } = require('@discordjs/voice'),
    
    { pseudoRandomNumber } = require('../../utils/pseudoRandom'),
    { getDevelop } = require('../../utils/develop'),
    { setGMPlaying } = require('../../utils/music'),

    path = require('path'),
    fs = require('node:fs'),

    musicHistory = [],

    player = createAudioPlayer({
        behaviors:
        {
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
    .addSubcommand(s =>s.setName(`play`).setDescription(`Проиграть музыку`)
        .setNameLocalizations({ru:'возпроизвести',"en-US":'play'}).setDescriptionLocalizations({ru:'Проиграть музыку',"en-US":'Play music'})
        
        // .addStringOption(o=>o.setName('link').setDescription('Ссылка на музыку')
        //     .setNameLocalizations({ru:'ссылка',"en-US":'link'}).setDescriptionLocalizations({ru:'Ссылка на музыку',"en-US":'Link to music'}))

        .addBooleanOption(o=>o.setName('repeat').setDescription('Повторять ?')
            .setNameLocalizations({ru:'повторение',"en-US":'repeat'}).setDescriptionLocalizations({ru:'Повторять ?',"en-US":"Repeat ?"}))
        
        .addIntegerOption(o=>o.setName('count-repeat').setDescription('Количество повторений')
            .setNameLocalizations({ru:'кол-во-повторений'}).setDescriptionLocalizations({ru:'Количество повторений',"en-US":'Repeat count'})))
    .addSubcommand(s =>s.setName(`disconnect`).setDescription(`Выйти из голосового канала`)
        .setNameLocalizations({ru:'отсоединиться',"en-US":'disconnect'}).setDescriptionLocalizations({ru:'Выйти из голосового канала',"en-US":'Exit voice channel'})),
    async execute(interaction) {

        const
            formatFiles = [".mpeg", ".mp3", ".mp4", ".opus", '.weba', '.m4a'],
            musicsPath = path.join(__dirname, '../../../voidMusic/music'),
            developEmbed = getDevelop('developEmbed'),
            musics = [],
            
            int = interaction,
            user = int.user,
            member = interaction.guild?.members.cache.get(user.id),
            voice = member?.voice;

        function check()
        {
            musics.length = 0;
            for (let i = 0; i < formatFiles.length; i++)
            {
                fs.readdirSync(musicsPath).filter(file => file.endsWith(formatFiles[i])).forEach(e => {
                musics.push(e);
            })};
        };
        
        if(int.options.getSubcommand()  === `disconnect`)
        {
            const connection = getVoiceConnection(voice.guild.id);
            if(connection===undefined) await int.reply({content: `Нет подключения к голосовому каналу`, ephemeral: true})
            else
            {
                player.on(AudioPlayerStatus.Idle, () => {player.stop()});
                connection.disconnect();
                await int.reply({ content: `Успешно отключено от голосового канала`, ephemeral: true });
            };
        }

        else if(int.options.getSubcommand() === `play`)
        {
            const repeat = int.options.getBoolean('repeat');
            const repeatCount = int.options.getInteger('count-repeat');
            const channel = interaction?.member.voice.channelId;
            // const link = int.options.getString('link');

            if (!channel) interaction.reply({ content: 'Вы не находитесь в голосовом канале', ephemeral: true });
            else {

                const connection = joinVoiceChannel({
                    channelId: voice.channel.id,
                    guildId: voice.channel.guild.id,
                    adapterCreator: voice.channel.guild.voiceAdapterCreator,
                });
                let count = 0;
                
                    const play = () => {

                        if(count===0 || !(count%5)) check();
                        
                        setGMPlaying(`${int.guild.name}`, true);
                        count+=1;

                        const music = pseudoRandomNumber(0, musics.length-1, 4, 3, musicHistory, null, null, true, true, true);
                        console.log(`Сейчас играет: `+`${musics[music]}`.cyan+` (Индекс: `+`${music} из ${musics.length}`.red+`)\nНа сервере ${int.guild.name}\n`);
                        player.play(createAudioResource(path.join(`${musicsPath}\\${musics[music]}`)));
                        // player.play(createAudioResource(path.join(`../../../VoidMusic/sounds/nea.mp3`)));
        
                        connection.subscribe(player);
    
                    };
    
                    player.on('error', error => { console.error('Error:', error.message, 'with track', error.resource.metadata.title) });
    
                    player.on(AudioPlayerStatus.Idle, () => {
                        player.stop();
                        if(repeat && repeatCount>count) play()
                        else 
                        {
                            connection.disconnect();
                            setGMPlaying(`${int.guild.name}`, false);
                        }
                    });
    
                    play();
                    await int.reply({ embeds: [developEmbed],ephemeral: true });
        }}
    }
};