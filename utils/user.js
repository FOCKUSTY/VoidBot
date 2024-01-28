const { pseudoRandomNumber } = require('./pseudoRandom')

const
    users = new Map(),
    guilds = new Map(),
    userInformations = new Map(),
    userInformationsCache = [],
    userInformationsHistoryArray = [];

const setUsernames = async(client, guildIds=[]) =>
{
    if(guildIds.length===0) for(let guild of await client.guilds.cache) guildIds.push(guild[0]); 

    guildCicle: for (let guildId of guildIds)
    {
        const guild   = await client.guilds.fetch(`${guildId}`);
        const members = await guild.members.cache;

        let guildUser;

        userCicle: for(let member of members)
        {
            guildUser = await guild.members.fetch(`${member[1].user.id}`);
            
            if(guildUser?.user?.bot) continue userCicle;
            if(!guildUser?.presence?.status) continue userCicle;

            if(guildUser.user.globalName) userInformations.set(`${guildUser.user.id}`, [`${guildUser.user.globalName}`, [`${guild.id}`, `${guild.name}`]]);
            else userInformations.set(`${guildUser.user.id}`, [`${guildUser.user.username}`, [`${guild.id}`, `${guild.name}`]]);
        };
    };
    for(let i of userInformations) userInformationsCache.push(i) 
};

const getUsernames = (isCache=false) =>
{
    if(isCache) return [...userInformations];
    else if(!isCache) return [...userInformations];
};

const getRandomUserInformation = (info='username') =>
{
    const randomNumber = pseudoRandomNumber(0, userInformations.size-1, 2, 3, userInformationsHistoryArray, undefined, undefined, true, true, true);
    const key = Array.from(userInformations.keys())[randomNumber];
    
    info = info.toLocaleLowerCase();

    switch (info)
    {
        
        case 'username':
            return userInformations.get(key)[0];
        
        case 'userid':
            return key
        
        case 'guildid':
            return userInformations.get(key)[1][0];
        
        case 'guildname':
            return userInformations.get(key)[1][1];
        
        case 'userid-guildid':
            return [key, userInformations.get(key)[1][0]];
        
        case 'userid-guildid-username':
            return [key, userInformations.get(key)[1][0], userInformations.get(key)[0]];
        
        case 'userid-guildid-username-guildname':
            return [key, userInformations.get(key)[1][0], userInformations.get(key)[0], userInformations.get(key)[1][1]];
    
        default:
            return userInformations.get(key)[0];;
    };
};

const setUser = async(client, guildId, userId, userName=undefined) =>
{
    const guild  = await client.guilds.fetch(`${guildId}`);
    const member = await guild.members.fetch(`${userId}`);
    users.set(userName, member)
    return;
};

const getUser = async(userName) =>
{
    return await users.get(userName);
};

const getUsers = async() =>
{
    return await users;
}

class User
{
    constructor (userId, userName, globalName, guildId)
    {
        this.userId = userId;
        this.userName = userName;
        this.globalName = globalName;
        this.guildId = guildId;
        this.user = undefined;
    };

    async setUser(client)
    {
        const guild  = await client.guilds.fetch(`${this.guildId}`)
        const member = await guild.members.fetch(`${this.userId}`);
        this.user = member;
        return;
    };

    async getUser()
    {
        return await this.user;
    };
};

class Guild
{
    constructor(guildId, guildName)
    {
        this.guildId = guildId;
        this.guildName = guildName;
        this.guild = undefined;
    };

    async setGuild(client)
    {
        const guild = client?.guilds.fetch(`${this.guildId}`);
        this.guild = guild;
    };

    async getGuild()
    {
        return await this.guild;
    };
}

module.exports =
{
    User,
    Guild,
    setUser,
    getUser,
    getUsers,
    setUsernames,
    getUsernames,
    getRandomUserInformation
}