const
    { kristyId, bottomlessHatId } = require('../../config.json'),
    { OneTime } = require('../utils/OneTimeFunction');

let kristyMember;
let bottomlessHat;

const setKristyValues = (guild, kristy) =>
{
    kristyMember = kristy;
    bottomlessHat = guild;
};

const setKristy = new OneTime(false, 'setKristy')

const checkKristyNickname = async (client, log=false) =>
{
    if(!setKristy.oneTimeFunction(true, true, true))
    {

        const guild = await client.guilds.fetch(`${bottomlessHatId}`);
        const kristy = await guild.members.fetch(`${kristyId}`);

        setKristyValues(guild, kristy);
        setKristy.oneTimeFunction(true, true, false);
    };

    if(kristyMember.nickname != '🎩Kristy')
    {
        let oldNickname = await kristyMember.nickname;
        await kristyMember.setNickname('🎩Kristy');
        if(log) console.log(`Псевдоним изменен с ${oldNickname} на ${kristyMember.nickname}`);
    }
    else if(log) console.log('Псевдоним нормальный');
};

module.exports =
{
    checkKristyNickname
}