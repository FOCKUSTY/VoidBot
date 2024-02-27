const
    {
        SlashCommandBuilder,
        EmbedBuilder,
        PermissionFlagsBits
    } = require('discord.js'),

    { sequelize, deleteTable } = require('../../utils/dataBase'),

    { authorId } = require('../../../config.json');

module.exports =
{
    cooldown: 5,
    data: new SlashCommandBuilder()
	.setName('database')
	.setDescription('Работа с базами данных')
    .setNameLocalizations({
        ru:'базы-данных',
        "en-US":'database',
        ko:'데이터-베이스'
    })
    .setDescriptionLocalizations({
        ru:'Работа с базами данных',
        "en-US":'Work witch database',
        ko:'데이터베이스 작업'
    })
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator && PermissionFlagsBits.KickMembers && PermissionFlagsBits.BanMembers)
    
    .addSubcommand(s=>s.setName('delete-table').setDescription('Удалить таблицу')
        .setNameLocalizations({
            ru:'удалить-таблицу',
            "en-US":'delete-table',
            ko:'테이블-삭제'
        })
        .setDescriptionLocalizations({
            ru:'Удалить таблицу',
            "en-US":'Delete the table',
            ko:'테이블 삭제'
        })
        
        .addStringOption(o=>o.setName('table').setDescription('Таблица, которую нужно удалить')
            .setNameLocalizations({
                ru:'таблица',
                "en-US":'table',
                ko:'테이블'
            }).setRequired(true)
            .setDescriptionLocalizations({
                ru:'Таблица, которую нужно удалить',
                "en-US":'Table to be deleted',
                ko:'삭제될 테이블'
            })))
    
    .addSubcommand(s=>s.setName('all-tables').setDescription('Все таблицы')
        .setNameLocalizations({
            ru:'все-таблицы',
            "en-US":"all-tables",
            ko:'모든-테이블'
        }).setDescriptionLocalizations({
            ru:'Все таблицы',
            "en-US":"All tables",
            ko:'모든 테이블'
        })),

        async execute(interaction)
        {
        
            if(interaction.user.id != authorId) return;

            const subcommand = interaction.options.getSubcommand(); 
            const models = sequelize.models;

            if(subcommand==='delete-table')
            {
                const table = interaction.options.getString('table');

                const model = models[table];

                deleteTable(model);

                await interaction.reply({
                    content: `Была успешно удалена таблица "${table}"`,
                    ephemeral: true
                })
            }
            else if(subcommand==='all-tables')
            {
                const modelsArray = [];
                
                for(let model in models) modelsArray.push(`🎩 ${model}`);

                await interaction.reply({
                    content: `Все таблицы на данный момент:\n${modelsArray.join('\n')}`, ephemeral: true
                })
            }

	},
};