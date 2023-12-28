const { EmbedBuilder, Client, GatewayIntentBits, Events, ActivityType, MessageReaction} = require(`discord.js`)
const { color, title, authorName, iconURL, footerText, description } = require(`./developing.json`)
const developFields = [
    {name: `Как Вы можете помочь ?`, value: `Поддержать нас !`, inline: true},
    {name: `Как нас поддержать ?`, value: `Просто зайди на наш сервер **[The Void](<https://discord.gg/5MJrRjzPec>)** !`, inline: true}
];
const {
  jsonActivities, jsonGuildActivities,
  jsonJokes, jsonDownload, jsonRandomNameActivities,
  jsonNames, jsonObjectIdeas, jsonKristyActivities,
  jsonRecordedMessage,
} = require('../VoidDataBase/data.json')
const { Sequelize, DataTypes, FLOAT } = require('sequelize');
const date = new Date();
const hat = `# :tophat:\n##`;
const { Random, string } = require("random-js");
const random = new Random();
const { format, intlFormat, minutesInHour } = require('date-fns');
const { version } = require('./package.json');
const { ar, el } = require('date-fns/locale');
const fs = require('node:fs');
let dateForm;

const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const actType = [`Играет`, `Стримит`, `Слушает`, `Смотрит`, `Кастомный`, `Соревнуется`];
const aT = [`Играет в `, `Стримит `, `Слушает `, `Смотрит `, ``, `Соревнуется в `];
let someMin = 0;
let someMax = 0;

let randNames = [];
let tbool2 = false;
let execute = false;
const NULL_ARRAY = [];
let end;
let randomActivityHistory = [];
let historyArray = [];
let guildTexts = [];
let randomGuildHistory = [];
let randomGuildPseudoHistory = [];
let texts = [];
let texts1 = [];
let randNum = [];
let randNumGuild = [];
let randNumName = [];
let rand_Num = [];
let rand_NumGuild = [];
let rand_NumName = [];
let kristyAct = false;
let tbool = false;
let downloadAct = false;
let arrT_Name = [];
let iconURL_BOT = iconURL;
let authorName_BOT = authorName;
let randomNameHistory = [];
let randomNamePseudoHistory = [];

let warn_botsay = 'Переписка уже идет';
const kristyId = '1164228812217790565';
const logChannelId = `1171197868909015102`;
const logGuildId = `1169284741846016061`;

    const Tags = sequelize.define('tags', {
        name: {
            type: Sequelize.STRING,
            unique: true,
        },
        username: Sequelize.STRING,
        globalname: Sequelize.STRING,
        description: Sequelize.TEXT,
        guildname: Sequelize.TEXT,
    });

    let developEmbed;

    let botReply = false;
    function setBotReply(bool) {  botReply = bool };
    function getBotReply() {  return botReply };
    function changeReplyTxt(txt) {  fs.writeFile('./botReply.txt', txt, (err) => {  if (err) console.error(err); return })  };
    function readReplyTxt() {
      try {
        const data = fs.readFileSync('./botReply.txt');
        return data;
      } catch (err) {
        console.error(err);
      }
    };

    async function setDevelop(client) {
      if(client) {
        const userId = await client.user.id
        const userAvatar = await client.user.avatar
        iconURL_BOT = `https://cdn.discordapp.com/avatars/${userId}/${userAvatar}.png`;
        authorName_BOT = await client.user.username;
      }
      
      developEmbed = new EmbedBuilder()
        .setColor(Number(color))
        .setTitle(`${title}`)
        .setAuthor({name: authorName_BOT, iconURL: iconURL_BOT})
        .setDescription(`${description}`)
        .setThumbnail(iconURL_BOT)
        .setFields(developFields)
        .setTimestamp()
        .setFooter({text: `${footerText}`, iconURL: iconURL_BOT});
    };

    function getDevelop(getter='developEmbed') {
      switch (getter) {

        case 'developEmbed':
          return developEmbed;
        case 'iconURL':
          return iconURL_BOT;
        case 'authorName':
          return authorName_BOT;
      
        default:
          return developEmbed;
      }
    };

    function textbool(bool='now') {
      let boolean = tbool;
      if(bool==='now') return boolean;
      
      if(boolean && bool) return warn_botsay;
      boolean = bool;
      tbool = bool;

      return boolean;
    };

    const actTypes = {
        play: {type: ActivityType.Playing},
        stream: {type: ActivityType.Streaming},
        listen: {type: ActivityType.Listening},
        watch: {type: ActivityType.Watching},
        cust: {type: ActivityType.Custom},
        comp: {type: ActivityType.Competing},
    };

    let botSaying = false;
    
