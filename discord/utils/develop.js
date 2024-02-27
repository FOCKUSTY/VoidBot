const
  {
    EmbedBuilder,
    PermissionsBitField,
    ButtonBuilder, ButtonStyle,
    ActionRowBuilder
  } = require('discord.js');

const developFields =
[
    {
        name: `Как Вы можете помочь ?`,
        value: `Поддержать нас !`,
        inline: true
    },

    {
        name: `Как нас поддержать ?`,
        value: `Просто зайди на наш сервер **[The Void](<https://discord.gg/5MJrRjzPec>)** !`,
        inline: true
    }
];

const responsiable = new Map();
const readMessage = new Map();

let
  iconURL = 'https://cdn.discordapp.com/icons/1169284741846016061/63ff0e27c4c5de492894df065ef72266.png',
  authorName = 'The Void',
  footerText = 'id: 1169284741846016061',
  description = 'Эта функция пока что находится в разработке...',
  title = 'Функция в разработке...',
  color =  0x161618;

let
  developEmbed,
  developClient;

const setDevelop = async (client) =>
{
  if (client)
  {
    const userId = await client.user.id;
    const userAvatar = await client.user.avatar;
    iconURL = `https://cdn.discordapp.com/avatars/${userId}/${userAvatar}.png`;
    authorName = await client.user.username;
  };
      
  developEmbed = new EmbedBuilder()
    .setColor(color)
    .setTitle(`${title}`)
    .setAuthor({name: `${authorName}`, iconURL: `${iconURL}`})
    .setDescription(`${description}`)
    .setThumbnail(`${iconURL}`)
    .setFields(developFields)
    .setTimestamp()
    .setFooter({text: `${footerText}`, iconURL: `${iconURL}`});
};
  
const getDevelop = (getter = 'developEmbed') =>
{

  getter = getter.toLocaleLowerCase()

  switch (getter)
  {
    case 'developembed':
      return developEmbed;
    
    case 'iconurl':
      return iconURL;
    
    case 'authorname':
      return authorName;

    case 'color':
      return color;
  
    default:
      return developEmbed;
  }
};

const setDevelopClient = (client) =>
{
  developClient = client;
};

const getDevelopClient = () =>
{
  return developClient;
};

const check_I_HasUserInDiscord = async id =>
{ 
  let isHasDiscordId = false;

  await developClient.guilds.cache.forEach(async guild =>
  {
    try
    {
      const member = await guild.members.fetch(`${id}`);

      if(member)
      {
        isHasDiscordId = true;
        return isHasDiscordId;
      };
    } catch {};
  });

  return isHasDiscordId;
};

const check_I_HasChannelInDiscord = async id =>
{
  let isHasDiscordId = false;

  try
  {
    const channel = await developClient.channels.fetch(`${id}`);
    
    if(channel) isHasDiscordId = true;
  }
  catch (err)
  {
    return false;
  };

  return isHasDiscordId;
}

const checkMessageToRead = async message =>
{
  const isRead = readMessage.get(`${message.author.id}|dmchannel|account`);

  if(isRead) return await message;
  else
  {
    readMessage.set(`${message.author.id}|dmchannel|account`, false);
    return false
  }
};

const sendMessageToUser = async (id, message) =>
{
  try
  {
    let user;
    await developClient.guilds.cache.forEach(async guild =>
      {
        try
        {
          const member = await guild.members.fetch(`${id}`);
    
          if(member)
          {
            user = member.user;
            return;
          };
        }
        catch {};
      });

      await readMessage.set(`${user?.id}|dmchannel|подтверждения аккаунта`, 'true');

      setTimeout(async () =>
      {
        await responsiable.set(`${message?.author?.id}`, false)
        await readMessage.set(`${message?.author?.id}|dmchannel|подтверждения аккаунта`, false)
      }, 50000);

      const confirm = new ButtonBuilder()
			  .setCustomId('confirm-telegram')
			  .setLabel('Принять')
			  .setStyle(ButtonStyle.Success);

		  const cancel = new ButtonBuilder()
			  .setCustomId('cancel-telegram')
			  .setLabel('Отклонить')
			  .setStyle(ButtonStyle.Danger);

      const row = new ActionRowBuilder()
        .addComponents(cancel, confirm);

      await user.send( { content: `${message}\nНажмите на одну из кнопок`, components: [row] } );
      return await { text: 'Жду подтверждения', type: "wait" };
  }
  catch (err)
  {
    console.log(err)
    return await { text: 'Я не смог написать Вам в личные сообщения, попробуйте их открыть >> Error', type: 'error' };
  }
}

const getDiscordUser = async id =>
{
  let discordUser = undefined;

  await developClient.guilds.cache.forEach(async guild =>
    {
      try
      {
        const member = await guild.members.fetch(`${id}`);
  
        if(member)
        {
          discordUser = member;
          return;
        };
      }
      catch {};
    });

    return await discordUser;
}

const sendMessage = async (message, channelId, options) =>
{
  const channel = await developClient.channels.fetch(`${channelId}`);

  try
  {
   if(options) await channel.send(options);
   else await channel.send(`${message}`);

   return `Сообщение было отправлено в ${channel.name} !`;
  }
  catch (err)
  {
    console.log(err);
    return 'Error << Произошла ошибка на стороне сервера';
  };
}

module.exports =
{
  setDevelop,
  getDevelop,
  setDevelopClient,
  getDevelopClient,

  check_I_HasChannelInDiscord,
  check_I_HasUserInDiscord,
  getDiscordUser,
  
  checkMessageToRead,

  sendMessageToUser,
  sendMessage,
  
  iconURL,
  authorName,
  footerText,
  description,
  title,
  color,

  readMessage,
  responsiable
}