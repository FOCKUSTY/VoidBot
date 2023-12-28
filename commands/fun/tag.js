const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { Tags } = require(`../../developing`);

    module.exports = {
        cooldown: 5,
        data: new SlashCommandBuilder()
		.setName('tag')
		.setDescription('тег')
        .setNameLocalizations({ru:'тег', "en-US":'tag'})
        .setDescriptionLocalizations({ru:'тег', "en-US":'tag'})
        .addSubcommand(subcommand =>
            subcommand.setName(`ideaname`).setDescription(`Найдет тег по названию идеи`)
            .setNameLocalizations({ru:'название-идеи',"en-US":'idea-name'})
            .setDescriptionLocalizations({ru:'Найдет тег по названию идеи',"en-US":'Find tag by idea name'})
            
            .addStringOption(option =>
                option.setName(`name`).setDescription(`Название тега (Идеи)`).setRequired(true))
                .setNameLocalizations({ru:'название',"en-US":'name'})
                .setDescriptionLocalizations({ru:'Название тега (Идеи)',"en-US":'Tag name (Idea name)'}))

        .addSubcommand(subcommand =>
            subcommand.setName(`ideas`).setDescription(`Вывести все идеи (Имени идей)`)
            .setNameLocalizations({ru:'идеи',"en-US":'ideas'})
            .setDescriptionLocalizations({ru:'Вывести все идеи (Имени идей)',"en-US":'Show all tags name'})),
        async execute(interaction) {

            const int = interaction
            const subcommand = interaction.options.getSubcommand()

            if(subcommand===`ideaname`) {

            const tagName = interaction.options.getString('name');

            const tag = await Tags.findOne({ where: { name: tagName } });
        
            if (tag) {
                return interaction.reply({content: `${tag.get('description')}`, ephemeral: true});
            }
        
            return interaction.reply({content: `Не удалось найти тег: ${tagName}`, ephemeral: true});
        } else if(subcommand===`ideas`) {
            const tagList = await Tags.findAll({ attributes: ['name'] });
            const tagString = tagList.map(t => t.name).join('\n') || 'Нет тегов';

            const embed = new EmbedBuilder()
            .setColor(0x161618)
			.setAuthor({name: int?.guild.name||int.user.username, iconURL: `${int?.guild.iconURL()||int?.user.iconURL()}` })
			.setTitle(`Все идеи`)
			.setDescription(`${tagString}`)
			.setTimestamp()
			.setFooter({text: `${int?.guild.name||int.user.username}`, iconURL: `${int?.guild.iconURL()||int?.user.iconURL()}` });

            return interaction.reply({embeds: [embed], ephemeral: true})
        }
	},
};