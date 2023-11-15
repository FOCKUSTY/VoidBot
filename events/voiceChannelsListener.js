const { AudioPlayerStatus, NoSubscriberBehavior, getVoiceConnection, createAudioPlayer, createAudioResource, joinVoiceChannel } = require("@discordjs/voice");
const { Events } = require("discord.js");
const { featureUsers } = require(`../whiteList`);
const path = require('path');
const TheVoid = `1122199797449904179`;
const Kristy = `1164228812217790565`;
let booleanVar = false;
let user;

module.exports = {
  name: Events.VoiceStateUpdate,
  async execute(oldVS, vs) {
    
    if (vs.member.id===Kristy) return;
    booleanVar = false;
    if (vs.member.id===TheVoid) return;

    featureUsers.forEach(featureUser => {
      if(vs.member?.id===featureUser.id) {
          booleanVar = true;
          user = featureUser.name;
          return;
      }
    });

    if (booleanVar!=true) return;

    const connectionHelper = (vs, off) => {
      if (vs.guild.id && vs.channel?.id) {
        const player = createAudioPlayer({
          behaviors: {
            noSubscriber: NoSubscriberBehavior.Pause,
          },
        });

        const con = getVoiceConnection(vs.guild.id);
        if(con===undefined) {
        } else {
            player.on(AudioPlayerStatus.Idle, () => {
              if (vs.member.id===TheVoid) return;
              console.log(`Отключаюсь от голосового канала ` + `${vs?.channel.name}`.cyan + `...\n`);
              player.stop()
              con.destroy();
              return;
            });
        };
    
        player.play(createAudioResource(path.join(__dirname, "../sounds/nea.mp3")));
    
        player.on('error', error => {
          console.error(error);
        });
    
        player.on(AudioPlayerStatus.Idle, () => {
          console.log(`Отключаюсь от голосового канала ` + `${vs?.channel.name}`.cyan + `...\n`);
          player.stop();
          connection.destroy();
        });
        
        const connection = joinVoiceChannel({
          channelId: vs.channel.id,
          guildId: vs.channel.guild.id,
          adapterCreator: vs.channel.guild.voiceAdapterCreator,
        });

        if(booleanVar!=false){
          console.log(`Присоединяюсь к голосовому каналу...\nПользователь: `+`${user}`.cyan);
          booleanVar=false
        }

        connection.subscribe(player);
        if (off === true) {
          if (player) player.stop()
          if (connection) connection.destroy()
        }
      }
    }

    if (oldVS.channelId === null) setTimeout(() => {connectionHelper(vs)}, 1000); 
    else if (vs.channelId === null) setTimeout(() => {connectionHelper(oldVS, true)}, 1000);
    else if (!(vs.channelId === oldVS.channelId)) {
      setTimeout(() => {
        connectionHelper(oldVS, true);
        connectionHelper(vs);
      }, 1000);
    }
  }
};