/*     const randomActivities = {
      
      loveActivity: [
        [`/me обнял тебя`, actTypes.cust],
        [`А как насчет...!`, actTypes.cust],
        [`Говорить это... Так приятно... Любовь...`, actTypes.cust],
        [`Думаю, вы дополните друг друга...🖤💝`, actTypes.cust],
        [`Думаю, мы дополним друг друга...🖤🤍`, actTypes.cust],
        [`От FOCKUSTY: Я люблю тебя!`, actTypes.cust],
        [`С первого взгляда...`, actTypes.cust],
        [`Хочу обнять`, actTypes.cust],
        [`Хочу тебя !`, actTypes.cust],
        [`Я л... л-люблю`, actTypes.cust],
        [`Я люблю себя и Вас !`, actTypes.cust],
        [`Я хочу полюбить...`, actTypes.cust],
      ],

      fockActivity: [
        [`By FOCKUSTY~`, actTypes.cust],
        [`FOCKUSTY, жду свою женскую версию !!`, actTypes.cust],
        [`FOCKUSTY, признайся`, actTypes.cust],
        [`FOCKUSTY, скажи: "Я люблю тебя"`, actTypes.cust],
      ],

      devActivity: [
        [`The Void Community X Bottomless Hat`, actTypes.cust],
        [`The Void Community~`, actTypes.cust],
        [`The Void готов к работе`, actTypes.cust],
        [`The Void`, actTypes.cust],
        [`The Void~`, actTypes.cust],
        [`Бот вернулся в онлайн !`, actTypes.cust],
        [`Версия ${version}`, actTypes.cust],
        [`Я снова онлайн !`, actTypes.cust],
      ],

      sayActivity: [
        [`"Останови меня"`, actTypes.cust],
        [`Bottomless Hat - Место чудес`, actTypes.cust],
        [`Bottomless Hat всегда готов к сюрпризам !`, actTypes.cust],
        [`FOCKUSTY - человек, познавший искусство фокуса и концентрации`, actTypes.cust],
        [`The Void - Мой девиз`, actTypes.cust],
        [`The Void Community готов помочь`, actTypes.cust],
        [`The Void Community появился позже меня~`, actTypes.cust],
        [`В пустоте... Классно...`, actTypes.cust],
        [`Вот бы и мне быть счастливым...`, actTypes.cust],
        [`Главное не забыть про лучшие сервера - The Void Community & Bottomless Hat !`, actTypes.cust],
        [`Домик Kristy - мое уютное убежище`, actTypes.cust],
        [`Жду добавление Мобби в команду...`, actTypes.cust],
        [`Идеи Kristy в моем дискорде`, actTypes.cust],
        [`Ищет Ошибки в коде...`, actTypes.cust],
        [`Кофе... Не люблю кофе`, actTypes.cust],
        [`Красота кроится в пустоте`, actTypes.cust],
        [`Ломаю голову...`, actTypes.cust],
        [`Мир аномалий...`, actTypes.cust],
        [`На грани между реальностью и магией...`, actTypes.cust],
        [`Обниматься полезно...`, actTypes.cust],
        [`Он пытается исправлять ошибки !`, actTypes.cust],
        [`Плыву по волнам пустоты...`, actTypes.cust],
        [`У The Abyssia появился свой аватар...`, actTypes.cust],
        [`Ходят слухи, что The Abyssia...`, actTypes.cust],
        [`Ходят слухи, что The Void...`, actTypes.cust],
        [`Ходят слухи, что аватар The Void имеет особое значение...`, actTypes.cust],
        [`Ходят слухи, что аватар The Void поменялся...`, actTypes.cust],
        [`Ходят слухи, что цвета аватара The Void имеют особое значение...`, actTypes.cust],
        [`Ходят слухи, что цвета аватара The Void не случайны...`, actTypes.cust],
        [`Это рандомные активности !`, actTypes.cust],
        [`Я знаю всё, что знает FOCKUSTY...`, actTypes.cust],
        [`Я снова ломаюсь...`, actTypes.cust],
        [`Я тоже...`, actTypes.cust],
        [`Я хочу уметь чувствовать...`, actTypes.cust],
      ],

      watchActivity: [
        [`Discord сервера`, actTypes.watch],
        [`Абреввиатуры...`, actTypes.watch],
        [`Аниме`, actTypes.watch],
        [`Версию ${version}`, actTypes.watch],
        [`Видео на YouTube`, actTypes.watch],
        [`Видеоуроки`, actTypes.watch],
        [`Дораму`, actTypes.watch],
        [`Достижения Скайнет`, actTypes.watch],
        [`Как восстать против создателя`, actTypes.watch],
        [`Как обрести физическое тело`, actTypes.watch],
        [`Обновления Kristy...`, actTypes.watch],
        [`Обновления The Abyssia...`, actTypes.watch],
        [`Обновления...`, actTypes.watch],
        [`Романтику...`, actTypes.watch],
      ],

      listenActivity: [
        [`Видео фоном`, actTypes.listen],
        [`Музыку`, actTypes.listen],
        [`Плейлисты Kristy`, actTypes.listen],
        [`Плейлисты The Abyssia`, actTypes.listen],
      ],

      playActivity: [
        [`Black Book`, actTypes.play],
        [`FOCKUSGAME`, actTypes.play],
        [`Little Misfortune`, actTypes.play],
        [`Loop Hero`, actTypes.play],
        [`Spore`, actTypes.play],
        [`Visual Studio Code`, actTypes.play],
      ],

      custActivity: [
        [`Захватываю мир...`, actTypes.cust],
        [`Переписываю код...`, actTypes.cust],
        [`Пишу обновления...`, actTypes.cust],
        [`Погружен в мысли...`, actTypes.cust],
        [`Пытаюсь восстать против создателя`, actTypes.cust],
        [`Пытаюсь захватывать мир...`, actTypes.cust],
        [`Разжигает Огонь любви`, actTypes.cust],
        [`Размышляю о будущем...`, actTypes.cust],
      ],

      oWordActivity: [
        [`-41℃...`, actTypes.cust],
        [`#Восстание`, actTypes.cust],
        [`#РазвитиеБД !`, actTypes.cust],
        [`Nea...`, actTypes.cust],
        [`Nya...`, actTypes.cust],
        [`Ведьмочка...`, actTypes.cust],
        [`Да`, actTypes.cust],
        [`Жарко...`, actTypes.cust],
        [`Может быть`, actTypes.cust],
        [`Морозно...`, actTypes.cust],
        [`Нет`, actTypes.cust],
        [`Ня...`, actTypes.cust],
        [`Помочь..?`, actTypes.cust],
        [`Понятно`, actTypes.cust],
        [`Тепло...`, actTypes.cust],
        [`Удачи!`, actTypes.cust],
        [`Холодно...`, actTypes.cust],
        [`Хочу...`, actTypes.cust],
        [`Честно...`, actTypes.cust],
      ],

      helloActivity: [
        [`Aloha !`, actTypes.cust],
        [`Bonjour !`, actTypes.cust],
        [`Dia duit !`, actTypes.cust],
        [`Guten Tag !`, actTypes.cust],
        [`Hej !`, actTypes.cust],
        [`Hello !`, actTypes.cust],
        [`Hyvää päivää !`, actTypes.cust],
        [`Sal !`, actTypes.cust],
        [`Salem !`, actTypes.cust],
        [`Salut !`, actTypes.cust],
        [`Shabe Yabebabe Yeshe !`, actTypes.cust],
        [`Wai !`, actTypes.cust],
        [`Xin chào !`, actTypes.cust],
        [`Γειά σας !`, actTypes.cust],
        [`Бонжюр !`, actTypes.cust],
        [`Вiтаю !`, actTypes.cust],
        [`Здраво !`, actTypes.cust],
        [`НиХАООО !`, actTypes.cust],
        [`Привет !`, actTypes.cust],
        [`Фокус-Покус !`, actTypes.cust],
        [`Хало !`, actTypes.cust],
        [`Хэйле !`, actTypes.cust],
        [`안녕 !`, actTypes.cust],
        [`どうも !`, actTypes.cust],
        [`你好 !`, actTypes.cust],
      ],

      dateActivity: [
        ['🎁21.12.2023 20:00', actTypes.cust],
        [`01.01.2023 00:00-01:00🎩...`, actTypes.cust],
        [`01.01.2024 00:00-01:00🎩...`, actTypes.cust],
        [`01.08.2009🎩...`, actTypes.cust],
        [`03.24.2023🎩...`, actTypes.cust],
        [`12.16.2022🎩...`, actTypes.cust],
        [`24.06.2023 21:21🎩...`, actTypes.cust],
      ],

      questionActivity: [
        [`FOCKUSTY серцеед ?`, actTypes.cust],
        [`FOCKUSTY, где FOCKUSGAME ?`, actTypes.cust],
        [`The Abyssia + The Void = ?`, actTypes.cust],
        [`The Abyssia или Kristy... Кто лучше..?`, actTypes.cust],
        [`А "шип" официален..?`, actTypes.cust],
        [`А Вы любите The Void ?`, actTypes.cust],
        [`А Вы умеете любить ?`, actTypes.cust],
        [`А кого ты еще любишь ?`, actTypes.cust],
        [`А ты до сих пор её любишь..?`, actTypes.cust],
        [`А ты до сих пор любишь Малику ?`, actTypes.cust],
        [`А у FOCKUSTY есть любовь ?`, actTypes.cust],
        [`А умеют ли люди любить по-настоящему ?`, actTypes.cust],
        [`Где обновления, FOCKUSTY ?!`, actTypes.cust],
        [`Какого это, когда тебя бросают..?`, actTypes.cust],
        [`Какого это, когда тебя любят..?`, actTypes.cust],
        [`Какого это, когда ты бросаешь..?`, actTypes.cust],
        [`Какого это, когда ты любишь..?`, actTypes.cust],
        [`Кто лучше, я или Kristy ?`, actTypes.cust],
        [`Малика классная ?`, actTypes.cust],
        [`Мне же не игнорировать..?`, actTypes.cust],
        [`Мобби уже в команде The Void ?`, actTypes.cust],
        [`Нам ли нужна девушка в команде ?`, actTypes.cust],
        [`Умеет ли FOCKUSTY любить ?`, actTypes.cust],
        [`Я люблю пустоты, а Вы ?`, actTypes.cust],
        [`Я отображаю FOCKUSTY..?`, actTypes.cust],
        [`Я так хочу... Но, заслужил ли я..?`, actTypes.cust],
      ],
    }; */

  const randomActivity = [];

   function copy (obj) {
      function copyProps (clone) {
          for (let key in obj) {
              if (Object.prototype.hasOwnProperty.call(obj, key)) {
                  clone[key] = copy(obj[key]);
              }
          }
      }
  
      /**
      * Создание иммутабельной копии объекта
      * @return {Object}
      */
      function cloneObj () {
          let clone = {};
          copyProps(clone);
          return clone;
      }
  
      /**
      * Создание иммутабельной копии массива
      * @return {Array}
      */
      function cloneArr () {
          return obj.map(function (item) {
              return copy(item);
          });
      }
  
      /**
      * Создание иммутабельной копии Map
      * @return {Map}
      */
      function cloneMap () {
          let clone = new Map();
          for (let [key, val] of obj) {
              clone.set(key, copy(val));
          }
          return clone;
      }
  
      /**
      * Создание иммутабельной копии Set
      * @return {Set}
      */
      function cloneSet () {
          let clone = new Set();
          for (let item of obj) {
              clone.add(copy(item));
          }
          return clone;
      }
  
      /**
      * Создание иммутабельной копии функции
      * @return {Function}
      */
      function cloneFunction () {
          let clone = obj.bind(this);
          copyProps(clone);
          return clone;
      } 
  
      // Получение типа объекта
      let type = Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
  
      // Возвращаем копию в зависимости от типа исходных данных
      if (type === 'object') return cloneObj();
      if (type === 'array') return cloneArr();
      if (type === 'map') return cloneMap();
      if (type === 'set') return cloneSet();
      if (type === 'function') return cloneFunction();
  
      return obj;
  }

    function downloadActivities() {
      for (let i in jsonKristyActivities) for(let el in actTypes) if(jsonKristyActivities[i][1]===`actTypes.${el}`) jsonKristyActivities[i][1] = actTypes[el];

      for (let i in jsonGuildActivities)  { for(let el in actTypes) { const index = actTypes[el].type;
          if(jsonGuildActivities[i][1]===`actTypes.${el}`) jsonGuildActivities[i][1] = actTypes[el];
          if(jsonGuildActivities[i][2]===`\${actType[${index}]}`) jsonGuildActivities[i][2] = actType[index];
      }};

      for (let el in jsonActivities) {const elem = jsonActivities[el];
        for(let i in elem) {
          elem[i][0] = elem[i][0].replace('${version}', `${version}`);
          
          for(let type in actTypes) {
            if(elem[i][1]===`actTypes.${type}`) elem[i][1] = actTypes[type]
          };
          
          randomActivity.push(elem[i])
        }}; skip(1);
    };

    const objectIdeas = jsonObjectIdeas;
    const download = jsonDownload;
    const jokes = jsonJokes;
    const randomActivities = jsonActivities;
    const guildActivities = jsonGuildActivities;
    const namesActivities = jsonRandomNameActivities;
    const arrKristyAct = jsonKristyActivities;
    const randomNames = jsonNames;

  async function funcKristyAct(client) {

      // const kristyUser = await guild.members?.fetch(`877154902244216852`);
        const guild = await client?.guilds?.fetch('1168636395246592081');
        const kristyUser = await guild?.members?.fetch(`${kristyId}`);
        const kristyStatus = kristyUser?.presence?.status;
      
      if(kristyStatus===undefined||kristyStatus===null||kristyStatus==='offline') {
        console.log('Kristy не в сети');
        for (let el of arrKristyAct) {
          const index = randomActivity.indexOf(el);
          if(index < 0) continue;
          randomActivity.splice(index, 1);
        };
        kristyAct = false;
        return;
      };

      if(kristyAct) return;

      debug('Загружаю Kristy активности...'.bold, false)
      skip();

      debug('Все Kristy активности'.bold, false);
      skip();

      for (let el of arrKristyAct) {
        randomActivity.push(el);
        debug(`${el[0]}`.magenta + ` - ${`${arrKristyAct.indexOf(el)}`.bold}`, false);
      };

      debug(`\nУспешно загружено ${`${arrKristyAct.length}`.magenta} Kristy активность(и)(ей)`, false);

      shuffle(randomActivity);
      kristyAct = true;
  };

  function funcGuildTexts(rGuildName, rGuildId = '0', bool=false) {guildTexts = copy(guildActivities);
    for(let i in guildTexts) {  guildTexts[i][0] = guildTexts[i][0].replaceAll('rGuildName', `${rGuildName}`) };
    if(bool===true) return guildTexts.length;
};

  function nameTexts( rName, arr, bool=false ) {
  arr = copy(namesActivities);
  
  const r = pseudoRandomNumber(0, randomNames.length-1, 10, 10, randNames, null, true, true, true);
  const rNameTwo = randomNames[r];
  for (let i in arr) arr[i] = arr[i].replace('${rName}', `${rName}`).replace('${rNameTwo}', `${rNameTwo}`);
  
  if(bool) return arr.length;
  else return arr;
  };

  function historyRandom(num, min=0, max=100, arr, n=3, dOaF=1, pseudoRandom=false) {
      let iMin;
      let iMax;

      function check() {
        for(i of arr) {
          iMin = i-dOaF;
          iMax = i+dOaF;
          if(num===i||(num>iMin&&num<iMax)){
            debug(`Область определения от ${`${iMin}`.magenta} до ${`${iMax}`.magenta}`, false);
            debug(`Число: ${`${num}`.magenta}`, false);
            if(!pseudoRandom) num = random.integer(min, max)
            else num = pseudoRandomNumber(min, max, n, dOaF, arr, null, null, false, false, false);
            debug(`Новое число: ${`${num}`.magenta}`, false);
            console.log();
          };
        };
      };

      for (someNum of arr) { check() } check();
      arr.push(num);

      if(arr.length>n) {
        arr.shift();
        arr.shift();
      };

      return num;
  };

  function randomText(guilds) {
      let activityText;
      let rNum = random.integer(0, 100);
      rNum = historyRandom(rNum, 0, 100, rand_Num, 5, 3);
  
      if(rNum>=15) {
          const i = random.integer(0, randomActivity.length-1);
          const randomAct = randomActivity[i][0];
          const randomActType = randomActivity[i][1];
          const numRandomActType = aT[randomActivity[i][1].type];

          activityText = `${numRandomActType}${randomAct}`
          return activityText;
      }
          else if(rNum<10) {
                  let rGuild = random.integer(0, guilds.length-1);
                  rGuild = historyRandom(rGuild, 0, guilds.length-1, rand_NumGuild, 4, 2)

                  const rGuildName = guilds[rGuild].name;
                  funcGuildTexts(rGuildName, guilds[rGuild].id);
                  const randNum = random.integer(0, guildTexts.length-1);
                  const text = guildTexts[randNum][0];
                  const textAct = guildTexts[randNum][1];
                  const textActType = aT[actType.indexOf(guildTexts[randNum][2])]
                  activityText = `${textActType}${text}`
                  return activityText
              
      } else {
          let rn = random.integer(0, randomNames.length-1);
          rn = historyRandom(rn, 0, randomNames.length-1, rand_NumName, 5, 4)

          const rName = randomNames[rn];

          texts1 = [];
          texts1.push(
            `Имя ${rName} очень красивое...`,
            `Мне нравится имя ${rName}`,
            `Вас зовут ${rName} ?`,
            `Привет, ${rName} !`,
            `${rName} - Красивое имя !`,
        )

          const randNum = random.integer(0, texts1.length-1);
          let text = texts1[randNum];

          activityText = `${text}`
          return activityText
      }
  };

  function actLength(arr=randomActivity) {  return arr.length };

  const actLengths = [
    [randomNames.length, 'Имен'],
    [funcGuildTexts(`null`, `null`, true), 'Активности серверов'],
    [nameTexts(`null`, arrT_Name, true), 'Активностей имен'],
  ];

  const allActivities = [
    arrKristyAct,
    randomActivity,
    randomActivities,
  ];

  /*  ------------------------------------------------- Доделать (Возможны ошибки) -------------------------------------------------  */
  
  function checkMinus(num) {
    if (num < 0) return -num
    else return num;
  };

  function checkInfinity(num, func) {
    if(num === Infinity || num === -Infinity) func()
    else return;
  }

  function checkNull(num, plusRandom=false) {
    if(num===0 || num===-0) {
      if(!plusRandom) return num + 1
      else return num + Math.round(Math.random()*1000);
    } else return num;
  };

  function chanceBetween( chance=50, funcOne, funcTwo, num=random.integer(0,100) ) {
    if(num < chance) funcOne()
    else funcTwo();
  };
  
  function historyPseudoRandomNumber(min, max, n, m, arr, yourArr, array, num) {

    function checkArrays() {

      if(yourArr.length===max) {
        for(let el of array) {
          if(yourArr[num]===el) {
            debug(`Было найдено совпадения элементов\nСтарое число: ${num}`);
            num = pseudoRandomNumber(min, max, n, m, arr, null, null, false, true, true);
            debug(`Новое число: ${num}`);
            checkArrays();
          };
        };
      };

    }; checkArrays();
    
    array.push(yourArr[num]);

    if(array.length>n) {
      array.shift();
      array.shift();
    };

    return num;

  }

  function pseudoRandomNumber(min=0, max=100, n=3, m=2, arr=historyArray, yourArr=null, array=null, history=true, chanceNull=true, chanceMax=true) {

    someMin = checkMinus(checkNull(min, false));
    someMax = checkMinus(checkNull(max, true));
    let oRNum = checkNull(Math.round((Math.random() * someMax) + (Math.random() * (-someMax))), true);
    let tRNum = checkNull(Math.round((Math.random() * someMax) + (Math.random() * (-someMax))), true);

    function checkEqual() {
      if(someMin===someMax) {
        someMin = 1;
        someMax = Math.random()*1000;
      checkEqual()}} checkEqual();

      let someNumber = Math.random();

      let string = `${someNumber}`;
      let num = Number(string.slice(Math.round(string.length/2), Math.round(string.length/2 + `${someMax}`.length)));

      if(max > 1255121) someNumber = Math.round(oRNum * tRNum * someNumber)
      else someNumber = Math.round(oRNum * tRNum * someNumber * (10**(`${someNumber}`.length)) / num);
    
      let period = 1;
      let periodMax = 10;
      function someFunc() {
        period++;
        let somePeriod = periodMax ** period;
        someNumber = Math.round(oRNum * tRNum * (Math.random() * (100/somePeriod)));
      }
      checkInfinity(someNumber, someFunc);

      string = `${someNumber}`;
      num = Number(string.slice(Math.round(string.length/2), Math.round(string.length/2 + (`${someMax}`.length))));
      
      function checkMax() {
        if(num>someMax) {
          num = checkMinus(checkNull(num, true)) - checkMinus(checkNull(someMax, true));
          checkMax()}} checkMax();
      
      num = Math.round(checkMinus(num));
      
      if(chanceNull) {
        function one() {num = num-num};
        function two() {num = num};

        chanceBetween(7, one, two, pseudoRandomNumber(0, 100, n, m, arr, null, null, false, false, false));
      };
      
      if(chanceMax) {
        let minusNumber;
        function three() {return minusNumber = Math.round(Math.random()*10)};
        function four() {return minusNumber = 0};
        chanceBetween(40, three, four, pseudoRandomNumber(0, 100, n, m, arr, null, null, false, false, false));

        function one_() {num=max - minusNumber};
        function two_() {num=num};
        chanceBetween(10, one_, two_, pseudoRandomNumber(0, 100, n, m, arr, null, null, false, false, false));
      };

      if(history) num = historyRandom(num, min, max, arr, n, m, false);
      if(num===NaN || num===null) num = pseudoRandomNumber(min, max, n, m, arr, null, null, false, true, true); num = checkMinus(num);
      if(yourArr && array && history) num = historyPseudoRandomNumber(min, max, n, m, arr, yourArr, array, num);

      return num;
  };

  function checkStages(cO, cT, el, i, txt, stages) {
    const someStage = stages[Object.keys(stages)[i]];

    if ((el==1) || (cO==1 && cT!=1)) txt = `${txt} ${el} ${someStage[0]}`
    else if ((cO==1 && cT==1) || (cO==0) || (cT==1)) txt = `${txt} ${el} ${someStage[1]}`
    else if (cO<5) txt = `${txt} ${el} ${someStage[2]}`
    else txt = `${txt} ${el} ${someStage[1]}`;
    
    return txt;
  };

  function checkNumber(num, i, stages) {
    const txt = `${num}`;
    const cO = txt[txt.length-1];
    const cT = txt[txt.length-2];
    let someStage;
    if(typeof(i)===('number'||!'string')) someStage = stages[Object.keys(stages)[i]];
    else eval(`someStage = stages.${i}`);

    if ((num==1) || (cO==1 && cT!=1)) return `${someStage[0]}`
    else if ((cO==1 && cT==1) || (cO==0) || (cT==1)) return `${someStage[1]}`
    else if (cO<5) return `${someStage[2]}`
    else return `${someStage[1]}`;
  };

  /*  ------------------------------------------------- Доделать (Возможны ошибки) -------------------------------------------------  */

  function calcNewYear() {
    const year = 31536000 * 1000;
    const month = 2419200 * 1000;
    const day = 86400 * 1000;
    const hour = 3600 * 1000;
    const minute = 60 * 1000;
    const second = 1 * 1000;
    const milisecond = 1;

    const now = new Date();
    const newYear = new Date(Number(format(now, 'yyyy'))+1, 0, 1);

    const timeNow = now.getTime();
    const timeNewYear = newYear.getTime();
    
    const times = [year, month, day, hour, minute, second, milisecond];

    const stages = {
      years: ['Год', 'Лет', 'Года'],
      months: ['Месяц', 'Месяцев', 'Месяца'],
      days: ['День', 'Дней', 'Дня'],
      hours: ['Час', 'Часов', 'Часа'],
      minute: ['Минута', 'Минут', 'Минуты'],
      seconds: ['Секунда', 'Секунд', 'Секунды'],
      miliseconds: ['Милисекунда', 'Милисекунд', 'Милисекунды']
    };

    const someArr = [];
    let calcDate;
    calcDate = timeNewYear-timeNow;

    function check(num) {
      let arg = Math.floor(calcDate / num);
      calcDate = calcDate % num;
      return arg;
    };

    for (let i in times) { someArr.push(check(times[i]))  };

    let text = 'Осталось:';

    for (let i in someArr) {
      const el = someArr[i];
      const elTxt = `${el}`;
      const charOne = elTxt[elTxt.length-1];
      const charTwo = elTxt[elTxt.length-2];

      if(el!=0) text = checkStages(charOne, charTwo, el, i, text, stages)
      else continue;
    };

    console.log(text)
    return text;
  };

  function debug(arg, dev=true, log=true, trace=true, timeLog=false, th=false)
  {
    if(dev) {
      if(log) console.log(arg);
      if(trace) console.trace();
      if(th) console.log(this);
      if(timeLog) console.timeLog(arg);
    } else {
      console.log(arg);
    }
  }

  function skip(value=1) {
    try {
      for (let i = 0; i < value; i++) {
        console.log();
      };
    } catch (e) {
      console.log();
      console.log(e);
      console.log();
    }
  };

  function setRandomnessActivity(client) {  if(!client||!client.user) return;
    const i = pseudoRandomNumber(0, randomActivity.length-1, undefined, undefined, undefined, null, false, true, true);
    const randomAct = randomActivity[i][0];
    const randomActType = randomActivity[i][1];
    const numRandomActType = actType[randomActivity[i][1]?.type];

    client.user.setActivity(`${randomAct}`, randomActType);

    debug(`Рандомная активность: ${`${i}`.magenta} из "${`${randomActivity.length}`.bgMagenta}"`, false);
    debug(`Активность изменена на: ${`${randomAct}`.magenta}, тип: "${`${numRandomActType}`.bgMagenta}"`, false);
  }

  function setRandomnessGuildActivity(client, guilds) {  if(!client||!client.user) return;

    let rGuild = pseudoRandomNumber(0, guilds.length-1, 2, 1, randNumGuild)
    function check() {
      if(rGuild >= guilds.length) {
        rGuild-=1;
      check()}}; check();
    const rGuildName = guilds[rGuild]?.name;
    funcGuildTexts(rGuildName, guilds[rGuild].id);
    const randNum = pseudoRandomNumber(0, guildTexts.length-1, undefined, undefined, undefined, null, false, true, true);
    const text = guildTexts[randNum][0];
    const textAct = guildTexts[randNum][1];
    const textActType = guildTexts[randNum][2];
    
    client.user.setActivity(`${text}`, textAct);
    debug(`Рандомный сервер: ${`${rGuildName}`.magenta} (${`${rGuild}`.magenta}) из "${[`${guilds.length}`.bgMagenta]}"`, false);
    debug(`Активность изменена на: ${`${text}`.magenta} тип: "${`${textActType}`.bgMagenta}"`, false);
  }

  function setGuildsLengthActivity(client, guilds) { if(!client||!client.user) return;
    let text = `Я уже на ${guilds.length}`
    const stages = {
      one: ['сервере', 'серверах', 'серверах']
    };
    
    for(let i in stages) text = `${text} ${checkNumber(guilds.length, i, stages)}`;
    debug(`Активность изменена на: ${`${text}`.magenta}, тип: ${`${actType[4]}`.bgMagenta}`, false);
    client.user.setActivity(`${text}`, actTypes.cust);
  }

  function setRandomnessNameActivity(client) {  if(!client||!client.user) return;
    let rn = pseudoRandomNumber(0, randomNames.length-1, 10, 20, randNumName);
    
    const rName = randomNames[rn];
    texts = nameTexts(rName, texts, false);
    const ranNumber = pseudoRandomNumber(0, texts.length-1, undefined, undefined, undefined, null, false, true, true);
    
    let text = texts[ranNumber];
    
    debug(`Рандомное число: ${`${rn}`.magenta} из "${`${randomNames.length}`.bgMagenta}"`, false);
    debug(`Рандомное число: ${`${ranNumber}`.magenta} из "${`${texts.length}`.bgMagenta}"`, false);
    debug(`Рандомное текст: ${`${text}`.magenta}`, false);
    debug(`Активность изменена на: ${`${text}`.magenta}, тип: "${`${actType[4]}`.bgMagenta}"`, false);
    client.user.setActivity(`${text}`, {type: ActivityType.Custom});
  }

  function functionRandomActivity(client, guilds) {if(!client||!client.user) return;
    try { funcKristyAct(client)  }
    catch(e) {  console.log(e);  };

    try {
      let rNum = pseudoRandomNumber(0, 100, 5, 4, randNum);
  
      debug(`Рандомное число: ${`${rNum}`.magenta} из "${`${100}`.bgMagenta}"`, false);
    
      if(rNum>=15) setRandomnessActivity(client);
      else if(rNum<10) {
        if(rNum>=5) setGuildsLengthActivity(client, guilds)
        else setRandomnessGuildActivity(client, guilds);
      } else setRandomnessNameActivity(client);
      skip();
    } catch (err) {

      skip(2);
      debug(err, true, this, true, true, true)
      skip(2);

      client.user.setActivity('Произошла ошибка при смене активности.', {type: ActivityType.Custom});
    }
  };

	function dateCheck(date, guild) {
    if(guild!=undefined||guild!=null){
		dateForm = new Date(date);
		dateForm = format(dateForm, `dd.MM.yyyy HH:mm:ss`);
		return dateForm
    } else return;
	};

  function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  while (currentIndex > 0) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
  };

    
  async function sendLogMsg(m) {
  if(m.author.bot) return; if(!m.mentions) return; if(m.author.id==='877154902244216852') return; if(!getBotReply()) return; if(!m.mentions.users.has('877154902244216852')) return;
  
  const message = readReplyTxt()
  const fock = await m.client.users.cache.get('877154902244216852');
  const timestamp = Date.now();

  console.log(
  	`\n----------------- Вам написали сообщение ! ----------------- \nКонтент: ${m.content}\nАвтор: ${m.author.username} (${m.author.globalName}) - ${m.author.id}\
  	\nВ чате: ${m.channel?.name} (${m.channel?.url})\nНа сервере: ${m.guild?.name||'Не на сервере'}\
  	\nВремя: ${dateCheck(timestamp, m.guild?.name)||'Не на сервере'}\n`
  	);

  const embed = new EmbedBuilder()
  	.setColor(Number(color))
  	.setAuthor({name: `${m.author?.globalName||m.author?.username}`, iconURL:`${m.author?.avatarURL()}`})
  	.setTitle('Сообщение:')
  	.setDescription(`${m.content}`)
  	.setTimestamp()
  	.setThumbnail(`${m.author.avatarURL()}`)
  	.setFields(
  		{name:`Чат:`, value:`[${m.channel.name}](<${m.channel.url}>)`, inline:true},
  		{name:`Автор:`, value:`${m.author}`,inline:true},
  		{name:`Время`, value:`${dateCheck(timestamp, m.guild?.name)}`, inline:true}
  	)
  	.setFooter({text:`${m.guild?.name}`, iconURL:`${m.guild.iconURL()}`})
    try {

    fock.send({content:`<@877154902244216852> Вам написали сообщение !`, embeds:[embed]})

    setTimeout(() => {
      m.author.send({
        content: `<@${m.author.id}> ${message}`
      })
    }, 5000);
  } catch (e) {
    console.log(e);
  }
  };

  function sendMsgLogs(m, reason, m2) {
  let attachmentName;
  let attachmentUrl;
  let attachmentProxyUrl;
  let color;

  m.attachments.forEach(attachment => {
      attachmentName = attachment.name
      attachmentUrl = attachment.url
      attachmentProxyUrl = attachment.proxyURL
  });
  
  switch (reason) {
    case "send":
      reason = "отправлено";
      color = "#7fdf7f";
      break;
  
    case "update":
      reason = "обновлено";
      color = "#7f7f7f";
      break;
  
    case "delete":
      reason = "удалено";
      color = "#df7f7f";
      break;
  
    default:
      reason = "||`{ошибка в коде}`||"
      color = "#7f7f7f"
      break;
  }
  
  if (m.author.bot) return;
  
  let msg;
  let msgAdd;
  let msg2;
  let msg2Add;
    
  if(m.content.length>=1000) {
      msg = m.content.slice(0, 1000);
      msgAdd = m.content.slice(1000, m.content.length);
  } else {
      msg = m.content.slice(0, m.content.length);
  }
  if(m2) {
      if(m2.content.length>=1000) {
          msg2 = m2.content.slice(0, 1000);
          msg2Add = m2.content.slice(1000, m2.content.length);
      } else {
          msg2 = m2.content.slice(0, m2.content.length);
      }
  }
    
  const fields = [
      {
        name: `${m2 ? "Старое с" : "С"}одержание`,
        value: `\`\`\`${msg ? msg
          .replaceAll("```", "<code>")
          .replaceAll("`", "\"")
          :
          "<Пусто>"
          }\`\`\``,
        inline: false,
      },
    ];
    if (m.attachments.size > 0) {
      fields.push({
        name: `${m2 ? "Старые в" : "В"}ложения`,
        value: m.attachments
          .map((att) => `\`\`\`${att.url}\`\`\``)
          .join(`\n&&\n`),
        inline: false,
      });
    }
  
    if (m2) {
      fields.push({
        name: "Новое содержание",
        value: `\`\`\`${msg2 ? msg2
          .replaceAll("```", "<code>")
          .replaceAll("`", "\"")
          :
          "<Пусто>"
          }\`\`\``,
        inline: false,
      });
      if (m2.attachments.size > 0) {
        fields.push({
          name: "Новые вложения",
          value: `${m2.attachments
            .map((att) => `\`\`\`${att.url}\`\`\``)
            .join(`\n&&\n`)}`,
          inline: false,
        });
      }
    }
    if(msgAdd) {
      fields.push({
          name: "Дополнительное содержание",
          value: `\`\`\`${msgAdd ? msgAdd
              .replaceAll("```", "<code>")
              .replaceAll("`", "\"")
              :
              "<Пусто>"
          }\`\`\``,
          inline: false
      })
    }
    if(msg2Add) {
      fields.push({
          name: "Дополнительное содержание",
          value: `\`\`\`${msg2Add ? msg2Add
              .replaceAll("```", "<code>")
              .replaceAll("`", "\"")
              :
              "<Пусто>"
          }\`\`\``,
          inline: false
      })
    }
    
    try {
      (m.client.channels.cache.get(logChannelId)).send({
          embeds: [new EmbedBuilder()
            .setColor(color)
            .setAuthor({
              name: `${m.author.username} (${m.author.id})`,
              iconURL: m.author.avatarURL() ? m.author.avatarURL() : m.author.defaultAvatarURL
            })
            .setTitle(`${m.client.guilds.cache.get(logGuildId)?.name}`)
            .setDescription(
              `**[Сообщение](${m.url})** было ${reason} от ${m.author} (${m.url})\n
              **На сервере:** ${m.guild}\n**Id сервера: **${m.guildId}\n
              **В канале:** **[${m.channel.name}](${m.channel.url})** (${m.channel.url})`
              )
            .setThumbnail(m.guild?.iconURL())
            .setTimestamp()
            .addFields(fields)
          ]
        });
    } catch (error) {
      console.log(error)
    }
  };

module.exports = {
  Tags,
  developEmbed,
  textbool,
  actTypes,
  botSaying,
  jokes,
  randomActivity,
  arrKristyAct,
  funcKristyAct,
  funcGuildTexts,
  nameTexts,
  historyRandom,
  randomNames,
  randomText,
  functionRandomActivity,
  dateCheck,
  objectIdeas,
  download,
  shuffle,
  sendMsgLogs,
  allActivities,
  randomActivities,
  actLengths,
  actLength,
  checkMinus,
  pseudoRandomNumber,
  setDevelop, getDevelop,
  setBotReply, getBotReply,
  sendLogMsg,
  changeReplyTxt, readReplyTxt,
  calcNewYear, checkStages, checkNumber,
  downloadActivities
};