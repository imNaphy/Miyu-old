const Discord = require('discord.js');

module.exports = {
    name: 'lsugi',
    aliases: ['mata'],
    run: async (bot, message, args) => {
        if (!message.guild.me.permissions.has('SEND_MESSAGES')) return;
        return message.member.send(`ma-ta il suge`);
    }
};