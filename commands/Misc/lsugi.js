const Discord = require('discord.js');

module.exports = {
    name: 'lsugi',
    aliases: ['mata'],
    run: async (bot, message, args) => {
        if (!message.guild.me.permissions.has('SEND_MESSAGES')) return;
        try {
            message.member.send(`ma-ta il suge`);
        } catch (error) {
            return console.error(error);
        }
    }
};