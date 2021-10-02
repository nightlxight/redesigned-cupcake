var fs = require('fs');
const {SlashCommandBuilder} = require('@discordjs/builders');
const {MessageEmbed} = require('discord.js');
const yaml = require('js-yaml');
const settings = yaml.load(fs.readFileSync('./settings.yml', 'utf8'));
var space = settings.space; var exclamation = settings.exclamation;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('invite')
        .setDescription('Sends an invite link to your bot!'),
    async execute(interaction) {
        let { random_color, red, green, cyan, aqua, lightcyan, yellow, orange, pink, purple } = require('../colors.json');
        let inviteLinkEmbed = new MessageEmbed()
            .setColor(random_color) // * random_color, red, green, cyan, aqua, lightcyan, yellow, orange, pink, purple
            .setTitle('Invite Link')
            .setDescription(`${settings.invite_link}`)
            .setFooter(`Command executed by ${interaction.user.tag}`)
            .setTimestamp();
        function sendInviteEmbed() {
            try {
                return interaction.reply({embeds: [inviteLinkEmbed] });
            } catch (error) {
                // * interaction.reply("There was an error while executing this command!");
                console.warn("There was an error!");
                console.error(error);
            };
        };
        sendInviteEmbed();
    },
};