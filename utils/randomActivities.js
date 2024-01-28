const
  { skip, debug } = require('./developConsole'),
  { color, bold } = require('colors'),
  { shuffle } = require('./shuffle'),
  { ActivityType } = require('discord.js'),
  { getActivities, funcKristyAct } = require('./updateActivities'),
  { pseudoRandomNumber } = require('./pseudoRandom'),
  { copy } = require('./copyArray'),
  { checkNumber } = require('./stages'),
  { oneTimeFunction, OnTime } = require('./OnTimeFunction'),
  { User, getUser, getUsers, setUser, setUsernames, getRandomUserInformation } = require('./user'),

  actTypes =
  {
    play:   {   type: ActivityType.Playing    },
    stream: {   type: ActivityType.Streaming  },
    listen: {   type: ActivityType.Listening  },
    watch:  {   type: ActivityType.Watching   },
    cust:   {   type: ActivityType.Custom     },
    comp:   {   type: ActivityType.Competing  },
  },
  
  actType =
  [
    `Играет`,
    `Стримит`,
    `Слушает`,
    `Смотрит`,
    `Кастомный`,
    `Соревнуется`
  ],
  
  guildActivities =   getActivities('guildActivities'),
  namesActivities =   getActivities('namesActivities'),
  randomActivity  =   getActivities('randomActivity'),
  randomNames     =   getActivities('randomNames');

let
  randomActivityHistory = [],
  randNum       = [],
  randNames     = [],
  randNumName   = [],
  randNumGuild  = [],
  guildTexts    = [];
  texts         = [];

const usernames = new OnTime(false, 'usernames');

const setRandomnessActivity = (client) => 
{
    try
    {
      if(!client||!client.user) return;
      const i = pseudoRandomNumber(0, randomActivity.length-1, 3, 2, randomActivityHistory, null, null, true, true, true);
      const randomAct = randomActivity[i][0];
      const randomActType = randomActivity[i][1];
      const numRandomActType = actType[randomActivity[i][1]?.type];

      client.user.setActivity(`${randomAct}`, randomActType);

      debug(`Рандомная активность: ${`${i}`.magenta} из "${`${randomActivity.length}`.bgMagenta}"`);
      debug(`Активность изменена на: ${`${randomAct}`.magenta}, тип: "${`${numRandomActType}`.bgMagenta}"`);
    }
    catch (err)
    {
      debug([err, true]);
    }
};

const setRandomnessGuildActivity = (client, guilds) =>
{
  try
  {
    if(!client||!client.user) return;

    let rGuild = pseudoRandomNumber(0, guilds.length-1, 2, 1, randNumGuild);
    const rGuildName = guilds[rGuild]?.name;

    funcGuildTexts(rGuildName);

    const randNum = pseudoRandomNumber(0, guildTexts.length-1, undefined, undefined, undefined, null, false, true, true);
    
    const text = guildTexts[randNum][0];
    const textAct = guildTexts[randNum][1];
    const textActType = guildTexts[randNum][2];
    client.user.setActivity(`${text}`, textAct);
    
    debug(`Рандомный сервер: ${`${rGuildName}`.magenta} (${`${rGuild}`.magenta}) из "${[`${guilds.length}`.bgMagenta]}"`);
    debug(`Активность изменена на: ${`${text}`.magenta} тип: "${`${textActType}`.bgMagenta}"`);
  }
  catch (err)
  {
    debug([err, true]);
  };
}

const setGuildsLengthActivity = (client, guilds) =>
{
  try
  {
    if(!client||!client.user) return;
    let text = `Я уже на ${guilds.length}`
    
    const stages =
    {
      one: ['сервере', 'серверах', 'серверах']
    };
    
    text = `${text} ${ checkNumber(guilds.length, stages) }`;
    debug(`Активность изменена на: ${`${text}`.magenta}, тип: ${`${actType[4]}`.bgMagenta}`);
    client.user.setActivity(`${text}`, actTypes.cust);
  }
  catch (err)
  {
    debug([err, true]);
  }
}

