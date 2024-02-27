const
	{ functionRandomActivity } = require('./randomActivities'),
	{ OneTime } = require('./OneTimeFunction'),
	{ checkKristyStatus } = require('../utils/activity'),
	{ clientId, kristyId, channelWithKristyChattingId, authorId } = require('../../config.json')

let count = 0;
let trueWarnMessage = 'Общение и так началось...';
let falseWarnMessage = 'Общение и так закончено...';

let isChatting = false;

const guilds = [];

const actType =
{
  'Играет': `Играет в`,
  'Стримит': `Стримит`,
  'Слушает': `Слушает`,
  'Смотрит': `Смотрит`,
  'Кастомный': ``,
  'Соревнуется': `Соревнуется в`
};

const setBooleanChatting = (boolean) =>
{
	if(isChatting === true && boolean === true) return trueWarnMessage;
	if(isChatting === false && boolean === false) return falseWarnMessage;

	isChatting = boolean;
};

class Timer
{
	constructor(name, delay, func, ...value)
	{
		this.name = name;
		this.delay = delay;
		this.func = func;
		this.value = value
		this.timeOut;
	};

	setTimer()
	{
		this.timeOut = setTimeout(() => { this.func(...this.value) }, this.delay);
	};

	clearTimer()
	{
		clearTimeout(this.timeOut);
	};

}

let chattingWithKristyTimer = new Timer('chattingWithKristyTimer', 10000, setBooleanChatting, false);

const getBooleanChatting = () =>
{
	return isChatting;
};

const guildOneTime = new OneTime(false, 'guildsOneTime');

const setGuilds = (client) =>
{
	guildOneTime.oneTimeFunction(true, true, false);

	client.guilds.cache.forEach(guild =>
	{
		guilds.push(guild);
	});
};

const chattingWithKristy = async (m) =>
{
	setBooleanChatting(true);

	chattingWithKristyTimer.clearTimer();	
	chattingWithKristyTimer.setTimer();

	if(m.channel?.id!=`${channelWithKristyChattingId}`) return;
	if(m.mentions.users.get(`${clientId}`)===undefined) return;
	if(!getBooleanChatting()) return;
	// if(m.author.id!=`${authorId}`) return;
	if(m.author.id ===`${kristyId}` || m.author.id ===`${authorId}`)
	{
		const kristyUser = await m.guild?.members?.fetch(`${authorId}`);
		// const kristyUser = await m.guild?.members?.fetch(`${kristyId}`);
		const kristyStatus = kristyUser.presence?.status;
		if(kristyStatus===undefined||kristyStatus===null||kristyStatus==='offline') return;
	
		count++;
		if(count>1) return;
	
		if(!guildOneTime.oneTimeFunction(true, true, true))
		{
			setGuilds(m.client);
		}
	
		const text = functionRandomActivity(m.client, guilds, true, false);
	
		m.client.channels.cache.get(m.channel.id).sendTyping();
	
		setTimeout(async () =>
		{
			let replyed = false;
			text
				.then(async function(message)
				{
					checkKristyStatus(null, `${m.content}`.toLocaleLowerCase(), true)
						.then(async (text) =>
						{
							if(!!text)
							{
								await m.reply(`${actType[`${text[1]}`]} ${text[0]}`);
								replyed = true;
								return;
							};
						})
						.catch((err) => { console.error(err) })

					setTimeout(async () =>
					{
						if(!replyed) await m.reply(`${actType[`${message[1]}`]} ${message[0]}`);
					}, 1000);

				})
				.catch(function(err) { console.log(err) } );
			count = 0;
		}, 2000);
	}
	else return;
}

module.exports =
{
	chattingWithKristy,
	getBooleanChatting,
	setBooleanChatting
}