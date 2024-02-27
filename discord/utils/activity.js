const
  { ActivityType } = require("discord.js"),
  
  {
		token,
		channelWithKristyChattingId,
		authorId,
		logGuildId,
		logChannelId,
		kristyId,
		clientId,
		telegramToken
	} = require('../../config.json'),

  fs = require('fs'),
  path = require('node:path'),

  { replies } = require('../../../VoidDataBase/replyesActivity.json');

const repliesPath = path.join('../../../VoidDataBase/replyesActivity.json')

const actTypes =
{
  play:   {   type: ActivityType.Playing    },
  stream: {   type: ActivityType.Streaming  },
  listen: {   type: ActivityType.Listening  },
  watch:  {   type: ActivityType.Watching   },
  cust:   {   type: ActivityType.Custom     },
  comp:   {   type: ActivityType.Competing  },
};

const actType =
{
  'actTypes.play': `Играет`,
  'actTypes.stream': `Стримит`,
  'actTypes.listen': `Слушает`,
  'actTypes.watch': `Смотрит`,
  'actTypes.cust': `Кастомный`,
  'actTypes.comp': `Соревнуется`
};

let repliesSync;

const setActivity = (client, activity = 'Привет!', activityType = 'actTypes.play') =>
{
  const actType = eval(activityType);

  console.log(`Устанавливаю активность: ${activity}`)

  client.user.setActivity(`${activity}`, actType);
}

const checkKristyStatus = async (client, kristyActivity, textActivity=false) =>
{
  try
  {
    let json = await fs.readFileSync(repliesPath);

    await eval(`repliesSync = ${json}`);

    for(let reply in repliesSync.replies)
    {
      if(`${kristyActivity}`?.toLowerCase()?.indexOf(`${reply}`) != -1)
      {
        if(textActivity) return await [repliesSync.replies[reply][0], actType[repliesSync.replies[reply][1]]];

        setTimeout(() =>
        {
          setActivity(client, repliesSync.replies[reply][0], repliesSync.replies[reply][1])
        }, 10000);
        return true;
      }
      else continue;
    }
    return false;
  }
  catch (err)
  {
    console.log(err)
  }
}

const presenceListener = (newPresence, oldActivity, client) =>
{
  if(newPresence.userId === kristyId || newPresence.userId === authorId)
	{
		for(let activity of newPresence.activities)
		{
			if(activity.name === 'Custom Status')
			{
				if(oldActivity != activity.state)
				{
					oldActivity = activity.state;
					checkKristyStatus(client, `${activity.state}`.toLocaleLowerCase());
				}
				else return;
			}
		};
	}
	else return;
}

module.exports =
{
  setActivity,
  checkKristyStatus,
  presenceListener
}