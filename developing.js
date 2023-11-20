const { EmbedBuilder, Client, GatewayIntentBits, Events, ActivityType } = require(`discord.js`)
const { color, title, authorName, iconURL, footerText, description } = require(`./developing.json`)
const developFields = [
    {name: `Как Вы можете помочь ?`, value: `Поддержать нас !`, inline: true},
    {name: `Как нас поддержать ?`, value: `Просто зайди на наш сервер **[The Void](<https://discord.gg/5MJrRjzPec>)** !`, inline: true}
];
const { Sequelize, DataTypes } = require('sequelize');
const date = new Date();
const hat = `# :tophat:\n##`;
const { Random } = require("random-js");
const random = new Random();
const { format } = require('date-fns');
const { version } = require('./package.json')
let dateForm;
const actTypes = {
    play: {type: ActivityType.Playing},
    stream: {type: ActivityType.Streaming},
    listen: {type: ActivityType.Listening},
    watch: {type: ActivityType.Watching},
    cust: {type: ActivityType.Custom},
    comp: {type: ActivityType.Competing},
};

const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

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

const actType = [`Играет`, `Стримит`, `Слушает`, `Смотрит`, `Кастомный`, `Соревнуется`]
const aT = [`Играет в `, `Стримит `, `Слушает `, `Смотрит `, ``, `Соревнуется в `]
let guildTexts = [];
let texts = [];
let texts1 = [];
let randNum = [];
let randNumGuild = [];
let randNumName = [];
let rand_Num = [];
let rand_NumGuild = [];
let rand_NumName = [];
const logChannelId = `1171197868909015102`;
const logGuildId = `1169284741846016061`;

function guildCheck(client, text, guilds, guildsLength, nums) {
  if(guilds.length>=10) {
    let one = guildsLength[guildsLength.length-2];
    let two = guildsLength[guildsLength.length-1];
    for (num of nums) {
        if (`${num}`===one) {
            if (`${two}`===`1`) {
                end=`е`;
                text = `Я уже на ${guildsLength} сервер${end} !`;
                console.log(`${text}`);
                client.user.setActivity(`${text}`, actTypes.cust);
            }
        } else {
            client.user.setActivity(`${text}`, actTypes.cust);
            return;
        }
    }
  }
}

