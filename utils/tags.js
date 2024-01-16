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

module.exports =
{
    Tags
}