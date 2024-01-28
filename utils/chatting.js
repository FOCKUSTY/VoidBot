let bool = false;
let bool_com = false;
let count = 0;

const sendMessageToKristy = async (m, text) =>
{
	setTimeout(async () =>
    {
		await m.reply(`${text}`);
		count = 0;
		// bool_com = textbool(false);
	}, 2000);
};

const chattingWithKristy = async (client, m) =>
{
	if(m.channel?.id!=`1175738843203391550`) return;
	const kristyUser = await m.guild?.members?.fetch(`1164228812217790565`);
	const kristyStatus = kristyUser.presence?.status;

	if(kristyStatus===undefined||kristyStatus===null||kristyStatus==='offline') return;
	// if(m.author.id!=`877154902244216852`) return;
	if(m.author.id!=`1164228812217790565`) return;
	if(m.mentions.users.get('1122199797449904179')===undefined) return;
	if(bool_com) return;

	count++;
	if(count>1) return;

	bool_com = textbool(true);

	if(!bool) {
		bool = true;
		client.guilds.cache.forEach(guild => {
			guilds.push(guild)
		});
	};

		const text = randomText(guilds);

		m.client.channels.cache.get(m.channel.id).sendTyping();

		chatting(m, text);
}