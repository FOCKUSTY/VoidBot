const
	{ functionRandomActivity } = require('./randomActivities'),
	{ OneTime } = require('./OneTimeFunction'),
	{ clientId, kristyId, channelWithKristyChattingId, authorId } = require('../config.json')

let count = 0;
let trueWarnMessage = 'Общение и так началось...';
let falseWarnMessage = 'Общение и так закончено...';

let isChatting = false;

const guilds = [];

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
	if(m.author.id!=`${kristyId}`) return;
	
	// const kristyUser = await m.guild?.members?.fetch(`${authorId}`);
	const kristyUser = await m.guild?.members?.fetch(`${kristyId}`);
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
		text
			.then(async function(message)
			{
				await m.reply(`${message}`);
			})
			.catch(function(err) { console.log(err) } );
		count = 0;
	}, 2000);
}

module.exports =
{
	chattingWithKristy,
	getBooleanChatting,
	setBooleanChatting
}

/* const chattingWithKristy = async (m) =>
{
	const client = m.client;

	if(m.channel?.id!=`1175738843203391550`) return;
	// const kristyUser = await m.guild?.members?.fetch(`877154902244216852`);
	const kristyUser = await m.guild?.members?.fetch(`1164228812217790565`);
	const kristyStatus = kristyUser.presence?.status;

	if(kristyStatus===undefined||kristyStatus===null||kristyStatus==='offline') return;
	// if(m.author.id!=`877154902244216852`) return;
	if(m.author.id!=`1164228812217790565`) return;
	if(m.mentions.users.get('1122199797449904179')===undefined) return;
	if(bool_com) return;

	count++;
	if(count>1) return;

	bool_com = textbool(true);

	if(!bool) {
		bool = true;
		client.guilds.cache.forEach(guild => {
			guilds.push(guild)
		});
	};

		const text = functionRandomActivity(client, guilds, true, false);

		m.client.channels.cache.get(m.channel.id).sendTyping();

		sendMessageToKristy(m, text);
}

module.exports =
{
	chattingWithKristy,
	sendMessageToKristy,
	textbool
} */