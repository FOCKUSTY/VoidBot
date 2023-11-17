const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { ActivityData, Tags } = require(`../../developing`);

    module.exports = {
        cooldown: 5,
        data: new SlashCommandBuilder()
		.setName('tag')
		.setDescription('тег')
        .addSubcommand(subcommand =>
            subcommand.setName(`ideaname`).setDescription(`Найдет тег по названию идеи`)
            
            .addStringOption(option =>
                option.setName(`name`).setDescription(`Название тега (Идеи)`).setRequired(true)))

        .addSubcommand(subcommand =>
            subcommand.setName(`ideas`).setDescription(`Вывести все идеи (Имени идей)`))
        
/*         .addSubcommand(subcommand =>
            subcommand.setName(`activity`).setDescription(`Активность`)

            .addStringOption(option =>
                option.setName(`actname`).setDescription(`Название активности`).setRequired(true))

            .addStringOption(option =>
                option.setName(`acttype`).setDescription('Тип активности(actTypes.(play|stream|listen|watch|cust|comp))').setRequired(true))
                ) */,
        async execute(interaction) {

            const int = interaction
            const subcommand = interaction.options.getSubcommand()

/*             if(subcommand==='activity') {
                if(int.user.id===`877154902244216852`) {
                    const tagName = interaction.options.getString('actname');
                    const tagType = interaction.options.getString('acttype');
    
                    const tag = await ActivityData.create({
                        name: tagName,
                        acttype: tagType
                    });
    
                    console.log(`Был успешно создан тег\n${tagName}\n${tagType}`)
    
                    await int.reply({content: `Тег успешно создан\nНазвание: ${tagName}\nТип: ${tagType}`, ephemeral: true})
                }
                } else {
                    await int.reply({content: `У Вас нет прав`, ephemeral: true})
                }
 */
            if(subcommand===`ideaname`) {

            const tagName = interaction.options.getString('name');

            const tag = await Tags.findOne({ where: { name: tagName } });
        
            if (tag) {
                // equivalent to: UPDATE tags SET usage_count = usage_count + 1 WHERE name = 'tagName';
                tag.increment('usage_count');
        
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