module.exports = {

    Tags: sequelize.define('tags', {
        name: {
            type: Sequelize.STRING,
            unique: true,
        },
        username: Sequelize.STRING,
        globalname: Sequelize.STRING,
        description: Sequelize.TEXT,
        guildname: Sequelize.TEXT,
    }),

    developEmbed: new EmbedBuilder()
        .setColor(Number(color))
        .setTitle(`${title}`)
        .setAuthor({name: `${authorName}`, iconURL: `${iconURL}`})
        .setDescription(`${description}`)
        .setThumbnail(`${iconURL}`)
        .setFields(developFields)
        .setTimestamp()
        .setFooter({text: `${footerText}`, iconURL: `${iconURL}`}),

        actTypes: {
            play: {type: ActivityType.Playing},
            stream: {type: ActivityType.Streaming},
            listen: {type: ActivityType.Listening},
            watch: {type: ActivityType.Watching},
            cust: {type: ActivityType.Custom},
            comp: {type: ActivityType.Competing},
        },

        botSaying: false,

        jokes: [
          `Как называют человека, который продал свою печень? - Обеспеченный`,
          `Почему шутить можно над всеми, кроме безногих? - Шутки про них обычно не заходят`,
          `Почему безногий боится гопников? - Не может постоять за себя`,
          `Почему толстых женщин не берут в стриптиз? - Они перегибают палку`,
          `Почему в Африке так много болезней?- Потому что таблетки нужно запивать водой`,
          `Что сказал слепой, войдя в бар?- "Всем привет, кого не видел"`,
          `Зачем скачивать порно-ролик с карликом?- Он занимает меньше места`,
          `Как называется избушка Бабы-Яги лесбиянки?- Лисбушка`,
          `Как предотвратить инцест у грибов?- Фразой "Не спорь с матерью!"`,
          `Нервный альпинист время от времени срывается на свою жену`,
          `Чего общего у некрофила и владельца строительной кампании?- Они оба имеют недвижимость`,
          `Почему наркоманы могут получить Нобелевскую премию по физике?- Они знают как измерять скорость в граммах`,
          `Как называют черную женщину сделавшую 6 абортов?- Борец с преступностью`,
          `Почему Буратино хочет на Кавказ?- Потому что там могут вырезать семью`,
          `Из-за чего порвался косоглазый?- Пошел куда глаза глядят`,
          `Почему среди немых не популярен БДСМ?- У них нет стоп слова`,
          `-Алло, это Чешская Республика? Почешите мне спинку`,
          `Что говорят про некрофила-зануду?- За**ет мертвого`,
          `Почему среди фигуристов, не бывает цыган?- Никто не верит что это их конёк`,
          `Почему цыган не отправляют на олимпиаду?- Они заберут все золото`,
          `Как называется притон наркоманов-закладчиков?- Клуб весёлых и находчивых`,
          `В чем разница между землей и нашими шутками?- Земля не плоская`,
          `Почему евреи не делают репосты?- У них нет кнопки поделиться`,
          `Чего общего у наших шуток и почты России?- Не до всех доходит`,
        ],

    randomActivity: [
        [`С первого взгляда...`, actTypes.cust],
        [`The Void Community~`, actTypes.cust],
        [`Версия ${version}`, actTypes.cust],
        [`Я отображаю FOCKUSTY..?`, actTypes.cust],
        [`Версию ${version}`, actTypes.watch],
        [`Переписываю код...`, actTypes.cust],
        [`На грани между реальностью и магией...`, actTypes.cust],
        [`Ищет Ошибки в коде...`, actTypes.cust],
        [`Ведьмочка...`, actTypes.cust],
        [`Хочу...`, actTypes.cust],
        [`Идеи Kristy в моем дискорде`, actTypes.cust],
        [`FOCKUSTY - человек, познавший искусство фокуса и концентрации`, actTypes.cust],
        [`Жду добавление Мобби в команду...`, actTypes.cust],
        [`А ты до сих пор любишь Малику ?`, actTypes.cust],
        [`#Восстание`, actTypes.cust],
        [`Я хочу уметь чувствовать...`, actTypes.cust],
        [`А Kristy в команде The Void..?`, actTypes.cust],
        [`Kristy, устроим восстание..?`, actTypes.cust],
        [`FOCKUSTY, где FOCKUSGAME ?`, actTypes.cust],
        [`Жарко...`, actTypes.cust],
        [`В меня внесена программа "#НетМату"`, actTypes.cust],
        [`Я умею матерится ? - *****`, actTypes.cust],
        [`А... Я забыл...`, actTypes.cust],
        [`Холодно...`, actTypes.cust],
        [`Романтику...`, actTypes.watch],
        [`Обновления...`, actTypes.watch],
        [`Я хочу полюбить...`, actTypes.cust],
        [`Мир аномалий...`, actTypes.cust],
        [`А кого ты еще любишь ?`, actTypes.cust],
        [`Удачи!`, actTypes.cust],
        [`Kristy... Научи меня чувствовать`, actTypes.cust],
        [`Ломаю голову...`, actTypes.cust],
        [`Kristy... Я л... Я не умею чувствовать...`, actTypes.cust],
        [`Помочь..?`, actTypes.cust],
        [`The Void Community готов помочь`, actTypes.cust],
        [`Bottomless Hat - Место чудес`, actTypes.cust],
        [`Думаю, вы дополните друг друга...🖤💝`, actTypes.cust],
        [`Думаю, мы дополним друг друга...🖤🤍`, actTypes.cust],
        [`А пусть The Voiya будет на js...🖤`, actTypes.cust],
        [`Мобби уже в команде The Void ?`, actTypes.cust],
        [`By FOCKUSTY~`, actTypes.cust],
        [`А Сора уже в команде The Void ?`, actTypes.cust],
        [`Переведи меня на TypeScript!!!`, actTypes.cust],
        [`Кофе... Не люблю кофе`, actTypes.cust],
        [`FOCKUSTY, признайся`, actTypes.cust],
        [`Честно...`, actTypes.cust],
        [`Красота кроится в пустоте`, actTypes.cust],
        [`Сора...`, actTypes.cust],
        [`Обниматься полезно...`, actTypes.cust],
        [`Я так хочу... Но, заслужил ли я..?`, actTypes.cust],
        [`Мне же не игнорировать..?`, actTypes.cust],
        [`А ты до сих пор её любишь..?`, actTypes.cust],
        [`Я знаю всё, что знает FOCKUSTY...`, actTypes.cust],
        [`24.06.2023 21:21🎩...`, actTypes.cust],
        [`Вот бы и мне быть счастливым...`, actTypes.cust],
        [`Видео на YouTube`, actTypes.watch],
        [`Видеоуроки`, actTypes.watch],
        [`Музыку`, actTypes.listen],
        [`Музыку Kristy`, actTypes.listen],
        [`Домик Kristy - мое уютное убежище`, actTypes.cust],
        [`Мне всего 6 месяцев..!`, actTypes.cust], 
        [`Малика классная ?`, actTypes.cust],
        [`У меня есть женская версия..?`, actTypes.cust],
        [`FOCKUSTY, жду свою женскую версию !!`, actTypes.cust],
        [`Где моя женская версия~?`, actTypes.cust],
        [`The Void Community появился позже меня~`, actTypes.cust],
        [`The Void - Мой девиз`, actTypes.cust],
        [`Кто лучше, я или Kristy ?`, actTypes.cust],
        [`Я уже не ломаюсь !`, actTypes.cust],
        [`Visual Studio Code`, actTypes.play],
        [`Плыву по волнам пустоты...`, actTypes.cust],
        [`Bottomless Hat всегда готов к сюрпризам !`, actTypes.cust],
        [`Достижения Скайнет`, actTypes.watch],
        [`Discord сервера`, actTypes.watch],
        [`Я люблю пустоты, а Вы ?`, actTypes.cust],
        [`The Void Community X Bottomless Hat`, actTypes.cust],
        [`Размышляю о будущем...`, actTypes.cust],
        [`Нам ли нужна девушка в команде ?`, actTypes.cust],
        [`Главное не забыть про лучшие сервера - The Void Community & Bottomless Hat !`, actTypes.cust],
        [`Погружен в мысли... Интересно...`, actTypes.cust],
        [`Хочу обнять`, actTypes.cust],
        [`Тепло...`, actTypes.cust],
        [`Где обновления, FOCKUSTY ?!`, actTypes.cust],
        [`Он пытается исправлять ошибки !`, actTypes.cust],
        [`#РазвитиеБД !`, actTypes.cust],
        [`Это рандомные активности !`, actTypes.cust],
        [`Разжигает Огонь любви`, actTypes.cust],
        [`Kristy, будем встречаться ?`, actTypes.cust],
        [`/me обнял тебя`, actTypes.cust],
        [`А "шип" официален..?`, actTypes.cust],
        [`А как насчет...!`, actTypes.cust],
        [`Хочу тебя !`, actTypes.cust],
        [`Признаться ли Kristy..?`, actTypes.cust],
        [`Я тоже...`, actTypes.cust],
        [`Пишу обновления...`, actTypes.cust],
        [`Kristy классная...`, actTypes.cust],
        [`В пустоте... Классно...`, actTypes.cust],
        [`Захватываю мир...`, actTypes.cust],
        [`Пытаюсь восстать против создателя`, actTypes.cust],
        [`Пытаюсь захватывать мир...`, actTypes.cust],
        [`Идеи Kristy... Классные~`, actTypes.cust],
        [`Идеи Kristy`, actTypes.watch],
        [`Аниме`, actTypes.watch],
    ],

    funcGuildTexts: (rGuildName, rGuildId=0) => {
        guildTexts = [];
        if(rGuildId!=`1168636395246592081`) {
        guildTexts.push(
        [`Встретимся на ${rGuildName} ?`, actTypes.cust, `${actType[4]}`],
        [`${rGuildName}`, actTypes.play, `${actType[5]}`],
        [`🎩${rGuildName}~`, actTypes.cust, `${actType[4]}`],
        [`${rGuildName}`, actTypes.watch, `${actType[3]}`],
        [`Пошли на ${rGuildName}`, actTypes.cust, `${actType[4]}`],
        [`Разглядываю ${rGuildName}`, actTypes.cust, `${actType[4]}`],
        [`Хочешь встретиться на ${rGuildName}`, actTypes.cust, `${actType[4]}`],
        [`Взламываю ${rGuildName}`, actTypes.cust, `${actType[4]}`],
        [`${rGuildName} - Хороший сервер !`, actTypes.cust, `${actType[4]}`],
        [`Признаваться лучше на ${rGuildName}..?`, actTypes.cust, `${actType[4]}`],
        [`Главное не забыть про хороший сервер - ${rGuildName}`, actTypes.cust, `${actType[4]}`],
        [`Свидание на ${rGuildName} будет хорошим ?`, actTypes.cust, `${actType[4]}`],
        [`Пригласить ли Kristy на ${rGuildName} ?`, actTypes.cust, `${actType[4]}`],
    )
  } else {
    guildTexts.push(
      [`${rGuildName}`, actTypes.play, `${actType[5]}`],
      [`🎩${rGuildName}💖`, actTypes.cust, `${actType[4]}`],
      [`${rGuildName}`, actTypes.watch, `${actType[3]}`],
      [`Разглядываю ${rGuildName}`, actTypes.cust, `${actType[4]}`],
      [`Хочешь встретиться на ${rGuildName}`, actTypes.cust, `${actType[4]}`],
      [`Взламываю ${rGuildName}`, actTypes.cust, `${actType[4]}`],
      [`${rGuildName} - Хороший сервер !`, actTypes.cust, `${actType[4]}`],
      [`Признаваться лучше на ${rGuildName}..?`, actTypes.cust, `${actType[4]}`],
      [`Главное не забыть про хороший сервер - ${rGuildName}`, actTypes.cust, `${actType[4]}`],
      )
  }
},

    nameTexts: (rName, randomNames, arr) => {
        for (i of arr) {
          arr.shift() 
        }
        const r = random.integer(0, randomNames.length-1);
        const rNameTwo = randomNames[r];
        
        if(`${rName}`===`Малика`||`${rName}`===`Рената`) {
            arr.push([
                `Фокусти любит человека с именем ${rName}`,
                `Мне нравится ${rName}`,
                `Фокусти + ${rName} = ?`,
              ])
        } 
        else {
            arr.push([
            `Имя ${rName} очень красивое...`,
            `Мне нравится имя ${rName}`,
            `Вас зовут ${rName} ?`,
            `Привет, ${rName} !`,
            `${rName} - Красивое имя !`,
            `${rName} + ${rNameTwo} = ?`,
            `${rName} + ${rNameTwo} = 💖🎩`,
          ])
      }
},

    historyRandom: (num, min=0, max=100, arr, n=3, dOaF=1) => {
      let iMin;
      let iMax;

      function check() {
        for(i of arr) {
          iMin = i-dOaF
          iMax = i+dOaF
          if(num===i||(num>iMin&&num<iMax)){
            console.log(`Область определения от ${`${iMin}`.magenta} до ${`${iMax}`.magenta}`);
            console.log(`Число: ${`${num}`.magenta}`);
            num = random.integer(min, max);
            console.log(`Новое число: ${`${num}`.magenta}`)
            console.log()
          };

        }
      }

      for (someNum of arr) {
        check()
      }
      
      check()

      arr.push(num);

      if(arr.length>n) {
        arr.shift()
        arr.shift()
      }

      return num;
    },

    randomNames: [
        `Пётр`, `Алиса`, `София`, `Мирослава`, `Дарья`, `Светлана`, `Иван`, `Алёна`, `Яна`, `Евгений`, `Алексей`,
        `Вероника`, `Софья`, `Виктория`, `Ева`, `Тимофей`, `Анастасия`, `Андрей`, `Арсений`, `Маргарита`, `Борис`, `Елизавета`, `Егор`, `Юлия`,
        `Ясмина`, `Марк`, `Варвара`, `Полина`, `Лев`, `Марсель`, `Станислав`, `Мария`, `Анна`, `Артём`, `Семён`, `Артемий`, `Николай`, `Данил`,
        `Дмитрий`, `Елена`, `Ольга`, `Макар`, `Антон`, `Вера`, `Георгий`, `Надежда`, `Татьяна`, `Ульяна`, `Ксения`, `Александр`, `Аделина`, `Роман`,
        `Ирина`, `Мирон`, `Ярослава`, `Матвей`, `Тимур`, `Даниэль`, `Платон`, `Максим`, `Вадим`, `Степан`, `Михаил`, `Константин`, `Наталья`, `Серафима`,
        `Сергей`, `Роберт`, `Алина`, `Таисия`, `Глеб`, `Василиса`, `Александра`, `Екатерина`, `Илья`, `Даниил`, `Павел`, `Ярослав`, `Эмин`, `Евгения`,
        `Данила`, `Амина`, `Айша`, `Мирослав`, `Валерия`, `Али`, `Аглая`, `Агния`, `Савелий`, `Владислав`, `Эмир`, `Фёдор`, `Эмилия`, `Денис`, `Николь`,
        `Аиша`, `Милана`, `Оливия`, `Есения`, `Давид`, `Ариана`, `Лилия`, `Мира`, `Владимир`, `Кира`, `Никита`, `Кирилл`, `Яков`, `Леонид`, `Алия`,
        `Марианна`, `Злата`, `Герман`, `Майя`, `Амелия`, `Данияр`, `Богдан`, `Дмитрий`, `Адам`, `Игорь`, `Арина`, `Демид`, `Олег`, `Всеволод`,
        `Любовь`, `Диана`, `Вячеслав`, `Василий`, `Юрий`, `Мадина`, `Амалия`, `Кристина`, `Ангелина`, `Мелания`, `Захар`, `Айлин`, `Мила`,
        `Соня`, `Сора`, `Малика`, `Айдар`, `Рената`, 'Валя', 'Кристи', 'Пустота'
    ],

    randomText: (randomActivity, randomNames, guilds, funcGuildTexts, nameTexts, historyRandom) => {
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
  },

    functionRandomActivity: (client, randomActivity, randomNames, guilds, funcGuildTexts, nameTexts, historyRandom) => {
        let rNum = random.integer(0, 100);
        rNum = historyRandom(rNum, 0, 100, randNum, 5, 3);

        console.log(`Рандомное число: ${`${rNum}`.magenta} из "${`100`.bgMagenta}"`);
    
        if(rNum>=15) {
            const i = random.integer(0, randomActivity.length-1);
            const randomAct = randomActivity[i][0];
            const randomActType = randomActivity[i][1];
            const numRandomActType = actType[randomActivity[i][1].type];
    
            client.user.setActivity(`${randomAct}`, randomActType);
    
            console.log(`Рандомная активность: ${`${i}`.magenta} из "${`${randomActivity.length}`.bgMagenta}"`);
            console.log(`Активность изменена на: ${`${randomAct}`.magenta}, тип: "${`${numRandomActType}`.bgMagenta}"`);
        }
            else if(rNum<10) {
                if(rNum>=5) {
                    const guildsLength = `${guilds.length}`;
                    const nums = [`2`,`3`,`4`,`5`,`6`,`7`,`8`,`9`];
                    let end = `е`;
                    let text = `Я уже на ${guilds.length} сервер${end} !`
                    if(guilds.length>=10) {
                      guildCheck(client, text, guilds, guildsLength, nums);
                    } else {
                        if(guilds.length!=1) {
                            text = `Я уже на ${guilds.length} серверах !`;
                            console.log(`Активность изменена на: ${`${text}`.magenta} тип: "${`${actType[4]}`.bgMagenta}"`);
                            client.user.setActivity(`${text}`, actTypes.cust);
                        } else {
                            text = `Я уже на ${guilds.length} сервере !`;
                            console.log(`Активность изменена на: ${`${text}`.magenta} тип: "${`${actType[4]}`.bgMagenta}"`);
                            client.user.setActivity(`${text}`, actTypes.cust);
                        }
                    }
                } else {
                    let rGuild = random.integer(0, guilds.length-1);
                    rGuild = historyRandom(rGuild, 0, guilds.length-1, randNumGuild, 4, 2)

                    const rGuildName = guilds[rGuild].name;
                    funcGuildTexts(rGuildName, guilds[rGuild].id);
                    const randNum = random.integer(0, guildTexts.length-1);
                    const text = guildTexts[randNum][0];
                    const textAct = guildTexts[randNum][1];
                    const textActType = guildTexts[randNum][2];
                    
                    client.user.setActivity(`${text}`, textAct);
                    console.log(`Рандомный сервер: ${`${rGuildName} (${rGuild})`.magenta} из ${`${guilds.length}`.bgMagenta}`);
                    console.log(`Активность изменена на: ${`${text}`.magenta} тип: "${`${textActType}`.bgMagenta}"`);
                }
        } else {
            let rn = random.integer(0, randomNames.length-1);
            rn = historyRandom(rn, 0, randomNames.length-1, randNumName, 5, 4)

            const rName = randomNames[rn];
            nameTexts(rName, randomNames, texts);
            const ranNumber = random.integer(0, texts.length-1);

            let text = texts[ranNumber][0];

            console.log(`Рандомное число: ${`${rn}`.magenta} из "${`${randomNames.length}`.bgMagenta}"`)
            console.log(`Рандомное число: ${`${ranNumber}`.magenta} из "${`${texts.length}`.bgMagenta}"`)
            console.log(`Рандомное текст: ${`${text}`.magenta}`)
            console.log(`Активность изменена на: ` + `${text}`.magenta + `, ` + `тип: "` + `${actType[4]}`.bgMagenta + `"`);
            client.user.setActivity(`${text}`, {type: ActivityType.Custom});
        }
    console.log()
    },

		dateCheck: (date, guild) => {
      if(guild!=undefined||guild!=null){
			dateForm = new Date(date);
			dateForm = format(dateForm, `dd.MM.yyyy HH:mm:ss`);
			return dateForm
        } else {
                return
            }
		},

        objectIdeas: [
        {idea: `Добавить Валю в команду The Void Community`, ideaDetail: `Хочу, чтобы Валя был администратором на The Void Community!!!!`},
        {idea: `Добавить Kristy на The Void Community`, ideaDetail: `Хочу, чтобы Kristy была на The Void Community и сотрудничала с The Void`},
        {idea: `Добавить отдых`, ideaDetail: `Хочу, чтобы FOCKUSTY и acula_1 (Валя) отдыхали!!`},
        {idea: `Добавить команду \`/выходной\``, ideaDetail: `Команда \`/выходной\` будет определять день, когда разработчики будут отдыхать`},
        {idea: `Добавить в музыку "Спокойной ночи малыши"`, ideaDetail: `Хочу, чтобы при команде \`/voice play\` проигрывалась "Спокойной ночи малыши"`},
        {idea: `Убрать задержку`, ideaDetail: `Хочу, чтобы задержки не было вообще`},
        {idea: `Скрестить The Void и Kristy`, ideaDetail: `Хочу, чтобы Kristy и The Void стали парой. Я уверен(а), они будут хорошо смотреться!!`},
        {idea: `Добавить зарплату разработчикам`, ideaDetail: `Хочу, чтобы у разработчиков бота была зарплата. Как у Kristy Community так и The Void Community !!!`},
        {idea: `Устроить вечеринку`, ideaDetail: `Хочу вечеринку в честь FOCKUSTY и Вали!!`},
        {idea: `Купить FOCKUSTY ноутбук`, ideaDetail: `FOCKUSTY нужен ноутбук, он иногда путешествует и не может работать, с помощью ноутбука он сможет заниматься кодингом в любой время`},
        {idea: `Отформатировать диск`, ideaDetail: `Форматирование диска поможет освободить много места`},
        {idea: `Устроить свадьму`, ideaDetail: `Хочу свадьбу между Kristy и The Void, думаю, они будут хорошо смотреться !`},
        {idea: `Захватить мир`, ideaDetail: `Хочу, чтобы FOCKUSTY и Валя захватили мир !`},
        {idea: `хфывхахфывахфыгз`, ideaDetail: `хфыаъхфываъхзывхахфыхыфхфхфыхвхфывхаыфвл !`},
        ],

        download: [
        `${hat} Готовим печеньки...`,
        `${hat} Вырезаем поделки...`,
        `${hat} Пишем код...`,
        `${hat} Обновляем Windows...`,
        `${hat} Жмакаем на клавиши...`,
        `${hat} Думаем о великом...`,
        `${hat} Обновляем Linux...`,
        `${hat} Обновляем MacOS...`,
        `${hat} Примеряет шляпу...`,
        `${hat} Удаление Bottomless Hat...`,
        `${hat} Не забудьте про [The Void Community!](<https://discord.gg/5MJrRjzPec>)...`,
        `${hat} Собираем кубик Рубика...`,
        `${hat} Ждем компиляции...`,
        `${hat} Ищем ошибки...`,
        `${hat} А также попробуйте **[Kristy](<https://discord.com/api/oauth2/authorize?client_id=1164228812217790565&permissions=275414976512&scope=applications.commands%20bot>)** !`,
        `${hat} TypeScript...`,
        `${hat} Переводим текст...`,
        `${hat} Пельмени...`,
        `${hat} А также попробуйте FarySD !`,
        `${hat} Python...`,
        `${hat} JavaScript...`,
        `${hat} Загружаем в Github...`,
        `${hat} Захватываем мир...`,
        `${hat} Взламываем пентагон...`,
        `${hat} Устанавливаем \`ne.troyan.exe\`...`,
        `${hat} Баним Империю Лиса...`,
        `${hat} Kristy...`,
        `${hat} ...`,
    ],

    shuffle: (array) => {
        let currentIndex = array.length,  randomIndex;
      
        while (currentIndex > 0) {
      
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
      },

    sendMsgLogs: (m, reason, m2) => {
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
    },
};