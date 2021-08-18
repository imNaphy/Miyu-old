const Discord = require('discord.js');

module.exports = {
    name: 'userinfo',
    run: async (bot, message, args) => {
        if (!message.guild.me.permissions.has('SEND_MESSAGES')) return;
        
    }
};