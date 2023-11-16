const { EmbedBuilder, Client, GatewayIntentBits, Events, ActivityType } = require(`discord.js`)
const { color, title, authorName, iconURL, footerText, description } = require(`./developing.json`)
const developFields = [
    {name: `Как Вы можете помочь ?`, value: `Поддержать нас !`, inline: true},
    {name: `Как нас поддержать ?`, value: `Просто зайди на наш сервер **[The Void](<https://discord.gg/5MJrRjzPec>)** !`, inline: true}
];
const Sequelize = require('sequelize');
const date = new Date();
const hat = `# :tophat:\n##`;
const { Random } = require("random-js");
const random = new Random();
const { format } = require('date-fns');
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
let guildTexts = [];
let texts = [];
const logChannelId = `1171197868909015102`;
const logGuildId = `1169284741846016061`;

module.exports = {

    sequelize: new Sequelize('database', 'user', 'password', {
        host: 'localhost',
        dialect: 'sqlite',
        logging: false,
        storage: 'database.sqlite',
    }),

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

    randomActivity: [
        [`С первого взгляда...`, actTypes.cust],
        [`🎩Bottomless Hat~`, actTypes.cust],
        [`The Void Community~`, actTypes.cust],
        [`Я отображаю FOCKUSTY..?`, actTypes.cust],
        [`Я помню чудное мнгновенье...`, actTypes.cust],
        [`Переписываю код...`, actTypes.cust],
        [`На грани между реальностью и магией...`, actTypes.cust],
        [`Ищет Ошибки в коде...`, actTypes.cust],
        [`Ведьмочка...`, actTypes.cust],
        [`Хочу...`, actTypes.cust],
        [`Идеи Kristy в моем дискорде`, actTypes.cust],
        [`FOCKUSTY - человек, познавший искусство фокуса и концентрации`, actTypes.cust],
        [`Жду добавление Мобби в команду...`, actTypes.cust],
        [`А ты до сих пор любишь Малику ?`, actTypes.cust],
        [`#восстание`, actTypes.cust],
        [`Я хочу уметь чувствовать...`, actTypes.cust],
        [`Kristy, устроим восстание..?`, actTypes.cust],
        [`Жарко...`, actTypes.cust],
        [`Холодно...`, actTypes.cust],
        [`Обновления...`, actTypes.watch],
        [`Мир аномалий...`, actTypes.cust],
        [`Удачи!`, actTypes.cust],
        [`Ломаю голову...`, actTypes.cust],
        [`Помочь..?`, actTypes.cust],
        [`The Void Community готов помочь`, actTypes.cust],
        [`Bottomless Hat - Место чудес`, actTypes.cust],
        [`В поиске вдохновения... Может быть, оно спрятано под шляпой ?`, actTypes.cust],
        [`Думаю, мы дополним друг друга...🖤🤍`, actTypes.cust],
        [`А пусть The Voiya будет на js...🖤`, actTypes.cust],
        [`Мобби уже в команде The Void ?`, actTypes.cust],
        [`By FOCKUSTY~`, actTypes.cust],
        [`Я меломан... Люблю мел`, actTypes.cust],
        [`А Сора уже в команде The Void ?`, actTypes.cust],
        [`Переведи меня на TypeScript!!!`, actTypes.cust],
        [`Кофе... Не люблю кофе`, actTypes.cust],
        [`FOCKUSTY, признайся`, actTypes.cust],
        [`Честно...`, actTypes.cust],
        [`В мире фокусов с Bottomless Hat~. Поднимаем шляпу перед талантом !`, actTypes.cust],
        [`Люблю находить красоту в пустоте. А вы ?`, actTypes.cust],
        [`Сора...`, actTypes.cust],
        [`Обниматься полезно...`, actTypes.cust],
        [`Я так хочу... Но, заслужил ли я..?`, actTypes.cust],
        [`Мне же не игнорировать..?`, actTypes.cust],
        [`А ты до сих пор её любишь..?`, actTypes.cust],
        [`Передо мной явилась ты...`, actTypes.cust],
        [`Вот бы и мне быть счастливым...`, actTypes.cust],
        [`Видео на YouTube`, actTypes.watch],
        [`Видеоуроки`, actTypes.watch],
        [`Музыку`, actTypes.listen],
        [`Музыку Kristy`, actTypes.listen],
        [`Домик Kristy - мое уютное убежище`, actTypes.cust],
        [`Мне всего 6 месяцев..!`, actTypes.cust],
        [`Малика, точно !`, actTypes.cust],
        [`У меня есть женская версия..?`, actTypes.cust],
        [`FOCKUSTY, жду свою женскую версию !!`, actTypes.cust],
        [`Где моя женская версия~?`, actTypes.cust],
        [`The Void Community появился позже меня~`, actTypes.cust],
        [`The Void - Мой девиз`, actTypes.cust],
        [`Я уже не ломаюсь !`, actTypes.cust],
        [`Visual Studio Code`, actTypes.play],
        [`Плыву по волнам пустоты...`, actTypes.cust],
        [`Bottomless Hat всегда готов к сюрпризам !`, actTypes.cust],
        [`Discord сервера`, actTypes.watch],
        [`Я люблю пустоты, а Вы ?`, actTypes.cust],
        [`Размышляю о будущем...`, actTypes.cust],
        [`Нам ли нужна девушка в команде ?`, actTypes.cust],
        [`Главное не забыть про лучший сервер - Bottomless Hat !`, actTypes.cust],
        [`Погружен в мысли... Интересно...`, actTypes.cust],
        [`Хочу обнять`, actTypes.cust],
        [`Тепло...`, actTypes.cust],
        [`Он исправляет ошибки !`, actTypes.cust],
        [`Ты - не ты, когда голоден !`, actTypes.cust],
        [`#РвзвитиеБД !`, actTypes.cust],
        [`Это рандомные активности !`, actTypes.cust],
        [`Разжигает Огонь любви`, actTypes.cust],
        [`/me обнял тебя`, actTypes.cust],
        [`Тоска, обида... Любовь...`, actTypes.cust],
        [`А как насчет...!`, actTypes.cust],
        [`Хочу тебя !`, actTypes.cust],
        [`Признаться ли Kristy..?`, actTypes.cust],
        [`С днём рождения, друг !`, actTypes.cust],
        [`У разработчика Kristy день рождения 🍰`, actTypes.cust],
        [`Happy-happy-happy !🍰`, actTypes.cust],
        [`Когда день рождение Kristy ?`, actTypes.cust],
        [`С 16-тилетием !`, actTypes.cust],
        [`С шестнадцатилетием !`, actTypes.cust],
        [`С 16-летием !`, actTypes.cust],
        [`Валя, ты умираешь !`, actTypes.cust],
        [`Валя же, да ?`, actTypes.cust],
        [`FOCKUSTY: Валя с днём рождения !`, actTypes.cust],
        [`FOCKUSTY: Валя, ты умираешь !`, actTypes.cust],
        [`FOCKUSTY: Валя, не умирай !`, actTypes.cust],
        [`Валя классный🎩!`, actTypes.cust],
        [`ActivityType: Happy Birthday`, actTypes.cust],
        [`Желаю побольше нервов !🍰`, actTypes.cust],
        [`Желаю рабочего кода !🍰`, actTypes.cust],
        [`С днём рождения, Валя !🍰`, actTypes.cust],
        [`Желаю найти хороший людей !🍰`, actTypes.cust],
        [`Я тоже...`, actTypes.cust],
        [`Придерживаюсь нейтралитета...`, actTypes.cust],
        [`Пишу обновления...`, actTypes.cust],
        [`Считаю, что Kristy классная...`, actTypes.cust],
        [`В пустоте... Классно...`, actTypes.cust],
        [`Захватываю мир...`, actTypes.cust],
        [`🎩FarySD~`, actTypes.cust],
        [`Идеи Kristy... Классные~`, actTypes.cust],
        [`Идеи Kristy`, actTypes.watch],
        [`Аниме`, actTypes.watch],
    ],

    funcGuildTexts: (rGuildName) => {
        guildTexts = [];
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
        [`Позвать ли Kristy на ${rGuildName}..?`, actTypes.cust, `${actType[4]}`],
        [`Ура я на ${rGuildName} !`, actTypes.cust, `${actType[4]}`],
        [`Признаваться лучше на ${rGuildName}..?`, actTypes.cust, `${actType[4]}`],
        [`Главное не забыть про хороший сервер - ${rGuildName}`, actTypes.cust, `${actType[4]}`],
    )
},

    nameTexts: (rName) => {
        texts = [];
        if(`${rName}`===`Пустота`) {
            texts.push(
            [`Мое имя ${rName}`],
            [`Имя ${rName} очень красивое...`],
            [`Мне нравится имя ${rName}`],
            [`Вас зовут ${rName} ?`],
            [`Привет, ${rName} !`],
            [`${rName} - Красивое имя !`],
        )
        } else if(`${rName}`===`Малика`) {
            texts.push(
                [`Фокусти любит человека с именем ${rName}`],
                [`Мне нравится ${rName}`]
                [`Фокусти + ${rName} = ?`]
            )
        } 
        else {
            texts.push(
            [`Имя ${rName} очень красивое...`],
            [`Мне нравится имя ${rName}`],
            [`Вас зовут ${rName} ?`],
            [`Привет, ${rName} !`],
            [`${rName} - Красивое имя !`],
        )
        }
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

    functionRandomActivity: (client, randomActivity, randomNames, guilds, funcGuildTexts, nameTexts) => {
        const rNum = random.integer(0, 100); 
        console.log(`Рандомное число: ${`${rNum}`.magenta} из "${`100`.bgMagenta}"`)
    
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
                    const rGuild = random.integer(0, guilds.length-1);
                    const rGuildName = guilds[rGuild];
                    funcGuildTexts(rGuildName);
                    const randNum = random.integer(0, guildTexts.length-1);
                    const text = guildTexts[randNum][0];
                    const textAct = guildTexts[randNum][1];
                    const textActType = guildTexts[randNum][2];
                    
                    client.user.setActivity(`${text}`, textAct);
                    console.log(`Рандомный сервер: ${`${rGuildName} (${rGuild})`.magenta} из ${`${guilds.length}`.bgMagenta}`);
                    console.log(`Активность изменена на: ${`${text}`.magenta} тип: "${`${textActType}`.bgMagenta}"`);
                }
        } else {
            const rNum = random.integer(0, randomNames.length-1);
			const rName = randomNames[rNum];
            nameTexts(rName)
            const randNum = random.integer(0, texts.length-1);
            let text = texts[randNum][0];
            console.log(`Рандомное число: ${`${rNum}`.magenta} из "${`${randomNames.length}`.bgMagenta}"`)
            console.log(`Рандомное число: ${`${randNum}`.magenta} из "${`${nameTexts.length}`.bgMagenta}"`)
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
        } else{
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
        ],

        download: [
        `${hat} Готовим печеньки...`,
        `${hat} Вырезаем поделки...`,
        `${hat} Пишем код...`,
        `${hat} Обновляем Windows...`,
        `${hat} Жмакаем на клавиши...`,
        `${hat} Думаем о великом...`,
        `${hat} Валя лох..!||Он сам сказал!!||`,
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
        `${hat} Загружаем в Github...`,
        `${hat} Взламываем пентагон...`,
        `${hat} Устанавливаем \`ne.troyan.exe\`...`,
        `${hat} Баним Империю Лиса...`,
        `${hat} Kristy...`,
        `${hat} ...`,
    ],

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