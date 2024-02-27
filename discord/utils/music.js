let
  globalMusicPlaying = new Map(),
  localMusic;

const setGMPlaying = async (arg, boolean=false) =>
{
  if(globalMusicPlaying.size===0 && arg.guilds.cache) await arg.guilds.cache.forEach(guild =>
    {
      globalMusicPlaying.set(guild, boolean);
    })
  else globalMusicPlaying.set(arg, boolean);
};

const getGMPlaying = (guildName) =>
{
  return globalMusicPlaying.get(guildName)
};

const setMusic = (music) =>
{
  localMusic = music
};

const getMusic = () =>
{
  return localMusic
};

module.exports =
{
  setGMPlaying,
  getGMPlaying,
  setMusic,
  getMusic
};