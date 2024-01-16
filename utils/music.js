let globalMusicPlaying = new Map(),
    music;

const setGMPlaying = async (arg, bool=false) =>
{
  if(globalMusicPlaying.size===0 && arg.guilds.cache) await arg.guilds.cache.forEach(guild => { globalMusicPlaying.set(guild, bool)})
  else globalMusicPlaying.set(arg, bool);
};

const getGMPlaying = (guildName) => { return globalMusicPlaying.get(guildName) };

const setMusic = (_music) => { music = _music };

const getMusic = () => { return music };

module.exports = {
    setGMPlaying,
    getGMPlaying,
    setMusic,
    getMusic
};