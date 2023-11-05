const { AudioPlayerStatus, NoSubscriberBehavior, createAudioPlayer, createAudioResource, joinVoiceChannel } = require("@discordjs/voice");
const { Events } = require("discord.js");
const path = require('path');

const authorBotId = `877154902244216852`;

module.exports = {
  name: Events.VoiceStateUpdate,
  async execute(oldVS, vs) {
    if (vs.member?.id != authorBotId) return;

    if (oldVS.channelId === null) connectionHelper(vs)
    else if (vs.channelId === null) connectionHelper(oldVS, true)
    else if (!(vs.channelId === oldVS.channelId)) {
      connectionHelper(oldVS, true);
      connectionHelper(vs);
      
    }
  }
};

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