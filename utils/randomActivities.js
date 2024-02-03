const
  { skip, debug } = require('./developConsole'),
  { color, bold } = require('colors'),
  { shuffle } = require('./shuffle'),
  { ActivityType } = require('discord.js'),
  { getActivities, funcKristyAct } = require('./updateActivities'),
  { pseudoRandomNumber } = require('./pseudoRandom'),
  { copy } = require('./copyArray'),
  { checkNumber } = require('./stages'),
  { oneTimeFunction, OneTime } = require('./OneTimeFunction'),
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
  ];

let
  randomActivityHistory = [],
  randNum       = [],
  randNames     = [],
  randNumName   = [],
  randNumGuild  = [],
  guildTexts    = [];
  texts         = [];

let countOfFunctionActivate = 0;

let
  guildActivities =   getActivities('guildActivities'),
  namesActivities =   getActivities('namesActivities'),
  randomActivity  =   getActivities('randomActivity'),
  randomNames     =   getActivities('randomNames');

const setRandomnessActivity = (client, textActivity=false, log=true) => 
{
    try
    {
      if(!client||!client.user) return;
      
      const i = pseudoRandomNumber(0, randomActivity.length-1, 10, 2, randomActivityHistory, null, null, true, true, true);
      const randomAct = randomActivity[i][0];
      const randomActType = randomActivity[i][1];
      const numRandomActType = actType[randomActivity[i][1]?.type];

      if(log) debug(`Рандомная активность: ${`${i}`.magenta} из "${`${randomActivity.length}`.bgMagenta}"`);
      if(log) debug(`Активность изменена на: ${`${randomAct}`.magenta}, тип: "${`${numRandomActType}`.bgMagenta}"`);

      if(textActivity) return randomAct;

      client.user.setActivity(`${randomAct}`, randomActType);
    }
    catch (err)
    {
      debug([err, true]);
    }
};

const setRandomnessGuildActivity = (client, guilds, textActivity=false, log=true) =>
{
  try
  {
    if(!client||!client.user) return;

    let rGuild = pseudoRandomNumber(0, guilds.length-1, 3, 1, randNumGuild);
    const rGuildName = guilds[rGuild]?.name;

    funcGuildTexts(rGuildName);

    const randNum = pseudoRandomNumber(0, guildTexts.length-1, undefined, undefined, undefined, null, false, true, true);
    
    const text = guildTexts[randNum][0];
    const textAct = guildTexts[randNum][1];
    const textActType = guildTexts[randNum][2];
    
    if(log) debug(`Рандомный сервер: ${`${rGuildName}`.magenta} (${`${rGuild}`.magenta}) из "${[`${guilds.length}`.bgMagenta]}"`);
    if(log) debug(`Активность изменена на: ${`${text}`.magenta} тип: "${`${textActType}`.bgMagenta}"`);
    
    if(textActivity) return text;

    client.user.setActivity(`${text}`, textAct);
  }
  catch (err)
  {
    debug([err, true]);
  };
}

const setGuildsLengthActivity = (client, guilds, textActivity=false, log=true) =>
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
    
    if(log) debug(`Активность изменена на: ${`${text}`.magenta}, тип: ${`${actType[4]}`.bgMagenta}`);
    
    if(textActivity) return text;

    client.user.setActivity(`${text}`, actTypes.cust);
  }
  catch (err)
  {
    debug([err, true]);
  }
}

const setRandomnessNameActivity = (client, textActivity=false, log=true) =>
{
  try
  {
    if(!client||!client.user) return;
    let randomNumberName = pseudoRandomNumber(0, randomNames.length-1, 30, 20, randNumName);
    
    const rName = randomNames[randomNumberName];
    texts = nameTexts(rName, texts);
    const randomTextNumber = pseudoRandomNumber(0, texts.length-1, undefined, undefined, undefined, null, false, true, true);
    
    let text = texts[randomTextNumber];
  
    if(log)
    {
      debug(`Рандомное число: ${`${randomNumberName}`.magenta} из "${`${randomNames.length}`.bgMagenta}"`);
      debug(`Рандомное число: ${`${randomTextNumber}`.magenta} из "${`${texts.length}`.bgMagenta}"`);
      debug(`Рандомное текст: ${`${text}`.magenta}`);
      debug(`Активность изменена на: ${`${text}`.magenta}, тип: "${`${actType[4]}`.bgMagenta}"`);
    };

    if(textActivity) return text;

    client.user.setActivity(`${text}`, { type: ActivityType.Custom });
  }
  catch (err)
  {
    debug([err, true]);
  };
};

const functionRandomActivity = async (client, guilds, textActivity=false, log=true) =>
{

  try
  {
    if(countOfFunctionActivate>=10)
    {
      guildActivities = getActivities('guildActivities');
      namesActivities = getActivities('namesActivities');
      randomActivity  = getActivities('randomActivity');
      randomNames     = getActivities('randomNames');
      
      countOfFunctionActivate = 0;
    };
    
    countOfFunctionActivate+=1 
  }
  catch (err)
  {
    console.error(err);
  }

  try
  {
    if(!client||!client.user) return;
    
    funcKristyAct(client, log);
    
    let rNum = pseudoRandomNumber(0, 100, 10, 2, randNum);
    
    if(log) debug(`Рандомное число: ${`${rNum}`.magenta} из "${`${100}`.bgMagenta}"`);
    
    if (rNum>=15)
    {
      if(!textActivity)
      {
        if(rNum>=90)
        {
          let count = 0;
          const setActivity = async () =>
          {
            const userInformation = await getRandomUserInformation('userId-guildId-username-guildName')
            const guild = await client.guilds.fetch(`${userInformation[1]}`);
            const user = await guild.members.fetch(`${userInformation[0]}`);
            const activities = user?.presence?.activities
            
            count+=1;
            if(count<20) if(!activities[0]?.name || activities[0]?.name==='Custom Status') return setActivity();
            
            if(log)
            {
              debug(`Название гильдии: ${userInformation[3]}`);
              debug(`Имя пользователя: ${userInformation[2]}`);
              skip();
            };
    
            if(activities[0]?.name)
            {
              if(textActivity) return await activities[0]?.name;
              client.user.setActivity(`${activities[0]?.name}`);
              
              if(log)
              {
                debug(`Рандомная активность: ${activities[0]?.name}`);
                skip();
              }
            }
            else
            {
              if(textActivity) return await setRandomnessActivity(client, log);
              setRandomnessActivity(client, log);
            }
            count = 0;
          };
          setActivity();
        }
      }
      else
      {
        if(textActivity) return await setRandomnessActivity(client, textActivity, log);
        setRandomnessActivity(client, textActivity, log);
      }
    }
    else if (rNum<10)
    {
      if(rNum>=5)
      {
        if(textActivity) return await setGuildsLengthActivity(client, guilds, textActivity, log);
        setGuildsLengthActivity(client, guilds, textActivity, log);
      }
      else
      {
        if(textActivity) return await setRandomnessGuildActivity(client, guilds, textActivity, log);
        setRandomnessGuildActivity(client, guilds, textActivity, log);
      }
    }
    else
    {
      if(textActivity) return await setRandomnessNameActivity(client, textActivity, log);
      setRandomnessNameActivity(client, textActivity, log);
    }
    if(log) skip();
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