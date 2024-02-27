const
    { SlashCommandBuilder } = require('discord.js'),
    { setBotReply, changeReplyTxt } = require('../../utils/botReply');

module.exports =
{
    cooldown: 5,
    data: new SlashCommandBuilder()
	.setName('botreply')
	.setDescription('Включить/выключить ответ бота !')
    .setNameLocalizations({
        ru:'ответ-бота',
        "en-US":'bot-reply',
        ko:'봇-답장'
    })
    .setDescriptionLocalizations({
        ru:'Включение/выключение ответа бота',
        "en-US":'Turn bot reply on/off',
        ko:'봇 응답 활성화/비활성화'
    })
    
    .addSubcommand(s=>s.setName('change').setDescription('Изменить записанное сообщение')
        .setNameLocalizations({
            ru:'изменить',
            "en-US":'change',
            ko:'변화'
        })
        .setDescriptionLocalizations({
            ru:'Изменить записанное сообщение',
            "en-US":'Change recorded message',
            ko:'녹음된 메시지 편집'
        })
        .addStringOption(o=>o.setName('message').setDescription('Ваше сообщение').setRequired(true)
            .setNameLocalizations({
                ru:'сообщение',
                "en-US":'message',
                ko:'메시지'
            }).setDescriptionLocalizations({
                ru:'Ваше сообщение',
                "en-US":'Your message',
                ko:'당신의 메시지'
            })))
    
    .addSubcommand(s=>s.setName('switch').setDescription('Включить/выключить ответ бота')
        .setNameLocalizations({
            ru:'выключатель',
            "en-US":'switch',
            ko:'의미'
        })
        .setDescriptionLocalizations({
            ru:'Включить/Выключить ответ бота',
            "en-US":'Turn bot reply off/on',
            ko:'봇 응답 활성화/비활성화'
        })
        .addBooleanOption(o=>o.setName('change').setDescription('Изменить значение ?').setRequired(true)
        .setNameLocalizations({
            ru:'изменить',
            "en-US":'change',
            ko:'변화'
        }).setDescriptionLocalizations({
            ru:'Изменить значение ?',
            "en-US":'Change option ?',
            ko:'값을 변경하시겠습니까 ?'
        }))),
    async execute(interaction)
    {
        const subcommand = interaction.options.getSubcommand();
        
        if(interaction.user.id==='877154902244216852')
        {
            if(subcommand==='change')
            {
                const msg = interaction.options.getString('message');
                changeReplyTxt(msg);
                
                await interaction.reply({ content: `Сообщение изменено на:\n${msg}`, ephemeral: true })
            }
            else if (subcommand==='option')
            {
                const op = interaction.options.getBoolean('change');
                setBotReply(op);

                await interaction.reply({ content: `Зачение изменено на ${op}`, ephemeral: true });
            }
        }
        else await interaction.reply({content:'У Вас нет прав', ephemeral:true});  
	},
};