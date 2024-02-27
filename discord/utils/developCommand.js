const { getDevelop } = require('./develop');

const developCommand = async (interaction) =>
{
    return await interaction.reply( { content:'Эта команда пока что находится в разработке', embeds: [getDevelop()], ephemeral: true } );
};

module.exports =
{
    developCommand
};