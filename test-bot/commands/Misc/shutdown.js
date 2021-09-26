const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'shutdown',
    run: async (bot, message, args) => {
        if (!message.guild.me.permissions.has('SEND_MESSAGES')) return;
        if (!message.author.id === '350316509291216906') return;
        message.delete();
        setTimeout(function() {
            bot.destroy();
            process.exit(1);
        }, 1000);
    }
};