const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { developEmbed } = require(`../../developing`);
const objectBan = [];

    module.exports = {
        cooldown: 5,
        data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Забанить человека !')
        .addUserOption(option =>
            option.setName('member').setDescription('Человек, которого вы хотите забанить').setRequired(true))
        .addStringOption(option =>
            option.setName(`reason`).setDescription(`Причина бана`))
        .addStringOption(option =>
            option.setName(`time`).setDescription(`Время бана (1d, 15min) (По умолчанию - день)`))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
        async execute(interaction) {const int = interaction;
        if(int.guild===undefined||int.guild===null) {await int.reply({content: `Перейдите на сервер`, ephemeral: true})} else {

            const ban = async () => {
                member.ban(objectBan);
        
                await int.reply({
                    content: `Участник <@${utb.id}> (${utb.globalName}) был забанен на ${time}`, ephemeral: true
                });
        
                await int.followUp({
                embeds: [developEmbed],
                ephemeral: true});}
        
        const utb = int.options.getUser(`member`);
        const member = int.guild.members.cache.get(utb.id)
        const reason = int.options.getString(`reason`);
        let time;
        if(int.options.getString(`time`)) {
            time = int.options.getString(`time`);
        }
        let tn = parseInt(time);
        let ts = time.slice(tn);
        if(ts===`d`){
            objectBan.push({day: tn, reason: reason});
            ban();
    }
        else if(ts===`sec`||ts===`s`||ts===`second`){
            objectBan.push({seconds: `${tn}`, reason: reason});
            ban();
    }
        else if(ts===`min`||`minute`){
            objectBan.push({minutes: `${tn}`, reason: reason});
            ban();
    }
        else if(ts===`m`||ts===`month`){
            objectBan.push({days: `${tn}`, reason: reason});
            ban();
    }
        else if(ts===`y`||ts===`year`){
            objectBan.push({years: `${tn}`, reason: reason});
            ban();
    }
        else if(ts===`h`||ts===`hour`){
            objectBan.push({hors: `${tn}`, reason: reason});
            ban();
    }   else if(ts===undefined||ts===null) {
            objectBan.push({days: `1`, reason: reason});
            ban();
    }   else {
            await int.reply({
                content: `Вы не правильно указали время`,
                ephemeral: true
            })
            return;
        }

	}},
};