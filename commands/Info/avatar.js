const Discord = require('discord.js');

module.exports = {
    name: 'avatar',
    run: async (bot, message, args) => {
        if (!message.guild.me.permissions.has('SEND_MESSAGES')) return;
        if (!args[0]) return message.channel.send(message.member.user.displayAvatarURL() + '?size=1024');
        let member = message.mentions.members.first();
        /*if (!member) {
            const msg = args.join(' ');
            member = bot.users.cache.find(user => user.username, msg).;
        }*/
        if(!member) return message.channel.send('ERROR: Wrong argument! Please mention someone!');
        return message.channel.send(member.user.displayAvatarURL() + '?size=1024');
    }
};