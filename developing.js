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

    randomActivity: [
        [`🎩Bottomless Hat~`, {type: ActivityType.Custom}],
        [`Ура, я в Домике Kristy~`, {type: ActivityType.Custom}],
        [`The Void Community~`, {type: ActivityType.Custom}],
        [`Kristy Community~`, {type: ActivityType.Custom}],
        [`Переписываю код...`, {type: ActivityType.Custom}],
        [`Обновления...`, {type: ActivityType.Watching}],
        [`Ломаю голову...`, {type: ActivityType.Custom}],
        [`Visual Studio Code`, {type: ActivityType.Playing}],
        [`Размышляю о будущем...`, {type: ActivityType.Custom}],
        [`Жду компиляции кода...`, {type: ActivityType.Custom}],
        [`Kristy... 🎩...`, {type: ActivityType.Custom}],
        [`Пишу обновления...`, {type: ActivityType.Custom}],
        [`🎩FarySD~`, {type: ActivityType.Custom}],
    ],

    functionRandomActivity: (client, randomActivity, guilds) => {
        const rNum = random.integer(0, 100); 
    
        if(rNum>10) {
            
            const i = random.integer(0, randomActivity.length-1);
            const randomAct = randomActivity[i][0];
            const randomActType = randomActivity[i][1];
            let numRandomActType = randomActivity[i][1].type
            if(numRandomActType===0) {numRandomActType=`Играет`}
            else if(numRandomActType===1) {numRandomActType=`Стримит`}
            else if(numRandomActType===2) {numRandomActType=`Слушает`}
            else if(numRandomActType===3) {numRandomActType=`Смотрит`}
            else if(numRandomActType===4) {numRandomActType=`Кастомный`}
            else if(numRandomActType===5) {numRandomActType=`Соревнуется`}
    
            client.user.setActivity(`${randomAct}`, randomActType);
    
            console.log(`Активность изменена на: ${`${randomAct}`.magenta}, тип: "${`${numRandomActType}`.bgMagenta}"`);
        } else {
    
            const rGuild = random.integer(0, guilds.length-1);
            const rGuildName = guilds[rGuild];
    
            client.user.setActivity(`${rGuildName}`, {type: ActivityType.Watching});
            console.log(`Активность изменена на: ${`Смотрит ${rGuildName}`.magenta}`)
        }},

		dateCheck: (date) => {
			dateForm = new Date(date);
			dateForm = format(dateForm, `dd.MM.yyyy HH:mm:ss`);
			return dateForm
		},

        objectIdeas: [
        {idea: `Добавить Валю в команду The Void Community`, ideaDetail: `Хочу, чтобы Валя был администратором на The Void Community!!!!`},
        {idea: `Добавить Kristy на The Void Community`, ideaDetail: `Хочу, чтобы Kristy была на The Void Community и сотрудничала с The Void`},
        {idea: `Добавить отдых`, ideaDetail: `Хочу, чтобы FOCKUSTY и acula_1 (Валя) отдыхали!!`},
        {idea: `Добавить команду \`/выходной\``, ideaDetail: `Команда \`/выходной\` будет определять день, когда разработчики будут отдыхать`},
        {idea: `Добавить в музыку "Спокойной ночи малыши"`, ideaDetail: `Хочу, чтобы при команде \`/voice play\` проигрывалась "Спокойной ночи малыши"`},
        {idea: `Убрать задержку`, ideaDetail: `Хочу, чтобы задержки не было вообще`},
        {idea: `Скрестить The Void и Kristy`, ideaDetail: `Хочу, чтобы Kristy и The Void стали парой. Я уверен(а), они будут хорошо смотреться!!`},
        {idea: `Добавить зарплату разработчикам`, ideaDetail: `Хочу, чтобы у разработчиков бота была зарплата. Как у Kristy Community так и The Void Community !!! А то не справедливо, что разработчики стараюсь и просто так`},
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
        `${hat} ...`,
    ],
};