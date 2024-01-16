const
    fs = require('node:fs'),
    { ActivityType } = require('discord.js'),

    {
        jsonActivities,
        jsonGuildActivities,
        jsonJokes,
        jsonDownload,
        jsonRandomNameActivities,
        jsonNames,
        jsonObjectIdeas,
        jsonKristyActivities,
    } = require('../../VoidDataBase/data.json'),
    
    { version } = require('../package.json'),
    { skip } = require('./developConsole');





let arrKristyAct = jsonKristyActivities,
    download = jsonDownload,
    guildActivities = jsonGuildActivities,
    jokes = jsonJokes,
    namesActivities = jsonRandomNameActivities,
    objectIdeas = jsonObjectIdeas,
    randomActivities = jsonActivities,
    randomNames = jsonNames;





const THEVOIDSARRAY =
    [
    
        [   'The Void',     'THEVOIDSBOT_NREVERSE'      ],
        [   'The Abyssia',  'THEVOIDSBOT_REVERSE'       ],
        [   'Kristy',       'THEVOIDSBOT_LOVE'          ],
        [   'The Void',     'THEVOIDSBOT_REVERSE_LOVE'  ],
        [   'Kristy',       'THEVOID_LOVE'              ],
        [   'Меня',         'THEVOID'                   ],
        [   '',             'typend_A'                  ],
        [   'ым',           'typend_B'                  ],
    
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
    ],

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
    for(let i=0; i<jsonFiles.length-1;i++)
    {
        if(jsonFiles[i]===dataFiles[i]) dataFiles[i] = jsonFiles[i];
    };
  
    for (let i in arrKristyAct)
    {
        for(let el in actTypes)
        {
            if(arrKristyAct[i][1]===`actTypes.${el}`) arrKristyAct[i][1] = actTypes[el];
        };
    };
  
    for (let i in guildActivities)
    {
        for(let el in actTypes)
        {
            const index = actTypes[el].type;
            if(guildActivities[i][1] === `actTypes.${el}`) guildActivities[i][1] = actTypes[el];
            if(guildActivities[i][2] === `\${actType[${index}]}`) guildActivities[i][2] = actType[index];
        }
    };
  
    for (let el in randomActivities)
    {
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

const clearActivity = () =>
{
    randomActivity.length = 0;
};
  
const readActivityDB = () =>
{
  const path = '../../VoidDataBase/data.json';
  const file = (fs.readFileSync(path, {encoding: 'utf8'}));
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
  
const updateActivities = () =>
{

  clearActivity();
  readActivityDB();
  downloadActivities();
  debug('Были перезагружены активности');

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
        
        case 'randomActivity':
            return randomActivity
    };
};

module.exports =
{
    downloadActivities,
    updateActivities,
    getActivities,
    dataVars,
};