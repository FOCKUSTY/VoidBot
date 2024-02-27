const
    {
        token,
        channelWithKristyChattingId,
        authorId,
        logGuildId,
        logChannelId,
        kristyId,
        clientId,
        telegramToken
    } = require('../../../config.json'),
    
    {
        msgPing
    } = require('../msgPing'),

    {
        chattingWithKristy
    } = require('../chatting'),

    {
        getLogGuild
    } = require('../dataBase'),

    {
        sendMessageLog
    } = require('../messageLog'),

    {
        checkMessageToRead
    } = require('../develop');

let isTalkingEnabled = true;

const messageDeleteLog = (m, sendMessageLog) =>
{
    getLogGuild('findAll')
    .then((guildId) =>
    {
        getLogGuild('findOne', guildId)
            .then(async (data) =>
            {
                if(data?.optionupdate && (data.guildid === m.guild.id) )
                {
                    await sendMessageLog(m, "update", undefined, `${data.guildid}`, `${data.channellogid}`)
                }
            });
    });

    sendMessageLog(m, "delete", undefined, logGuildId, logChannelId);
};
const messageUpdateLog = (m, nm, sendMessageLog) =>
{
	getLogGuild('findAll')
		.then((guildId) =>
		{
			getLogGuild('findOne', guildId)
				.then(async (data) =>
				{
					if(data?.optionupdate && (data.guildid === m.guild.id) )
					{
						await sendMessageLog(m, "update", nm, `${data.guildid}`, `${data.channellogid}`)
					}
				});
		});

	sendMessageLog(m, "update", nm, logGuildId, logChannelId);
};

let oldMessageContent;
let oldAuthorId;

const messageCreateLog = (message) =>
{
    if(message.channel.type === 1)
	{
	}
	else
	{
		sendMessageLog(message, "send", undefined, logGuildId, logChannelId);
		
		if(message.mentions.users.get(`${authorId}`)) msgPing(message);
		if(isTalkingEnabled) if(message.channel.id===`${channelWithKristyChattingId}`) chattingWithKristy(message);

        if(!message.author.bot)
        {

            if(oldAuthorId != message.author.id)
            {
                if(
                    (`${oldMessageContent}`.toLowerCase() === `${message.content}`.toLowerCase())
                    &&
                    (`${oldMessageContent}`.toLowerCase().indexOf('понятно') != -1 && `${message.content}`.toLowerCase().indexOf('понятно') != -1)
                  ) message.channel.send('Понятно');

                  oldMessageContent = message.content;
                  oldAuthorId = message.author.id;
            }
        };
	};
}

const enableTalking = (value = true) =>
{
    isTalkingEnabled = value;
    return isTalkingEnabled;
}

module.exports =
{
    messageDeleteLog,
    messageUpdateLog,
    messageCreateLog,
    enableTalking
}