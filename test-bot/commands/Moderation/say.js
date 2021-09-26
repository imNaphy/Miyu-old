const Discord = require('discord.js');

module.exports = {
    name: 'say',
    aliases: ['me'],
    run: async (bot, message, args) => {
        if (!message.guild.me.permissions.has('SEND_MESSAGES')) return;
        if (!message.member.permissions.has('MANAGE_MESSAGES')) return message.channel.send('ERROR: No permission!');
        if (!args[0]) return message.channel.send('ERROR: Specify a message!');

        const msg = args.join(' ');
        message.delete();
        return message.channel.send(msg);
    }
};