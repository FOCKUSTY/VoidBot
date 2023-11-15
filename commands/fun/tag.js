const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { Tags } = require(`../../developing`)

    module.exports = {
        cooldown: 5,
        data: new SlashCommandBuilder()
		.setName('tag')
		.setDescription('Найти "бирку"')
        .addStringOption(option =>
            option.setName(`name`).setDescription(`Название "бирки"`).setRequired(true)),
        async execute(interaction) {
            if(interaction.user.id!=`877154902244216852`) {
                await interaction.reply({content: `У Вас нет прав`, ephemeral: true})
                return
            } else {

            const tagName = interaction.options.getString('name');

            // equivalent to: SELECT * FROM tags WHERE name = 'tagName' LIMIT 1;
            const tag = await Tags.findOne({ where: { name: tagName } });
        
            if (tag) {
                // equivalent to: UPDATE tags SET usage_count = usage_count + 1 WHERE name = 'tagName';
                tag.increment('usage_count');
        
                return interaction.reply({content: `${tag.get('description')}`, ephemeral: true});
            }
        
            return interaction.reply({content: `Could not find tag: ${tagName}`, ephemeral: true});
	}},
};