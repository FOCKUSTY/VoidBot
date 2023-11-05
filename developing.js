const { EmbedBuilder } = require(`discord.js`)
const { color, title, authorName, iconURL, footerText, description } = require(`./developing.json`)
const developFields = [
    {name: `Как Вы можете помочь ?`, value: `Поддержать нас !`, inline: true},
    {name: `Как нас поддержать ?`, value: `Просто зайди на наш сервер **[The Void](<https://discord.gg/5MJrRjzPec>)** !`, inline: true}
]

module.exports = {
    developEmbed: new EmbedBuilder()
        .setColor(Number(color))
        .setTitle(`${title}`)
        .setAuthor({name: `${authorName}`, iconURL: `${iconURL}`})
        .setDescription(`${description}`)
        .setThumbnail(`${iconURL}`)
        .setFields(developFields)
        .setTimestamp()
        .setFooter({text: `${footerText}`, iconURL: `${iconURL}`})
}