const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('thevoid')
		.setDescription('Информация о The Void !'),
	async execute(interaction) {

		let text = `Грязный читер, как ты получил это сообщение ?`
		const random = (Math.round(Math.random() * (8 - 3) + 3))

		if(random === 3) {text = `# :tophat:\n## Готовим печеньки...`
		} else if(random===4){text = `# :tophat:\n## Вырезаем поделки...`
		} else if(random===5){text = `# :tophat:\n## Пишем код...`
		} else if(random===6){text = `# :tophat:\n## Обновляем Windows...`
		} else if(random===7){text = `# :tophat:\n## Жмакаем на клавиши...`
		} else if(random===8){text = `# :tophat:\n## Думаем о великом...`
		} else{text=`# :tophat:\n## Признаемся в любви...`}

		await interaction.reply({
			content: `${text}`, fetchReply: true, ephemeral: true
		})

		const embed = new EmbedBuilder()
		.setColor(0x161618)
		.setTitle('Информация о сообществе The Void')
		.setAuthor({ name: `Bottomless Hat`, iconURL: `https://cdn.discordapp.com/icons/1053295032762908782/c349d0ecbd2d23859aba5b0f7bbec1ae.png` })
		.setDescription(`
		## О The Void:
 The Void - Это сообщество, созданное <@877154902244216852> для объединения некоторых социальных сетей
Главная задача The Void - захватить мир, в хорошем смысле !
Этот проект нацелен на объединение Discord, VK и Telegram в одно большое cообщество
 Также, The Void развлекает и объединяет людей с общими интересами! С ними не скучно, честно !
 Bottomless Hat продвигает сообщество всеми силами! Присоединяйтесь к ним, чтобы помочь в развитии !
Взамен Вы получите новые знакомства (Возможно и вторую половинку)
А также возможность стать значимым человек в сообществе, кто знает, вдруг Вы привнесете больший вклад !

## О владельце:
 FOCKUSTY - Владелец сообщества The Void, а так же главных в нем серверов
Эти сервера называются Bottomless Hat, они есть в Discord, Вконтакте и Telegram
 Сайт и сообщество создал FOCKUSTY своими лапками/палками - Не самый отличный человек, но помните, он всегда говорит правду !
Этот человек может быть эгоистичен, но он никогда не отвернется от пользователей сообщества и в любых ситуациях попробует помочь ! Он любит всех !

В The Void есть три основных сервера:
## [Telegram](<https://t.me/BottomlessHat>)
## [Discord](<https://discord.gg/pw8HgBs2yE>)
## [Vk](<https://vk.com/bottomlesshat>)
# Как вступить ?
## Общее правило:
> Всё предельно просто !
> У вас должен быть Discord сервер, Telegram канал или VK группа
> Вы должны согласиться с [правилами](<https://thevoidservers.webflow.io/about>) сообщества
> Ваш Discord сервер (Telegram канал или VK группа) не должен содержать сексуальный контент (Иключение: Ограничение пользователей с помощью проверки возрастов)
> Ваше название Discord сервера (Telegram канала или VK группы) должен подходить под стилистику сообщества The Void
> Вы должны иметь хотя бы малую активность на сервер (В канале или группе)
> Вы должны модерировать свой сервер (Канал или группу)
## Discord:
> Вы должны иметь хорошую стилистику в Discord
> Вы должны иметь подключенное сообщество на Discord сервере
> У Вас должен быть собственная стилистика Discord сервера (Можно использовать стилистику Bottomless Hat)
> У Вас должны быть боты (Такие как: [JuniperBot](<https://juniper.bot>), [Gusic](<https://gusic.xyz>), [VoiceMaster](<https://voicemaster.xyz> или их аналоги на Discord сервере Telegram. Последние два не обязательны)
## Telegram:
> Вы должы иметь канал с обсуждениями (Коментариями)
> Вы должны публиковать разные новости
## VK:
> Вы должны иметь оригинальную стилистику аватарки и шапки группы
> Группа должна хотя бы просто существовать
		`)
		.setThumbnail(`https://cdn.discordapp.com/icons/1053295032762908782/c349d0ecbd2d23859aba5b0f7bbec1ae.png`)
		.setTimestamp()
		.setFooter({ text: `Id: 1053295032762908782`, iconURL: `https://cdn.discordapp.com/icons/1053295032762908782/c349d0ecbd2d23859aba5b0f7bbec1ae.png` });

		interaction.editReply({content: ``, embeds: [embed], ephemeral: true}
			)
	},
};