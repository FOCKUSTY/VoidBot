const { AudioPlayerStatus, NoSubscriberBehavior, createAudioPlayer, createAudioResource, joinVoiceChannel } = require("@discordjs/voice");
const { Events } = require("discord.js");
const { featureUsers } = require(`../whiteList`);
const path = require('path');
const botId = `1122199797449904179`;
let booleanVar = false;

module.exports = {
  name: Events.VoiceStateUpdate,
  async execute(oldVS, vs) {
    
    if (vs.member.id === botId) return;
    
    featureUsers.forEach(featureUser => {
      if(vs.member?.id===featureUser) {
          booleanVar = true;
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
    
        player.play(createAudioResource(path.join(__dirname, "../sounds/nea.mp3")));
    
        player.on('error', error => {
          console.error(error);
        });
    
        player.on(AudioPlayerStatus.Idle, () => {
          player.stop()
          connection.destroy()
        });
        
        const connection = joinVoiceChannel({
          channelId: vs.channel.id,
          guildId: vs.channel.guild.id,
          adapterCreator: vs.channel.guild.voiceAdapterCreator,
        });
    
        connection.subscribe(player);
        if (off === true) {
          if (player) player.stop()
          if (connection) connection.destroy()
        }
      }
    }

    if (oldVS.channelId === null) setTimeout(() => {connectionHelper(vs)}, 500); 
    else if (vs.channelId === null) setTimeout(() => {connectionHelper(oldVS, true)}, 500);
    else if (!(vs.channelId === oldVS.channelId)) {
      setTimeout(() => {
        connectionHelper(oldVS, true);
        connectionHelper(vs);
      }, 500);
    }
  }
};