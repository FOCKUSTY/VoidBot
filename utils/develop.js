const
{
  EmbedBuilder
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

module.exports =
{
  setDevelop,
  getDevelop,
  setDevelopClient,
  getDevelopClient,
  iconURL,
  authorName,
  footerText,
  description,
  title,
  color,
}