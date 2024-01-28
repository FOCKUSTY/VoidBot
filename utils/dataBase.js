const { Sequelize } = require('sequelize');

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

const addUserTagToDB = async (title, user, detail, guild) =>
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
    
        console.log(
        `Тег идеи успешно добавлен\
        Название: ${tag.name}\
        Описание: ${tag.description}\
        Отправил: ${tag.username}\
        С сервера: ${tag.guildname}`
        )
    }
    catch (err)
    {
        console.log('Ошибка с добавлением тега');
        console.log(err);
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
    Tags,
    addUserTagToDB,
    getUserTagOutDB
}