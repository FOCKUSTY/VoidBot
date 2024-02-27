const { Sequelize, DataTypes } = require('sequelize');
const { debug, skip } = require('../discord/utils/developConsole')
const { unHash, enterPassword } = require('../../VoidDataBase/hash/hashing')

const sequelize = new Sequelize('database', 'user', 'password',
{
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const telegramIdentifierToken = sequelize.define('telegramidentifiertoken',
{
    telegramid:
    {
        type: DataTypes.STRING,
        unique: true
    }
});

const multiplatform = sequelize.define('multiplatform',
{
    telegramid:
    {
        type: DataTypes.STRING,
        unique: true
    },

    discordid:
    {
        type: DataTypes.STRING,
        unique: true
    },

    telegramname: DataTypes.STRING,
    discordname: DataTypes.STRING,

    password: DataTypes.STRING,
})

const addAccountToTelegramIdenty = async (telegramId, log=true, errLog=true) =>
{
    try
    {
        const account = telegramIdentifierToken.create
        ({
            telegramid: telegramId
        });

        if(log) console.log(`Токен добавлен у ${telegramId}`)

        console.log(tag)

    }
    catch (err)
    {
        if(errLog) console.error(err)
    };
};

const getAccountToTelegramIdentyFromToken = async id =>
{
    const tag = await telegramIdentifierToken.findOne({ where: { id: id } });

    return tag;
};

const getAccountToTelegramIdentyFromTelegramId = async telegramId =>
{
    const tag = await telegramIdentifierToken.findOne({ where: { telegramid: telegramId } });

    return tag;
};

const addNewAccountToMultiplatform = async (telegramId, discordId, telegramName, discordName, password, log=true) =>
{
    try
    {   
        let isAccountExists = false;

        await getMulityAccount('findOne', discordId).then(account =>
        {
            if(!!account) isAccountExists = true;
        });

        if(isAccountExists) return await 'Error << Аккаунт уже существует';

        const multiAccount = await multiplatform.create
        ({
            telegramid: `${telegramId}`,
            discordid: `${discordId}`,
            telegramname: `${telegramName}`,
            discordname: `${discordName}`,
            password: `${password}`
        });

        const text =
        `Мульти аккаунт был добавлен. TId: ${multiAccount.telegramid}, DId: ${multiAccount.discordid}\n` +
        `TName: ${multiAccount.telegramname}, DName: ${multiAccount.discordname}\n` +
        `Пароль заскречен`

        if(log) console.log(text);
        
        return await text;
    }
    catch (err)
    {
        console.log(err);
        return 'Error << Ошибка на стороне сервера';
    };
};

const updateAccountInMultiplatform = async (telegramId, discordId, telegramName, discordName, password, log=true) =>
{
    try
    {
        let isAccountExists = false;

        await getMulityAccount('findOne', discordId).then(account =>
        {
            if(!!account) isAccountExists = true;
        });

        if(!isAccountExists) return await 'Error << Аккаунт не найден';

        let response;

        await getMulityAccount('findOne', discordId)
            .then(async multiAccount =>
            {
                if(unHash(multiAccount?.dataValues?.password) === unHash(password))
                {
                    const updatedAccount = await multiplatform.update
                        ({
                            telegramid: telegramId,
                            discordid: discordId,
                            telegramname: telegramName,
                            discordname: discordName,
                            password: password,
                        },
                    
                        { where: { telegramid: telegramId, discordid: discordId } }
                    );

                    console.log(unHash(password))
                    console.log(unHash(multiAccount?.dataValues?.password))

                    const text = `Мульти аккаунт был обновлен. TId: ${telegramId}, DId: ${discordId}\n` +
                    `TName: ${telegramName}, DName: ${discordName}\n` +
                    `Пароль заскречен`;
                    
                    if(log) console.log(text);

                    response = await text;
                };
            });

        return await response;

    }
    catch (err)
    {
        console.log(err)
        return 'Error << Ошибка на стороне сервера';
    };
};

const deleteAccountInMultiplatform = async (telegramId, discordId, password, log=true) =>
{
    try
    {
        let isAccountExists = false;

        await getMulityAccount('findOne', discordId).then(account =>
        {
            if(!!account) isAccountExists = true;
        });

        if(!isAccountExists) return await 'Error << Аккаунт не найден';

        getMulityAccount('findOne', discordId)
            .then((multiAccount) =>
            {
                if(unHash(multiAccount?.dataValues?.password) === unHash(password))
                {
                    multiplatform.destroy({ where: { telegramid: telegramId, discordid: discordId } });
                };
            });

        return await 'Аккаунт успешно удален';
    }
    catch (err)
    {
        console.log(err)
        return 'Error << Ошибка на стороне сервера';
    };
};

// запрет
const getMulityAccount = async (findType='findAll', type='discordid', ID) =>
{
    if(findType==='findAll')
    {
        const
            tagList = await multiplatform.findAll({ attributes: [`${type}`] }),
            tagString = tagList.map(t => t[`${type}`]).join('\n') || 'Нет тегов';
        
        return await tagString;
    }
    else if(findType==='findOne')
    {
        let options;
        
        if(type === 'discordid') options = { where: { discordid: `${ID}` }};
        else if(type === 'telegramid') options = { where: { telegramid: `${ID}` }};

        const tag = await multiplatform.findOne(options);
        
        return await tag;
    }
};


(async() => {
    // await addNewAccountToMultiplatform('5233359942', '877154902244216852', 'FOCKUSTY', 'FOCKUSTY', 'Testpassword123PPPPPasdfzZqqx', true);
    // await deleteAccountInMultiplatform('5233359942', '877154902244216852', 'Testpassword123PPPPPasdfzZqqx');
    // await updateAccountInMultiplatform('5233359942', '877154902244216852', '123', 'AAAAAAAAAA', 'Testpassword123PPPPPasdfzZqqx')
    // multiplatform.destroy({ where: { telegramid: '5233359942', discordid: '877154902244216852' } })
    // multiplatform.drop()
    multiplatform.sync();
    telegramIdentifierToken.sync();
})()


module.exports =
{
    addNewAccountToMultiplatform,
    updateAccountInMultiplatform,
    deleteAccountInMultiplatform,
    
    addAccountToTelegramIdenty,
    getAccountToTelegramIdentyFromToken,
    getAccountToTelegramIdentyFromTelegramId,

    getMulityAccount
}