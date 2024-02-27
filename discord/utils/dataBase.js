const { Sequelize, DataTypes } = require('sequelize');
const { debug, skip } = require('./deployCommands')

const sequelize = new Sequelize('database', 'user', 'password',
{
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const Tags = sequelize.define('tags',
{
    name:
    {
        type: Sequelize.STRING,
        unique: true,
    },
    username: Sequelize.STRING,
    globalname: Sequelize.STRING,
    description: Sequelize.TEXT,
    guildname: Sequelize.TEXT,
});

const logMessagesSchema = sequelize.define('logmessagesschema',
{
    guildid:
    {
        type: DataTypes.STRING,
        unique: true
    },
    optiondelete: DataTypes.BOOLEAN,
    optionupdate: DataTypes.BOOLEAN,
    guildname: DataTypes.STRING,
    channellogid: DataTypes.STRING,
    islogenable: DataTypes.BOOLEAN
})

const deleteTable = async (table) =>
{
    await table.drop();
    return;
};

const showAllTables = async() =>
{
    console.log(sequelize)
}

const addNewLogGuild = async (guildid, optiondelete, optionupdate, guildname, channellogid, islogenable, log=true) =>
{
    try
    {        
        const logGuild = await logMessagesSchema.create
        ({
            guildid: `${guildid}`,
            optiondelete: optiondelete,
            optionupdate: optionupdate,
            guildname: `${guildname}`,
            channellogid: `${channellogid}`,
            islogenable: `${islogenable}`
        });

        if(log) console.log(
            `Канал логирования был добавлен\nГильдия: ${logGuild.guildname} - ${logGuild.guildid}\nКанал: ${logGuild.channellogid}\nОпции:\n`, logGuild.optiondelete, logGuild.optionupdate
        );
    }
    catch (err)
    {
        console.log(err);
    }
}

const updateGuildLog = async (guildid,  optiondelete, optionupdate, channellogid, islogenable, log=true) =>
{
    try
    {
        const updatedLog = await logMessagesSchema.update
            ({
                optiondelete: optiondelete,
                optionupdate: optionupdate,
                channellogid: channellogid,
                islogenable: islogenable,
            },

            { where: { guildid: guildid } }
        );
    }
    catch (err)
    {
        console.log(err)
    }
};

const getLogGuild = async (findType='findAll', logId) =>
{
    if(findType==='findAll')
    {
        const
            tagList = await logMessagesSchema.findAll({ attributes: ['guildid'] }),
            tagString = tagList.map(t => t.guildid).join('\n') || 'Нет тегов';
        
        return await tagString;
    }
    else if(findType==='findOne')
    {
        const tag = await logMessagesSchema.findOne({ where: { guildid: logId } });
        
        return await tag;
    }
}

const addUserTagToDB = async (title, user, detail, guild, log=true) =>
{
    try
    {
        const tag = await Tags.create
        ({
            name: title,
            username: user.username,
            globalname: user.globalName,
            description: detail,
            guildname: guild?.name||`Не на сервере`
        });
    
        if(log) console.log(
        `Тег идеи успешно добавлен\n
        Название: ${tag.name}\n
        Описание: ${tag.description}\n
        Отправил: ${tag.username}\n
        С сервера: ${tag.guildname}`
        )
    }
    catch (err)
    {
        if(log) console.log('Ошибка с добавлением тега');
        if(log) console.log(err);
    }
};

const getUserTagOutDB = async (findType='findAll', tagName) =>
{
    if(findType==='findAll')
    {
        const
            tagList = await Tags.findAll({ attributes: ['name'] }),
            tagString = tagList.map(t => t.name).join('\n') || 'Нет тегов';
        
        return await tagString;
    }
    else if(findType==='findOne')
    {
        const tag = await Tags.findOne({ where: { name: tagName } });
        
        return await tag;
    }
}

module.exports =
{
    sequelize,

    Tags,
    logMessagesSchema,

    addUserTagToDB,
    getUserTagOutDB,
    
    addNewLogGuild,
    getLogGuild,

    deleteTable,
    updateGuildLog
};