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
    { setGMPlaying, getGMPlaying } = require('../../utils/music'),

    path = require('path'),
    fs = require('node:fs'),

    player = createAudioPlayer({
        behaviors:
        {
            noSubscriber: NoSubscriberBehavior.Pause,
        },
    }),
    
    musicHistory = [],
    queue = [];

let
    con,
    functionPlay,
    guildName;

function setPlay(func) { functionPlay = func };
function getPlay() { return functionPlay };

function setConnection(connection) { con = connection };
function getConnection() { return con };

function setName(int) { guildName = int.guild.name }
function getName() { return guildName }

player.on('error', error => { console.error( 'Error:', error.message, 'with track', error.resource.metadata.title ) });
player.on(AudioPlayerStatus.Idle, () =>
{
    player.stop();
    if(queue.length>1)
    {
        queue.shift();
        getPlay()();
    }
    else
    {
        getConnection().disconnect();
        setGMPlaying(`${getName()}`, false);
    }
/*     player.stop();
    if(isRepeat && !!(repeatCount>count)) play();
    else
    {
        count = 0;
        setGMPlaying(`${int.guild.name}`, false);
    }; */
});

module.exports =
{
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
    async execute(interaction)
    {

        const formatFiles = [".mpeg", ".mp3", ".mp4", ".opus", '.weba', '.m4a'];
        const musicsPath = path.join(__dirname, '../../../voidMusic/music');
        const developEmbed = getDevelop('developEmbed');
        const musics = [];            
        const int = interaction;
        const user = int.user;
        const member = interaction.guild?.members.cache.get(user.id);
        const subcommand = int.options.getSubcommand();
        const voice = member?.voice;

        let count = 0;

        function check()
        {
            musics.length = 0;
            for (let i = 0; i < formatFiles.length; i++)
            {
                fs.readdirSync(musicsPath).filter(file => file.endsWith(formatFiles[i])).forEach(e =>
                {
                    musics.push(e);
                });
            };
        };
        check();

        if(subcommand==='play')
        {
            if(getGMPlaying(`${interaction.guild.name}`)) return await interaction.reply({ content:'Музыка уже воспроизводится на этом сервере', ephemeral: true });
            
            const isRepeat = int.options.getBoolean('repeat') || false;
            const repeatCount = int.options.getInteger('count-repeat') || 1;
            const channel = interaction?.member.voice.channelId;
            setName(int);

            if(isRepeat && repeatCount!=1) for (let i = 0; i<repeatCount; i++) queue.push(pseudoRandomNumber(0, musics.length-1, 8, 1, musicHistory, null, null, true, true, true))

            if (!channel) return await interaction.reply( { content: 'Вы не находитесь в голосовом канале', ephemeral: true } );

            await int.reply({ embeds: [ developEmbed ], ephemeral: true });

            const connection = joinVoiceChannel({
                channelId: voice.channel.id,
                guildId: voice.channel.guild.id,
                adapterCreator: voice.channel.guild.voiceAdapterCreator,
            });

            setGMPlaying(`${int.guild.name}`, true);

            function play()
            {
                if( !( count % 5 ) ) check();
                count+=1;
                
                console.log(`Сейчас играет: `+`${musics[queue[0]]}`.cyan+` (Индекс: `+`${queue[0]} из ${musics.length}`.red+`)\nНа сервере ${int.guild.name}\n`);
                player.play(createAudioResource(path.join(`${musicsPath}\\${musics[queue[0]]}`)));
                // player.play(createAudioResource(path.join(`../../../VoidMusic/sounds/nea.mp3`)));

                connection.subscribe(player);
            };

            setConnection(connection);
            setPlay(play);

            play();
        }
        else
        {
            const connection = getVoiceConnection(voice.guild.id);
            
            if(connection===undefined) await int.reply({content: `Нет подключения к голосовому каналу`, ephemeral: true})
            
            else
            {
                player.stop();
                connection.disconnect();
                setGMPlaying(`${int.guild.name}`, false);
                await int.reply({ content: `Успешно отключено от голосового канала`, ephemeral: true });
            };
        }
    }
}

/* module.exports =
{
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
            musics = [];
            
        const
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
                    player.stop();
                    connection.disconnect();
                    setGMPlaying(`${int.guild.name}`, false);
                    await int.reply({ content: `Успешно отключено от голосового канала`, ephemeral: true });
            };
        }

        else if(int.options.getSubcommand() === `play`)
        {

            if(getGMPlaying(`${interaction.guild.name}`)) return await interaction.reply({ content:'Музыка уже воспроизводится на этом сервере', ephemeral: true });

            const
                repeat = int.options.getBoolean('repeat'),
                repeatCount = int.options.getInteger('count-repeat'),
                channel = interaction?.member.voice.channelId;

            if (!channel) interaction.reply({ content: 'Вы не находитесь в голосовом канале', ephemeral: true });
            
            else
            {

                const connection = joinVoiceChannel({
                    channelId: voice.channel.id,
                    guildId: voice.channel.guild.id,
                    adapterCreator: voice.channel.guild.voiceAdapterCreator,
                });
                
                let count = 0;
                
                player.on('error', error => { console.error( 'Error:', error.message, 'with track', error.resource.metadata.title ) });
                player.on(AudioPlayerStatus.Idle, () =>
                {
                    player.stop();
                    if(repeat && !!(repeatCount>count)) play();
                    else
                    {
                        connection.disconnect();
                        setGMPlaying(`${int.guild.name}`, false);
                    };
                });

                const play = () =>
                {

                   if( count===0 || !( count % 5 ) ) check();
                   
                   setGMPlaying(`${int.guild.name}`, true);
                   count+=1;

                   const music = pseudoRandomNumber(0, musics.length-1, 8, 1, musicHistory, null, null, true, true, true);
                   
                   console.log(`Сейчас играет: `+`${musics[music]}`.cyan+` (Индекс: `+`${music} из ${musics.length}`.red+`)\nНа сервере ${int.guild.name}\n`);
                   // player.play(createAudioResource(path.join(`${musicsPath}\\${musics[music]}`)));
                   player.play(createAudioResource(path.join(`../../../VoidMusic/sounds/nea.mp3`)));

                   connection.subscribe(player);
    
                };
                    
                await int.reply({ embeds: [ developEmbed ], ephemeral: true });
                
                play();
                
            }
        }
    }
}; */