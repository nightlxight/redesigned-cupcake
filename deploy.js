var fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const yaml = require('js-yaml');
const settings = yaml.load(fs.readFileSync('./settings.yml', 'utf8'));

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(settings.token);

(async () => {
	try {
		await rest.put(
			Routes.applicationGuildCommands(`${settings.client_id}`, settings.guild_id),
			{ body: commands },
		);
		console.log(`${settings.deployCommandsConsoleMessage}`);
	} catch (error) {
		console.warn('There was an error while registering the application commands.');
		console.error(error);
	}
})();