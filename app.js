var fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const yaml = require('js-yaml');
const settings = yaml.load(fs.readFileSync('./settings.yml', 'utf8'));
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const mongoose = require('mongoose');
var exclamation = settings.exclamation; let space = `${settings.space}`
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
};
                                     
function whenOnReady() {
    client.user.setStatus(`${settings.status}`);
    client.user.setActivity(`${settings.activity}`,
    { type: `${settings.activityType}` });
    console.log(`Status` + ":" + `${settings.status}`);
    console.log('Activity' + ":" + `${settings.activity}`);
    console.log("Activity" + `${settings.space}` + "type" + ":" + space + `${settings.activityType}`);
    console.log(`${settings.consoleMessage}`);
    console.log(settings.loggedInAs + `${settings.space}` + `${client.user.tag}`);
};

client.once('ready', () => {
    try {
        if (console = console, fs = fs) {
            whenOnReady();
        };
    } catch (error) {
        console.warn("There was an error!"); // * or console.error(); instead of warn.
        console.error(error);
    };
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if (!command) return;
    try {
        await command.execute(interaction);
    } catch (error) {
        console.warn(`${settings.consoleCommandError}`);
        console.error(error);
        return interaction.reply({ content: `${settings.cantExecuteCommand}`, ephemeral: true });
    }
})

client.login(settings.token);