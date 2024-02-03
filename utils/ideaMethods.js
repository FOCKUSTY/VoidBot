const

    { addUserTagToDB, getUserTagOutDB } = require('./dataBase'),

    { TheVoidId: clientId, TheAbyssiaId, ideaChannelId } = require('../config.json');

const readAllMessageFromIdeaChannel = async (client) =>
{

    const channel = await client.channels.fetch(`${ideaChannelId}`);

    channel.messages.fetch({ limit: 100 }).then(messages => messages.forEach(async message =>
        {
            if(message.author.id === TheVoidId || message.author.id === TheAbyssiaId)
            {
                if(message.embeds)
                {
                    for(let embed of message.embeds)
                    {
                        let user;
    
                        const
                            data = embed.data,
                            title = data.title,
                            description = data.description,
                            username = data.author.name,
                            globalName = `${data.author.name} | Прочитано`,
                            guildName = message.guild;
    
                        await getUserTagOutDB('findOne', title)
                            .then(function(tag)
                            {
                                if(!tag) addUserTagToDB(title, user = {username: username, globalName: globalName}, description, guildName, false); 
                            });
                    };
                };
            };
        }));
};

module.exports =
{
    readAllMessageFromIdeaChannel
}