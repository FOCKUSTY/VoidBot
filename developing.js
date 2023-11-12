const { EmbedBuilder, Client, GatewayIntentBits, Events, ActivityType } = require(`discord.js`)
const { color, title, authorName, iconURL, footerText, description } = require(`./developing.json`)
const developFields = [
    {name: `Как Вы можете помочь ?`, value: `Поддержать нас !`, inline: true},
    {name: `Как нас поддержать ?`, value: `Просто зайди на наш сервер **[The Void](<https://discord.gg/5MJrRjzPec>)** !`, inline: true}
];
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

module.exports = {
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
        [`Ура, я в Домике Kristy~`, actTypes.cust],
        [`Nomika - Русский араб`, actTypes.cust],
        [`Nomika - Русский шейх`, actTypes.cust],
        [`The Void Community~`, actTypes.cust],
        [`Kristy Community~`, actTypes.cust],
        [`Я отображаю FOCKUSTY..?`, actTypes.cust],
        [`Переписываю код...`, actTypes.cust],
        [`На грани между реальностью и магией...`, actTypes.cust],
        [`Мой создатель - Великий человек...`, actTypes.cust],
        [`Ищет Ошибки в коде...`, actTypes.cust],
        [`Мобби уже не Ведьма(`, actTypes.cust],
        [`Идеи Kristy в моем дискорде`, actTypes.cust],
        [`FOCKUSTY - искусство фокуса и концентрации`, actTypes.cust],
        [`Холодно...`, actTypes.cust],
        [`Обновления...`, actTypes.watch],
        [`🎩Bottomless Hat~ Здесь каждый момент — как волшебство под таинственной шляпой🎩`, actTypes.cust],
        [`Ломаю голову...`, actTypes.cust],
        [`Bottomless Hat - Место чудес`, actTypes.cust],
        [`В поиске вдохновения... Может быть, оно спрятано под шляпой ?`, actTypes.cust],
        [`Мобби уже в команде The Void ?`, actTypes.cust],
        [`By FOCKUSTY~`, actTypes.cust],
        [`Я меломан... Люблю мел`, actTypes.cust],
        [`Честно...`, actTypes.cust],
        [`В мире фокусов с Bottomless Hat~. Поднимаем шляпу перед талантом !`, actTypes.cust],
        [`Люблю находить красоту в пустоте. А вы ?`, actTypes.cust],
        [`Сора...`, actTypes.cust],
        [`FOCKUSTY — мой девиз`, actTypes.cust],
        [`Вот бы и мне быть счастливым...`, actTypes.cust],
        [`Домик Kristy - мое уютное убежище`, actTypes.cust],
        [`У меня есть женская версия..?`, actTypes.cust],
        [`FOCKUSTY, жду свою женскую версию !!`, actTypes.cust],
        [`🎩~`, actTypes.cust],
        [`The Void Community появился позже меня~`, actTypes.cust],
        [`Почему меня постоянно ломают..?`, actTypes.cust],
        [`Visual Studio Code`, actTypes.play],
        [`Осваиваю просторы Домика Kristy...`, actTypes.cust],
        [`Плыву по волнам пустоты...`, actTypes.cust],
        [`Как волшебник с Bottomless Hat~ - всегда готов к сюрпризам !`, actTypes.cust],
        [`Я люблю пустоты, а Вы ?`, actTypes.cust],
        [`Размышляю о будущем...`, actTypes.cust],
        [`Главное не забыть про лучший сервер - Bottomless Hat !`, actTypes.cust],
        [`Погружен в мысли... Интересно...`, actTypes.cust],
        [`Тепло...`, actTypes.cust],
        [`Жду компиляции кода...`, actTypes.cust],
        [`Kristy... 🎩...`, actTypes.cust],
        [`Пишу обновления...`, actTypes.cust],
        [`В пустоте... Классно...`, actTypes.cust],
        [`Придумываю идеи...`, actTypes.cust],
        [`🎩FarySD~`, actTypes.cust],
        [`Идеи Kristy... Классные~`, actTypes.cust],
    ],

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
    ],

    functionRandomActivity: (client, randomActivity, randomNames, guilds) => {
        const rNum = random.integer(0, 100); 
        const actType = [`Играет`, `Стримит`, `Слушает`, `Смотрит`, `Кастомный`, `Соревнуется`]
        console.log(`Рандомное число: ${`${rNum}`.magenta} из "${`100`.bgMagenta}"`)
    
        if(rNum>=10) {
            const i = random.integer(0, randomActivity.length-1);
            const randomAct = randomActivity[i][0];
            const randomActType = randomActivity[i][1];
            const numRandomActType = actType[randomActivity[i][1].type];
    
            client.user.setActivity(`${randomAct}`, randomActType);
    
            console.log(`Рандомное число: ${`${i}`.magenta} из "${`${randomActivity.length}`.bgMagenta}"`);
            console.log(`Активность изменена на: ${`${randomAct}`.magenta}, тип: "${`${numRandomActType}`.bgMagenta}"`);
        } else {
            if(rNum>=5) {
                if(rNum<=2) {
                    const guildsCount = `${guilds.length}`
                    let gcpeNums = [`2`,`3`,`4`,`5`,`6`,`7`,`8`,`9`]
                    let end;
                    let gcpe = guildsCount[guildsCount.length-2];
                    let gce = guildsCount[guildsCount.length-1];
                    if(guildsCount===1){end=`е`}
                    else {
                        end=`ах`
                        if(guildsCount>=10){
                            for (gcpeNum in gcpeNums) {
                                if(gcpe===gcpeNum) {
                                    if(gce===`1`) {
                                        end=`е`
                                    }
                                }
                            }
                        }
                    }
                    const text = `сервер` + end;
                    client.user.setActivity(`Я на ` + `${guildsCount}`.magenta + `${text}`)
                } else {
                    const rGuild = random.integer(0, guilds.length-1);
                    const rGuildName = guilds[rGuild];
                    
                    client.user.setActivity(`${rGuildName}`, {type: ActivityType.Watching});
                    console.log(`Рандомный сервер: ${`${rGuildName} (${rGuild})`.magenta} из ${`${guilds.length}`.bgMagenta}`);
                    console.log(`Активность изменена на: ${`Смотрит ${rGuildName}`.magenta} тип: "${`${actType[3]}`.bgMagenta}"`);
                }
        } else {
			const rNum = random.integer(0, randomNames.length-1);
			const rName = randomNames[rNum];
            client.user.setActivity(`Рандомное имя: ${rName}`, {type: ActivityType.Custom});
            console.log(`Рандомное имя: ` + `${rName}`.magenta + `, ` + `тип: "` + `${actType[4]}`.bgMagenta + `"`);
        }}
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
        {idea: `Отформатировать диск`, ideaDetail: `Форматирование диска поможет освободить много места, чтобы FOCKUSTY мог написать очень-очень-очень-очень-очень-очень-очень-очень много команд`},
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
};