const Discord = require('discord.js');

module.exports = {
    name: 'dev',
    aliases: ['developer'],
    run: async (bot, message, args) => {
        if (!message.guild.me.permissions.has('SEND_MESSAGES')) return;
        if (message.author.id === '350316509291216906') return message.channel.send('You are my developer!');
        return;
    }
};