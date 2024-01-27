const developCommand = async (interaction) =>
{
    return await interaction.reply( { content:'Эта команда пока что находится в разработке', ephemeral: true } );
};

module.exports =
{
    developCommand
}