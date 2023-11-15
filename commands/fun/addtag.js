const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { Tags } = require(`../../developing`)

    module.exports = {
        cooldown: 5,
        data: new SlashCommandBuilder()
		.setName('addtag')
		.setDescription('Создать "бирку"')
        .addStringOption(option =>
            option.setName(`name`).setDescription(`Название "бирки"`).setRequired(true))
        .addStringOption(option =>
            option.setName(`description`).setDescription(`Описание "бирки"`).setRequired(true)),
        async execute(interaction) {
            if(interaction.user.id!=`877154902244216852`) {
                await interaction.reply({content: `У Вас нет прав`, ephemeral: true})
                return
            } else {

            const tagName = interaction.options.getString('name');
            const tagDescription = interaction.options.getString('description');
    
            try {
                // equivalent to: INSERT INTO tags (name, description, username) values (?, ?, ?);
                const tag = await Tags.create({
                    name: tagName,
                    description: tagDescription,
                    username: interaction.user.username,
                });
    
                return interaction.reply({content: `Бирка ${tag.name} добавлена`, ephemeral: true});
            }
            catch (error) {
                if (error.name === 'SequelizeUniqueConstraintError') {
                    return interaction.reply({content: 'Эта бирка уже добавлена', ephemeral: true});
                }
    
                return interaction.reply({content: 'Произошла какая-то ошибка', ephemeral: true});
            }}
	},
};