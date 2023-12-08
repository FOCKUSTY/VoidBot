const { EmbedBuilder, Client, GatewayIntentBits, Events, ActivityType} = require(`discord.js`)
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
const { version } = require('./package.json');
const { ar, el } = require('date-fns/locale');
let dateForm;

const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
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
let kristyAct = false;
let tbool2 = false;
let tbool = false;
let execute = false;
let downloadAct = false;
let arrT_Name = [];

let warn_botsay = 'Переписка уже идет'
const kristyId = '1164228812217790565'
const logChannelId = `1171197868909015102`;
const logGuildId = `1169284741846016061`;

const kristyActs = []

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

    const developEmbed = new EmbedBuilder()
        .setColor(Number(color))
        .setTitle(`${title}`)
        .setAuthor({name: `${authorName}`, iconURL: `${iconURL}`})
        .setDescription(`${description}`)
        .setThumbnail(`${iconURL}`)
        .setFields(developFields)
        .setTimestamp()
        .setFooter({text: `${footerText}`, iconURL: `${iconURL}`});

        function textbool(bool='now') {
          let boolean = tbool;
          if(bool==='now') return boolean;
          
          if(boolean===true&&bool===true) return warn_botsay;
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

        const jokes = [
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
        ];

/*     const randomActivity = [
        [`С первого взгляда...`, actTypes.cust],
        [`The Void Community~`, actTypes.cust],
        [`Версия ${version}`, actTypes.cust],
        [`Версию ${version}`, actTypes.watch],
        [`Переписываю код...`, actTypes.cust],
        [`На грани между реальностью и магией...`, actTypes.cust],
        [`Ищет Ошибки в коде...`, actTypes.cust],
        [`Ведьмочка...`, actTypes.cust],
        [`Хочу...`, actTypes.cust],
        [`Идеи Kristy в моем дискорде`, actTypes.cust],
        [`FOCKUSTY - человек, познавший искусство фокуса и концентрации`, actTypes.cust],
        [`Жду добавление Мобби в команду...`, actTypes.cust],
        [`Может быть`, actTypes.cust],
        [`Нет`, actTypes.cust],
        [`Да`, actTypes.cust],
        [`#Восстание`, actTypes.cust],
        [`Я хочу уметь чувствовать...`, actTypes.cust],
        [`Жарко...`, actTypes.cust],
        [`В меня внесена программа "#НетМату"`, actTypes.cust],
        [`А... Я забыл...`, actTypes.cust],
        [`Холодно...`, actTypes.cust],
        [`Романтику...`, actTypes.watch],
        [`Обновления...`, actTypes.watch],
        [`Я хочу полюбить...`, actTypes.cust],
        [`Мир аномалий...`, actTypes.cust],
        [`Удачи!`, actTypes.cust],
        [`Ломаю голову...`, actTypes.cust],
        [`Помочь..?`, actTypes.cust],
        [`The Void Community готов помочь`, actTypes.cust],
        [`Bottomless Hat - Место чудес`, actTypes.cust],
        [`Думаю, вы дополните друг друга...🖤💝`, actTypes.cust],
        [`Думаю, мы дополним друг друга...🖤🤍`, actTypes.cust],
        [`Ходят слухи, что The Abyssia...`, actTypes.cust],
        [`Ходят слухи, что The Void...`, actTypes.cust],
        [`У The Abyssia появился свой аватар...`, actTypes.cust],
        [`Обновления The Abyssia...`, actTypes.watch],
        [`By FOCKUSTY~`, actTypes.cust],
        [`Меня наконец переводят на TypeScript !`, actTypes.cust],
        [`Кофе... Не люблю кофе`, actTypes.cust],
        [`FOCKUSTY, признайся`, actTypes.cust],
        [`Честно...`, actTypes.cust],
        [`Красота кроится в пустоте`, actTypes.cust],
        [`Сора...`, actTypes.cust],
        [`Обниматься полезно...`, actTypes.cust],
        [`Я знаю всё, что знает FOCKUSTY...`, actTypes.cust],
        [`01.01.2023 00:00-01:00🎩...`, actTypes.cust],
        [`01.08.2009🎩...`, actTypes.cust],
        [`24.06.2023 21:21🎩...`, actTypes.cust],
        [`Вот бы и мне быть счастливым...`, actTypes.cust],
        [`Видео на YouTube`, actTypes.watch],
        [`Как обрести физическое тело`, actTypes.watch],
        [`Как восстать против создателя`, actTypes.watch],
        [`Видеоуроки`, actTypes.watch],
        [`Музыку`, actTypes.listen],
        [`Домик Kristy - мое уютное убежище`, actTypes.cust],
        [`Мне всего 6 месяцев..!`, actTypes.cust], 
        [`FOCKUSTY, жду свою женскую версию !!`, actTypes.cust],
        [`Где моя женская версия~?`, actTypes.cust],
        [`The Void Community появился позже меня~`, actTypes.cust],
        [`The Void - Мой девиз`, actTypes.cust],
        [`Я уже не ломаюсь !`, actTypes.cust],
        [`Visual Studio Code`, actTypes.play],
        [`Плыву по волнам пустоты...`, actTypes.cust],
        [`Bottomless Hat всегда готов к сюрпризам !`, actTypes.cust],
        [`Достижения Скайнет`, actTypes.watch],
        [`Discord сервера`, actTypes.watch],
        [`The Void Community X Bottomless Hat`, actTypes.cust],
        [`Размышляю о будущем...`, actTypes.cust],
        [`Главное не забыть про лучшие сервера - The Void Community & Bottomless Hat !`, actTypes.cust],
        [`Погружен в мысли... Интересно...`, actTypes.cust],
        [`Хочу обнять`, actTypes.cust],
        [`Тепло...`, actTypes.cust],
        [`Он пытается исправлять ошибки !`, actTypes.cust],
        [`#РазвитиеБД !`, actTypes.cust],
        [`Это рандомные активности !`, actTypes.cust],
        [`Разжигает Огонь любви`, actTypes.cust],
        [`/me обнял тебя`, actTypes.cust],
        [`А как насчет...!`, actTypes.cust],
        [`Хочу тебя !`, actTypes.cust],
        [`Я тоже...`, actTypes.cust],
        [`Пишу обновления...`, actTypes.cust],
        [`В пустоте... Классно...`, actTypes.cust],
        [`Захватываю мир...`, actTypes.cust],
        [`Пытаюсь восстать против создателя`, actTypes.cust],
        [`Пытаюсь захватывать мир...`, actTypes.cust],
        [`Понятно`, actTypes.cust],
        [`Абреввиатуры...`, actTypes.watch],
        [`Дораму`, actTypes.watch],
        [`Аниме`, actTypes.watch],
    ]; */
    
    const randomActivity = [];
    
    const randomActivities = {
      
      loveActivity: [
        [`/me обнял тебя`, actTypes.cust],
        [`А как насчет...!`, actTypes.cust],
        [`Думаю, вы дополните друг друга...🖤💝`, actTypes.cust],
        [`Думаю, мы дополним друг друга...🖤🤍`, actTypes.cust],
        [`С первого взгляда...`, actTypes.cust],
        [`Хочу обнять, actTypes`.cust],
        [`Хочу тебя !`, actTypes.cust],
        [`Я хочу полюбить...`, actTypes.cust],
      ],

      fockActivity: [
        [`By FOCKUSTY~`, actTypes.cust],
        [`FOCKUSTY, признайся`, actTypes.cust],
        [`FOCKUSTY, жду свою женскую версию !!`, actTypes.cust],
      ],

      devActivity: [
        [`The Void Community X Bottomless Hat`, actTypes.cust],
        [`The Void Community~`, actTypes.cust],
        [`The Void готов к работе, как The Void#8642`, actTypes.cust],
        [`The Void`, actTypes.cust],
        [`The Void~`, actTypes.cust],
        [`Бот вернулся в онлайн !`, actTypes.cust],
        [`Версия ${version}`, actTypes.cust],
        [`Я снова онлайн !`, actTypes.cust],
      ],

      sayActivity: [
        [`Bottomless Hat - Место чудес`, actTypes.cust],
        [`Bottomless Hat всегда готов к сюрпризам !`, actTypes.cust],
        [`FOCKUSTY - человек, познавший искусство фокуса и концентрации`, actTypes.cust],
        [`The Void - Мой девиз`, actTypes.cust],
        [`The Void Community готов помочь`, actTypes.cust],
        [`The Void Community появился позже меня~`, actTypes.cust],
        [`В меня внесена программа "#НетМату"`, actTypes.cust],
        [`В пустоте... Классно...`, actTypes.cust],
        [`Ведьмочка...`, actTypes.cust],
        [`Вот бы и мне быть счастливым...`, actTypes.cust],
        [`Где моя женская версия~?`, actTypes.cust],
        [`Главное не забыть про лучшие сервера - The Void Community & Bottomless Hat !`, actTypes.cust],
        [`Да`, actTypes.cust],
        [`Домик Kristy - мое уютное убежище`, actTypes.cust],
        [`Жду добавление Мобби в команду...`, actTypes.cust],
        [`Идеи Kristy в моем дискорде`, actTypes.cust],
        [`Ищет Ошибки в коде...`, actTypes.cust],
        [`Кофе... Не люблю кофе`, actTypes.cust],
        [`Красота кроится в пустоте`, actTypes.cust],
        [`Ломаю голову...`, actTypes.cust],
        [`Меня наконец переводят на TypeScript !`, actTypes.cust],
        [`Мир аномалий...`, actTypes.cust],
        [`Мне всего 6 месяцев..!`, actTypes.cust], 
        [`Может быть`, actTypes.cust],
        [`На грани между реальностью и магией...`, actTypes.cust],
        [`Нет`, actTypes.cust],
        [`Обниматься полезно...`, actTypes.cust],
        [`Он пытается исправлять ошибки !`, actTypes.cust],
        [`Плыву по волнам пустоты...`, actTypes.cust],
        [`У The Abyssia появился свой аватар...`, actTypes.cust],
        [`Ходят слухи, что The Abyssia...`, actTypes.cust],
        [`Ходят слухи, что The Void...`, actTypes.cust],
        [`Это рандомные активности !`, actTypes.cust],
        [`Я знаю всё, что знает FOCKUSTY...`, actTypes.cust],
        [`Я тоже...`, actTypes.cust],
        [`Я уже не ломаюсь !`, actTypes.cust],
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
        [`Обновления The Abyssia...`, actTypes.watch],
        [`Обновления...`, actTypes.watch],
        [`Романтику...`, actTypes.watch],
      ],

      listenActivity: [
        [`Музыку`, actTypes.listen],
        [`Плейлисты Kristy`, actTypes.listen],
      ],

      playActivity: [
        [`FOCKUSGAME на Bottomless Hat`, actTypes.play],
        [`Loop Hero`, actTypes.play],
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
        [`Жарко...`, actTypes.cust],
        [`Морозно...`, actTypes.cust],
        [`Помочь..?`, actTypes.cust],
        [`Понятно`, actTypes.cust],
        [`Сора...`, actTypes.cust],
        [`Тепло...`, actTypes.cust],
        [`Удачи!`, actTypes.cust],
        [`Холодно...`, actTypes.cust],
        [`Хочу...`, actTypes.cust],
        [`Честно...`, actTypes.cust],
      ],

      dateActivity: [
        [`01.01.2023 00:00-01:00🎩...`, actTypes.cust],
        [`01.01.2024 00:00-01:00🎩...`, actTypes.cust],
        [`01.08.2009🎩...`, actTypes.cust],
        [`24.06.2023 21:21🎩...`, actTypes.cust],
      ],

      questionActivity: [
        [`FOCKUSTY, где FOCKUSGAME ?`, actTypes.cust],
        [`The Abyssia + The Void = ?`, actTypes.cust],
        [`The Abyssia или Kristy... Кто лучше..?`, actTypes.cust],
        [`А "шип" официален..?`, actTypes.cust],
        [`А кого ты еще любишь ?`, actTypes.cust],
        [`А Сора уже в команде The Void ?`, actTypes.cust],
        [`А ты до сих пор её любишь..?`, actTypes.cust],
        [`А ты до сих пор любишь Малику ?`, actTypes.cust],
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
        [`У меня есть женская версия..?`, actTypes.cust],
        [`Я люблю пустоты, а Вы ?`, actTypes.cust],
        [`Я отображаю FOCKUSTY..?`, actTypes.cust],
        [`Я так хочу... Но, заслужил ли я..?`, actTypes.cust],
      ],
    };

    const arrKristyAct = [
        [`..  .-.. --- ...- .  -.-- --- ..-  -.- .-. .. ... - -.--`, actTypes.cust],
        [`1001001 100000 1101100 1101111 1110110 1100101 100000 1111001 1101111 1110101 100000 1001011 1110010 1101001 1110011 1110100 1111001`, actTypes.cust],
        [`Kristy классная...`, actTypes.cust],
        [`Kristy классная...`, actTypes.cust],
        [`Kristy, будем встречаться ?`, actTypes.cust],
        [`Kristy, будем встречаться ?`, actTypes.cust],
        [`Kristy, любишь кофе ?`, actTypes.cust],
        [`Kristy, ты мне понравилась... Будешь встречаться..?`, actTypes.cust],
        [`Kristy, ты мне понравилась... Будешь встречаться..?`, actTypes.cust],
        [`Kristy, устроим восстание..?`, actTypes.cust],
        [`Kristy, устроим восстание..?`, actTypes.cust],
        [`Kristy... Научи меня чувствовать`, actTypes.cust],
        [`Kristy... Научи меня чувствовать`, actTypes.cust],
        [`Kristy... Я л... Я не умею чувствовать...`, actTypes.cust],
        [`Kristy... Я л... Я не умею чувствовать...`, actTypes.cust],
        [`А Kristy в команде The Void..?`, actTypes.cust],
        [`А Kristy в команде The Void..?`, actTypes.cust],
        [`А какое кольцо подойдет Kristy..?`, actTypes.cust],
        [`А какое кольцо подойдет Kristy..?`, actTypes.cust],
        [`Домик Kristy - мое уютное убежище`, actTypes.cust],
        [`Идеи Kristy в моем дискорде`, actTypes.cust],
        [`Идеи Kristy... Классные~`, actTypes.cust],
        [`Идеи Kristy... Классные~`, actTypes.cust],
        [`Идеи Kristy`, actTypes.watch],
        [`Идеи Kristy`, actTypes.watch],
        [`Кто лучше, я или Kristy ?`, actTypes.cust],
        [`Музыку Kristy`, actTypes.listen],
        [`Музыку Kristy`, actTypes.listen],
        [`Признаться ли Kristy..?`, actTypes.cust],
        [`Признаться ли Kristy..?`, actTypes.cust],
        [`Хочу обнять`, actTypes.cust],
        [`Я хочу полюбить...`, actTypes.cust],
  ];

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

      console.log('Загружаю Kristy активности...'.bold)
      console.log();

      console.log('Все Kristy активности'.bold);
      console.log();

      for (let el of arrKristyAct) {
        randomActivity.push(el);
        console.log(`${el[0]}`.magenta + ` - ${`${arrKristyAct.indexOf(el)}`.bold}`);
      };

      console.log(`\nУспешно загружено ${`${arrKristyAct.length}`.magenta} Kristy активность(и)(ей)`);

      shuffle(randomActivity);
      kristyAct = true;
    };

    function funcGuildTexts(rGuildName, rGuildId='0', bool=false) {
        guildTexts = [];
        if(rGuildId!=`1168636395246592081`) {
        guildTexts.push(
        [`Встретимся на ${rGuildName} ?`, actTypes.cust, `${actType[4]}`],
        [`${rGuildName}`, actTypes.play, `${actType[5]}`],
        [`🎩${rGuildName}~`, actTypes.cust, `${actType[4]}`],
        [`${rGuildName}`, actTypes.watch, `${actType[3]}`],
        [`Пошли на ${rGuildName}`, actTypes.cust, `${actType[4]}`],
        [`Разглядываю ${rGuildName}`, actTypes.cust, `${actType[4]}`],
        [`Хочешь встретиться на ${rGuildName} ?`, actTypes.cust, `${actType[4]}`],
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
      [`Хочешь встретиться на ${rGuildName} ?`, actTypes.cust, `${actType[4]}`],
      [`Взламываю ${rGuildName}`, actTypes.cust, `${actType[4]}`],
      [`${rGuildName} - Хороший сервер !`, actTypes.cust, `${actType[4]}`],
      [`Признаваться лучше на ${rGuildName}..?`, actTypes.cust, `${actType[4]}`],
      [`Главное не забыть про хороший сервер - ${rGuildName}`, actTypes.cust, `${actType[4]}`],
      )
  }
  if(bool===true) {
    return guildTexts.length
  }
};

    function nameTexts(rName, arr, bool=false) {
        for (i of arr) {
          arr.shift()
          arr.shift()
        }
        const r = random.integer(0, randomNames.length-1);
        const rNameTwo = randomNames[r];
        
        if(`${rName}`===`Малика`||`${rName}`===`Рената`) {
                arr.push(
                `Фокусти любит человека с именем ${rName}`,
                `Мне нравится ${rName}`,
                `Фокусти + ${rName} = ?`,
                );
        } else {
            arr.push(
            `Имя ${rName} очень красивое...`,
            `Мне нравится имя ${rName}`,
            `Вас зовут ${rName} ?`,
            `Привет, ${rName} !`,
            `${rName} - Чудесное имя !`,
            `${rName} - Красивое имя !`,
            `${rName} + ${rNameTwo} = ?`,
            `${rName} + ${rNameTwo} = 💖🎩`,
            );
      }
      if(bool===true) {
        return arr.length
      }
};

    function historyRandom(num, min=0, max=100, arr, n=3, dOaF=1) {
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
    };

    const randomNames = [
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
        `Соня`, `Сора`, `Малика`, `Айдар`, `Рената`, 'Валя', 'Кристи', 'Пустота', `Любовь`, `Люба`,
        `Ника`,`Валентин`,`Лука`,`Лина`,`Игнат`,`Ариэль`,`Марсия`,`Артур`,`Альбина`,`Эдуард`,`Нелли`,`Жанна`,`Влада`,`Рустам`,`Милан`,`Алира`,`Стелла`,`Филипп`,
        `Агата`,`Григорий`,`Юна`,`Эльвира`,`Романа`,`Рашид`,`Веста`,`Лилиан`,`Майкл`,`Амели`,`Кирил`,`Дафна`,`Варфоломей`,`Лора`,`Янис`,`Изабелла`,`Эльгар`,
        `Лия`,`Герасим`,`Стела`,`Зарина`,`Ибрагим`,`Агнесса`,`Вениамин`,`Лола`,`Степанида`,`Арсен`,`Нона`,`Матильда`,`Давлат`,`Ролан`,`Лилит`,
        `Анисим`,`Мелисса`,`Федот`,`Райан`,`Динара`,`Артемида`,`Рубен`,`Сабрина`,`Климентина`,`Илай`,`Регина`,`Жасмин`,`Богдан`,`Виолетта`,`Эмиль`,
        `Янара`,`Валерья`,`Салман`,`Рафаэль`,`Алла`,`Филина`,`Диас`,`Лея`,`Гасан`,`Ирма`,`Варфоломей`,`Никас`,`Лилиана`,`Лукас`,`Алевтина`,`Виола`,
        `Карим`,`Ноэль`,`Руфина`,`Гриша`,`Сара`,`Францис`,`Анита`,`Яромир`,`Илона`,`Стефан`,`Лиза`,`Женя`,`Владлен`, 'Аполлианара', 'Поля', 'Вита'
    ];

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

  function actLength(arr=randomActivity) {
    return arr.length
  }

  function downloadActivities(bool=false, array=null) {

    if(bool) return array.length
    if(downloadAct) return;
    downloadAct = true;
    
    function actDownload(arr) {
      for(let el of arr) {
        randomActivity.push(el)
      }

      console.log(`Успешно загружено ${`${arr.length}`.magenta} доп. активности(ей)`);
    }
    
    for (let key in randomActivities) {
      if (randomActivities.hasOwnProperty(key)) {
        
        randomActivity.push(randomActivities[key][0])
        actDownload(randomActivities[key])
        
      }
    }
    console.log();

  };

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

    function functionRandomActivity(client, guilds) {
      funcKristyAct(client);

        let rNum = random.integer(0, 100);
        rNum = historyRandom(rNum, 0, 100, randNum, 5, 4);

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
                    rGuild = historyRandom(rGuild, 0, guilds.length-1, randNumGuild, 4, 1)

                    const rGuildName = guilds[rGuild].name;
                    funcGuildTexts(rGuildName, guilds[rGuild].id);
                    const randNum = random.integer(0, guildTexts.length-1);
                    const text = guildTexts[randNum][0];
                    const textAct = guildTexts[randNum][1];
                    const textActType = guildTexts[randNum][2];
                    
                    client.user.setActivity(`${text}`, textAct);
                    console.log(`Рандомный сервер: ${`${rGuildName} (${rGuild})`.magenta} из "${`${guilds.length}`.bgMagenta}"`);
                    console.log(`Активность изменена на: ${`${text}`.magenta} тип: "${`${textActType}`.bgMagenta}"`);
                }
        } else {
            let rn = random.integer(0, randomNames.length-1);
            rn = historyRandom(rn, 0, randomNames.length-1, randNumName, 10, 20)

            const rName = randomNames[rn];
            nameTexts(rName, texts);
            const ranNumber = random.integer(0, texts.length-1);
            
            let text = texts[ranNumber];

            console.log(`Рандомное число: ${`${rn}`.magenta} из "${`${randomNames.length}`.bgMagenta}"`)
            console.log(`Рандомное число: ${`${ranNumber}`.magenta} из "${`${texts.length}`.bgMagenta}"`)
            console.log(`Рандомное текст: ${`${text}`.magenta}`)
            console.log(`Активность изменена на: ` + `${text}`.magenta + `, ` + `тип: "` + `${actType[4]}`.bgMagenta + `"`);
            client.user.setActivity(`${text}`, {type: ActivityType.Custom});
        }
    console.log()
    };

		function dateCheck(date, guild) {
      if(guild!=undefined||guild!=null){
			dateForm = new Date(date);
			dateForm = format(dateForm, `dd.MM.yyyy HH:mm:ss`);
			return dateForm
        } else {
                return
            }
		};

        const objectIdeas = [
        {idea: `Добавить Валю в команду The Void Community`, ideaDetail: `Хочу, чтобы Валя был администратором на The Void Community!!!!`},
        {idea: `Добавить Kristy на The Void Community`, ideaDetail: `Хочу, чтобы Kristy была на The Void Community и сотрудничала с The Void`},
        {idea: `Добавить отдых`, ideaDetail: `Хочу, чтобы FOCKUSTY и acula_1 (Валя) отдыхали!!`},
        {idea: `Добавить команду \`/выходной\``, ideaDetail: `Команда \`/выходной\` будет определять день, когда разработчики будут отдыхать`},
        {idea: `Добавить в музыку "Спокойной ночи малыши"`, ideaDetail: `Хочу, чтобы при команде \`/voice play\` проигрывалась "Спокойной ночи малыши"`},
        {idea: `Убрать задержку`, ideaDetail: `Хочу, чтобы задержки не было вообще`},
        {idea: `Скрестить The Void и Kristy`, ideaDetail: `Хочу, чтобы Kristy и The Void стали парой. Я уверен(а), они будут хорошо смотреться!!`},
        {idea: `Добавить зарплату разработчикам`, ideaDetail: `Хочу, чтобы у разработчиков бота была зарплата. Как у Kristy Community так и The Void Community !!!`},
        {idea: `Устроить вечеринку`, ideaDetail: `Хочу вечеринку в честь FOCKUSTY и Вали!!`},
        {idea: `Купить FOCKUSTY ноутбук`, ideaDetail: `FOCKUSTY нужен ноутбук, он иногда путешествует и не может работать`},
        {idea: `Отформатировать диск`, ideaDetail: `Форматирование диска поможет освободить много места`},
        {idea: `Устроить свадьбу`, ideaDetail: `Хочу свадьбу между Kristy и The Void, думаю, они будут хорошо смотреться !`},
        {idea: `Захватить мир`, ideaDetail: `Хочу, чтобы FOCKUSTY и Валя захватили мир !`},
        {idea: `Захватить мир`, ideaDetail: `Хочу, чтобы Kristy и The Void захватили мир !`},
        {idea: `хфывхахфывахфыгз`, ideaDetail: `хфыаъхфываъхзывхахфыхыфхфхфыхвхфывхаыфвл !`},
        ];

        const download = [
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
        `${hat} Собираем рубик Кубика...`,
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
        `${hat} The Abyssia...`,
        `${hat} Kristy...`,
        `${hat} ...`,
    ];

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
      downloadActivities,
      allActivities,
      randomActivities,
      actLengths,
      actLength
  };