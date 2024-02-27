const
    fs = require('node:fs'),
    { ActivityType } = require('discord.js'),
    { color } = require('colors'),

    {
        jsonActivities,
        jsonGuildActivities,
        jsonJokes,
        jsonDownload,
        jsonRandomNameActivities,
        jsonNames,
        jsonObjectIdeas,
        jsonKristyActivities,
        jsonBotVersion
    } = require('../../../VoidDataBase/data.json'),
    
    jsonExceptions = require('../../../VoidDataBase/exceptions.json'),

    { replies } = require('../../../VoidDataBase/replyesActivity.json'),

    { version } = require('../package.json'),
    { debug, skip } = require('./developConsole'),
    { shuffle } = require('./shuffle'),
    { oneTimeFunction, OneTime} = require('./OneTimeFunction'),

    {
        kristyGuildId,
        kristyId,
    } = require('../../config.json');



let
    arrKristyAct = jsonKristyActivities,
    download = jsonDownload,
    guildActivities = jsonGuildActivities,
    jokes = jsonJokes,
    namesActivities = jsonRandomNameActivities,
    objectIdeas = jsonObjectIdeas,
    randomActivities = jsonActivities,
    randomNames = jsonNames,
    botVersion = jsonBotVersion;





let kristyAct = new OneTime(false, 'kristyAct');





const THEVOIDSARRAY =
    [
        [   'девушка',      'THEVOIDSBOT_REVERSE_GENDER'  ],
        [   'The Void',     'THEVOIDSBOT_NREVERSE'        ],
        [   'The Abyssia',  'THEVOIDSBOT_REVERSE'         ],
        [   'Kristy',       'THEVOIDSBOT_LOVE'            ],
        [   'The Void',     'THEVOIDSBOT_REVERSE_LOVE'    ],
        [   'Kristy',       'THEVOID_LOVE'                ],
        [   'Меня',         'THEVOID'                     ],
        [   '',             'typend_A'                    ],
        [   'ым',           'typend_B'                    ],
    ],

    randomActivity = [],

    dataVars =
    [
        [   'arrKristyAct',         'jsonKristyActivities'      ],
        [   'download',             'jsonDownload'              ],
        [   'guildActivities',      'jsonGuildActivities'       ],
        [   'randomActivities',     'jsonActivities'            ],
        [   'jokes',                'jsonJokes'                 ],
        [   'objectIdeas',          'jsonObjectIdeas'           ],
        [   'namesActivities',      'jsonRandomNameActivities'  ],
        [   'randomNames',          'jsonNames'                 ],
        [   'botVersion',           'jsonBotVersion'            ],
    ],

    exceptions = new Map()
        .set('loveActivity',             false)
        .set("fockActivity",             false)
        .set("devActivity",              false)
        .set("sayActivity",              false)
        .set("watchActivity",            false)
        .set("listenActivity",           false)
        .set("playActivity",             false)
        .set("custActivity",             false)
        .set("oWordActivity",            false)
        .set("dateActivity",             false)
        .set("questionActivity",         false)
        .set("infoOfTheVoid",            false)
        .set("cmdCommands",              false)
        .set("englishActivities",        false)
        .set("valentinActivity",         true)
        .set("jsonKristyActivities",     false)
        .set("jsonGuildActivities",      false)
        .set("jsonRandomNameActivities", false),

    dataFiles =
    [
        arrKristyAct,
        download,
        guildActivities,
        jokes,
        namesActivities,
        objectIdeas,
        randomActivities,
        randomNames,
        botVersion
    ],

    jsonFiles =
    [
        jsonKristyActivities,
        jsonDownload,
        jsonGuildActivities,
        jsonJokes,
        jsonRandomNameActivities,
        jsonObjectIdeas,
        jsonActivities,
        jsonNames,
        jsonBotVersion
    ],

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