const setRandomnessNameActivity = (client) =>
{
  try
  {
    if(!client||!client.user) return;
    let randomNumberName = pseudoRandomNumber(0, randomNames.length-1, 10, 20, randNumName);
    
    const rName = randomNames[randomNumberName];
    texts = nameTexts(rName, texts);
    const randomTextNumber = pseudoRandomNumber(0, texts.length-1, undefined, undefined, undefined, null, false, true, true);
    
    let text = texts[randomTextNumber];
    
    debug(`Рандомное число: ${`${randomNumberName}`.magenta} из "${`${randomNames.length}`.bgMagenta}"`);
    debug(`Рандомное число: ${`${randomTextNumber}`.magenta} из "${`${texts.length}`.bgMagenta}"`);
    debug(`Рандомное текст: ${`${text}`.magenta}`);
    debug(`Активность изменена на: ${`${text}`.magenta}, тип: "${`${actType[4]}`.bgMagenta}"`);
    client.user.setActivity(`${text}`, { type: ActivityType.Custom });
  }
  catch (err)
  {
    debug([err, true]);
  };
};

const functionRandomActivity = async (client, guilds) =>
{
  try
  {

    /* 
      const fock = new User('877154902244216852', 'fockusty', 'FOCKUSTY', '868794603409637376');
      fock.setUser(client);
      const log = fock.getUser();
      // await console.log(log); // Promise { <pending> }
      // await log.then( async (value) => await console.log(value)); // undefined
      // log.then(()=>{ console.log('ok!')}).catch(()=>{console.log('bad')}) // ok!
      // setTimeout(() => { console.log(log) }, (50000)); // Promise { <undefined> }
      // console.log(log); // Promise { <pending> }
      // log.then(function(user) { console.log(user) }) // undefined
      // log.then((res, rej) => console.log(res, rej)); // undefined
      // log.finally(onFinally => console.log(onFinally)); // undefined
      // Promise.resolve(log).then((res, rej) => console.log(res, rej)); // undefined
    */

    /*
      setUser(client, '1053295032762908782', '877154902244216852', 'fockusty');
      const users = getUsers();
      console.log(users); // Promise { <pending> }
    */
    if(!client||!client.user) return;

    if(!usernames.boolean) setUsernames(client);
    usernames.oneTimeFunction(true);
    
    funcKristyAct(client);
    
    let rNum = pseudoRandomNumber(0, 100, 5, 4, randNum);
    shuffle(randomActivity);
    
    debug(`Рандомное число: ${`${rNum}`.magenta} из "${`${100}`.bgMagenta}"`);
    
    if (rNum>=15)
    {
      if(rNum>=90)
      {
        const userInformation = getRandomUserInformation('userId-GuildId-Username-GuildName')
        const guild = await client.guilds.fetch(`${userInformation[1]}`);
        const user = await guild.members.fetch(`${userInformation[0]}`);
        
        console.log(`Название гильдии: ${userInformation[3]}`);
        console.log(`Имя пользователя: ${userInformation[2]}`);

        client.user.setPresence({ activities: user?.presence?.activities || setRandomnessActivity(client) });
        console.log(`Рандомная активность: ${user?.presence?.activities||'Активности нет'}`);
      }

      else setRandomnessActivity(client);
    }
    else if (rNum<10)
    {
      if(rNum>=5) setGuildsLengthActivity(client, guilds)
      else setRandomnessGuildActivity(client, guilds);
    }
    else setRandomnessNameActivity(client);
    skip();
  }
  catch (err)
  {
    skip(2);
    debug( 'Произошла ошибка при смене активности.' );
    client.user.setActivity( 'Произошла ошибка при смене активности.' );
    debug([err, true]);
    skip(2);
  };
};

const funcGuildTexts = (guildName) =>
{
  guildTexts.length = 0
  guildTexts = copy(guildActivities);
  
  for(let i in guildTexts) guildTexts[i][0] = guildTexts[i][0].replaceAll('rGuildName', `${guildName}`)
};

const nameTexts = ( rName, arr, bool=false ) =>
{
  arr.length = 0;
  arr = copy(namesActivities);
  
  const r = pseudoRandomNumber(0, randomNames.length-1, 10, 10, randNames, null, true, true, true);
  const rNameTwo = randomNames[r];
  for (let i in arr) arr[i] = arr[i].replace('${rName}', `${rName}`).replace('${rNameTwo}', `${rNameTwo}`);
  
  if(bool) return arr.length;
  else return arr;
};

module.exports =
{
  setRandomnessActivity,
  setRandomnessGuildActivity,
  setGuildsLengthActivity,
  setRandomnessNameActivity,
  functionRandomActivity,
}