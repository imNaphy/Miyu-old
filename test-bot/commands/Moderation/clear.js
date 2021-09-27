const Discord = require('discord.js');

module.exports = {
    name: 'clear',
    aliases: ['purge'],
    run: async (bot, message, args) => {
        if (!message.guild.me.permissions.has('SEND_MESSAGES')) return;
        if (!message.member.permissions.has('MANAGE_MESSAGES')) return message.channel.send('ERROR: No permission!');
        if (!args[0]) return message.channel.send('ERROR: Use the command \`/clear <number of messages, max=100>\`!');
        if (args[0] > 100 || args[0] < 0) return message.channel.send('ERROR: Number has to be more than 0 and less than 100!');
        message.channel.bulkDelete(1);
        message.channel.bulkDelete(Number(args[0]));
        message.channel.send(`**Cleared ${args[0]} messages!**`).then(message => {
            setTimeout(function() {
                message.delete();
            }, 5000);
        });
        return;
    }
};