const downloadActivities = () =>
{
    let exceptionsReaded;
    const file = ( fs.readFileSync( '../../../VoidDataBase/exceptions.json', { encoding: 'utf8' } ) );
    JSON.stringify(file, (key, value) => { exceptionsReaded = eval(` ${exceptionsReaded} = ${value} `) } );

    for(let i=0; i<jsonFiles.length-1;i++)
    {
        if(jsonFiles[i]===dataFiles[i]) dataFiles[i] = jsonFiles[i];
    };
  
    if(!exceptions.get(`jsonKristyActivities`) || !eval(exceptionsReaded['jsonKristyActivities']))
    {
        for (let i in arrKristyAct)
        {
            for(let el in actTypes)
            {
                if(arrKristyAct[i][1]===`actTypes.${el}`) arrKristyAct[i][1] = actTypes[el];
            };
        };
    };

  
    guildActivitiesCicle: for (let i in guildActivities)
    {
        if(exceptions.get(`${i}`) || eval(exceptionsReaded[`${i}`])) continue guildActivitiesCicle;
        for(let el in actTypes)
        {
            const index = actTypes[el].type;
            if(guildActivities[i][1] === `actTypes.${el}`) guildActivities[i][1] = actTypes[el];
            if(guildActivities[i][2] === `\${actType[${index}]}`) guildActivities[i][2] = actType[index];
        }
    };
  
    randomActivitiesCicle: for (let el in randomActivities)
    {
        if(exceptions.get(`${el}`) || eval(exceptionsReaded[`${el}`])) continue randomActivitiesCicle;

        const elem = randomActivities[el];
        for(let i in elem)
        {
            elem[i][0] = elem[i][0].replace('${version}', `${version}`);
  
            for(let index in THEVOIDSARRAY) elem[i][0] = elem[i][0].replace(`\${${THEVOIDSARRAY[index][1]}}`, THEVOIDSARRAY[index][0]);
  
            for(let type in actTypes)
            {
              if(elem[i][1] === `actTypes.${type}`) elem[i][1] = actTypes[type];
            };
        
            randomActivity.push(elem[i]);
        };
    };
    skip(1);
};

const clearActivity = () => { randomActivity.length = 0; };
  
const readActivityDB = () =>
{
  const path = '../../VoidDataBase/data.json';
  const file = ( fs.readFileSync( path, { encoding: 'utf8' } ) );
  let json;

  JSON.stringify(file, (key, value) => { json = eval(` ${json} = ${value} `) } );

  jsonCicle: for (let el in json)
  {
    for(let elem of dataVars)
    {
      if(json[elem[1]]===undefined)
      {

        delete json[elem[1]];
        eval(`${elem[0]} = null`);
        continue jsonCicle;
        
      }
      
      else if(`${elem[1]}`===`${el}`)
      {
        
        eval(`${elem[0]} = json[el]`);
        continue jsonCicle;

      };
    };
  };
};

const funcKristyAct = async (client, log=true) =>
{
  let exceptionsReaded;
  const file = ( fs.readFileSync( '../../../VoidDataBase/exceptions.json', { encoding: 'utf8' } ) );
  JSON.stringify(file, (key, value) => { exceptionsReaded = eval(` ${exceptionsReaded} = ${value} `) } );
  
  if(exceptions.get(`jsonKristyActivities`) || eval(exceptionsReaded['jsonKristyActivities'])) return;

  const guild = await client?.guilds?.fetch(`${kristyGuildId}`);
  const kristyUser = await guild?.members?.fetch(`${kristyId}`);
  const kristyStatus = kristyUser?.presence?.status;
  
  if(kristyStatus === undefined || kristyStatus === null || kristyStatus === 'offline')
  {
    if(log) console.log('Kristy не в сети');
    for (let el of arrKristyAct)
    {
      const index = randomActivity.indexOf(el);
      if(index < 0) continue;
      randomActivity.splice(index, 1);
    };
    kristyAct.oneTimeFunction(false, true);
    return;
  };

  if(kristyAct.oneTimeFunction(false, false, true)) return;

  if(log)
  {
      debug('Загружаю Kristy активности...'.bold)
      skip();
    
      debug('Все Kristy активности'.bold);
      skip();
  }

  for (let el of arrKristyAct)
  {
    randomActivity.push(el);
    if(log) debug(`${el[0]}`.magenta + ` - ${`${arrKristyAct.indexOf(el)}`.bold}`);
  };

  if(log) debug(`\nУспешно загружено ${`${arrKristyAct.length}`.magenta} Kristy активность(и)(ей)`);

  shuffle(randomActivity);
  kristyAct.oneTimeFunction(true);
};

const updateActivities = (client) =>
{

  let length = randomActivity.length;

  clearActivity();
  readActivityDB();
  downloadActivities();
  if(!!client && oneTimeFunction('kristyAct', false, false, true)) for (let el of arrKristyAct) randomActivity.push(el);
  debug('Были перезагружены активности');
  debug('Общая длина составляет: ' + `${randomActivity.length}`.magenta + '\nБыла: "' + `${length}`.bgMagenta + '"');
  
  shuffle(randomActivity);

};

const getActivities = (variable=randomActivity) =>
{
    switch (variable)
    {
        case 'guildActivities':
            return guildActivities;

        case 'arrKristyAct':
            return arrKristyAct;

        case 'download':
            return download;

        case 'randomActivities':
            return randomActivities;

        case 'jokes':
            return jokes;

        case 'objectIdeas':
            return objectIdeas;

        case 'namesActivities':
            return namesActivities;

        case 'randomNames':
            return randomNames;

        case 'version':
            return version;
        
        case 'randomActivity':
            return randomActivity
    };
};

module.exports =
{
    downloadActivities,
    updateActivities,
    funcKristyAct,
    getActivities,
    dataVars,
    exceptions
};