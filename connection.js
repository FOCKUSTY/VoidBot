const { VoiceConnectionStatus, entersState } = require('@discordjs/voice');

connection.on(VoiceConnectionStatus.Ready, () => {
	console.log('Подключение было произведено успешно для проигрывания аудио !');
});

connection.on(VoiceConnectionStatus.Disconnected, async (oldState, newState) => {
	try {
		await Promise.race([
			entersState(connection, VoiceConnectionStatus.Signalling, 5_000),
			entersState(connection, VoiceConnectionStatus.Connecting, 5_000),
		]);
	} catch (error) {
        console.log(error)
		connection.destroy();
	}
});