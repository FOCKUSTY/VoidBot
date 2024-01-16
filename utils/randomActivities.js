const
  { skip, debug } = require('./developConsole'),
  { color, bold } = require('colors'),
  { shuffle } = require('./shuffle'),
  { ActivityType } = require('discord.js'),
  { getActivities } = require('./updateActivities'),
  { pseudoRandomNumber } = require('./pseudoRandom'),
  { copy } = require('./copyArray'),
  { checkNumber } = require('./stages'),
  
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
  
  arrKristyAct    =   getActivities('arrKristyAct'),
  randomActivity  =   getActivities('randomActivity'),
  guildActivities =   getActivities('guildActivities'),
  randomNames     =   getActivities('randomNames'),

  kristyId        =   '1164228812217790565';

let
  kristyAct = false,
  randomActivityHistory = [],
  randNum = [],
  randNumName = [],
  randNumGuild = [],
  guildTexts = [];

let texts;

const funcKristyAct = async (client) =>
{

    // const kristyUser = await guild.members?.fetch(`877154902244216852`);
    const guild = await client?.guilds?.fetch('1168636395246592081');
    const kristyUser = await guild?.members?.fetch(`${kristyId}`);
    const kristyStatus = kristyUser?.presence?.status;
    
    if(kristyStatus === ( undefined || null || 'offline' ))
    {
      console.log('Kristy не в сети');

      for (let el of arrKristyAct)
      {
        const index = randomActivity.indexOf(el);
        if(index < 0) continue;
        randomActivity.splice(index, 1);
      };

      kristyAct = false;
      return;
    };
  
    if(kristyAct) return;
  
    debug('Загружаю Kristy активности...'.bold)
    skip();
  
    debug('Все Kristy активности'.bold);
    skip();
  
    for (let el of arrKristyAct)
    {
      randomActivity.push(el);
      debug(`${el[0]}`.magenta + ` - ${`${arrKristyAct.indexOf(el)}`.bold}`);
    };
  
    debug(`\nУспешно загружено ${`${arrKristyAct.length}`.magenta} Kristy активность(и)(ей)`);
  
    shuffle(randomActivity);
    kristyAct = true;

};

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
        let rGuild = pseudoRandomNumber(0, guilds.length-1, 2, 1, randNumGuild)
      
        function check()
        {
            if(rGuild >= guilds.length)
            {
              rGuild-=1;
              check();
            };
        };
        check();
        
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
        texts = nameTexts(rName, texts, false);
        const randomTextNumber = pseudoRandomNumber(0, texts.length-1, undefined, undefined, undefined, null, false, true, true);
        
        let text = texts[randomTextNumber];
        
        debug(`Рандомное число: ${`${randomNumberName}`.magenta} из "${`${randomNames.length}`.bgMagenta}"`);
        debug(`Рандомное число: ${`${randomTextNumber}`.magenta} из "${`${texts.length}`.bgMagenta}"`);
        debug(`Рандомное текст: ${`${text}`.magenta}`);
        debug(`Активность изменена на: ${`${text}`.magenta}, тип: "${`${actType[4]}`.bgMagenta}"`);

        client.user.setActivity(`${text}`, {type: ActivityType.Custom});
    }
    catch (err)
    {
        debug([err, true]);
    };
};

const functionRandomActivity = (client, guilds) =>
{
    try
    {
        if(!client||!client.user) return;
        
        funcKristyAct(client)
        
        let rNum = pseudoRandomNumber(0, 100, 5, 4, randNum);
        shuffle(randomActivity);
        
        debug(`Рандомное число: ${`${rNum}`.magenta} из "${`${100}`.bgMagenta}"`);
        
        if(rNum>=15) setRandomnessActivity(client);
        else if(rNum<10)
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
        debug('Произошла ошибка при смене активности.')
        debug([err, true]);
        skip(2);
    }
};

const funcGuildTexts = (rGuildName) =>
{
  guildTexts.length = 0
  guildTexts = copy(guildActivities);
  
  for(let i in guildTexts) guildTexts[i][0] = guildTexts[i][0].replaceAll('rGuildName', `${rGuildName}`)
};

module.exports =
{
    setRandomnessActivity,
    setRandomnessGuildActivity,
    setGuildsLengthActivity,
    setRandomnessNameActivity,
    functionRandomActivity,
}