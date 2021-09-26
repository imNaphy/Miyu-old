const Discord = require('discord.js');

module.exports = {
    name: 'avatar',
    run: async (bot, message, args) => {
        if (!message.guild.me.permissions.has('SEND_MESSAGES')) return;
        if (!args[0]) return message.channel.send(message.member.user.displayAvatarURL() + '?size=1024');
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        try {
            await message.channel.send(member);
        } catch (error) {
            console.error(error);
        }
        if(!member) return message.channel.send('ERROR: Wrong argument! Please mention someone!');
        return message.channel.send(member.user.displayAvatarURL() + '?size=1024');
    }
};