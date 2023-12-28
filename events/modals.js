const { Interaction, InteractionType, EmbedBuilder, TextChannel, PermissionsBitField } = require('discord.js')
const { Tags } = require('../developing')

let channel;
let bool;

async function setChannel(op, int) {
	channel = await int.client.channels.fetch(op?.id)
};
function setBool(op) { bool = op };

async function modalSubmit(int) {

	const interaction = int;
    const client = int.client
    const user = int.user.globalName;
	const userAvatar = `https://cdn.discordapp.com/avatars/${int.user.id}/${int.user.avatar}.png`;
	let iconURL;
	if(int.guild!=undefined||int.guild!=null) iconURL = `https://cdn.discordapp.com/icons/${int?.guild?.id}/${int?.guild?.icon}.png`
	else iconURL = `https://cdn.discordapp.com/avatars/${int.user.id}/${int.user.avatar}.png`
	
	if(int.type === InteractionType.ModalSubmit) {

		if(int.customId==='ideaModal') {

			const ideaTitle = int.fields.getTextInputValue(`ideaTitle`);
			const ideaDetails = int.fields.getTextInputValue(`ideaDetails`);
	
			const embed = new EmbedBuilder()
			    .setColor(0x161618)
			    .setAuthor({name: `${user}`, iconURL: `${userAvatar}`})
			    .setTitle(`${ideaTitle}`)
			    .setThumbnail(`${iconURL}`)
			    .setDescription(`${ideaDetails}`)
			    .setTimestamp()
                .setFooter({text: `${int.guild?.name||`Не на сервере`}`, iconURL: `${iconURL}`});
	
		(client.channels.cache.get("1171051517910986752")).send({content: ``, embeds: [embed]});
		
				int.reply({content: `Ваша идея была доставлена!`, embeds: [embed], ephemeral: true});
	
				console.log(`Идея была доставлена\nИдея: ${ideaTitle}\nОписание: ${ideaDetails}\nНаписал: ${user} (${int.user.id})\nС сервера: ${int.guild?.name||`Не на сервере`} (${int.guild?.id||``})\n`);
				
                try {
                    const tag = await Tags.create({
                        name: ideaTitle,
                        username: int.user.username,
                        globalname: int.user.globalName,
                        description: ideaDetails,
                        guildname: int?.guild?.name||`Не на сервере`
                    });
                    console.log(`Тег идеи успешно добавлен\nНазвание: ${tag.name}\nОписание: ${tag.description}\nОтправил: ${tag.username}\nС сервера: ${tag.guildname}`)
                } catch (error) {
                    console.log(`Ошибка с добавление тега\n${error}`)
                }
		} else if(int.customId==='sayModal') {
			
			if(!(channel?.permissionsFor(interaction.client.user.id).has([PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel]))) {
            await int.reply({
            content:
            `Сообщение не было доставлено на Ваш канал, возможны причины:\nВаш канал не является текстовым каналом\nУ меня не достаточно прав отправить сообщение на Ваш канал`,
            ephemeral: true});
            return
        };

		const msg = int.fields.getTextInputValue('message');

        if(bool) {
            const embed = new EmbedBuilder()
            .setColor(0x161618)
            .setAuthor({name: `${int?.user?.globalName||int?.user?.username}`, iconURL: `${int.user.avatarURL()}` })
            .setTitle(`${int?.guild?.name}`)
            .setDescription(`${msg.replaceAll(`\\n`, `\n`)}`)
            .setTimestamp()

            channel.send({embeds:[embed]})
        } else {
            channel.send(`${msg.replaceAll(`\\n`, `\n`)}`)
        }
        
        try {

        const embed = new EmbedBuilder()
        .setColor(0x161618)
        .setAuthor({name: `The Void`, iconURL: `https://cdn.discordapp.com/icons/1169284741846016061/63ff0e27c4c5de492894df065ef72266.png`})
        .setTitle(`Сообщение:`)
        .setDescription(`${msg.replaceAll(`\\n`, `\n`)}`)
        .setTimestamp()
        
        await int.reply({
		content: `Сообщение было доставлено на: ${channel}`,
		embeds: [embed], ephemeral: true});

    } catch (err) {
        
        await int.reply({
        content:
        `Сообщение не было доставлено на Ваш канал, возможны причины:\nВаш канал не является текстовым каналом\nУ меня не достаточно прав отправить сообщение на Ваш канал\n## Ошибка:\n\`\`\`${err}\`\`\``,
        ephemeral: true});
    }

		}

	};
}

module.exports = {
    setChannel,
    setBool,
    modalSubmit,
}