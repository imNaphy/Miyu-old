const Discord = require('discord.js');

module.exports = {
    name: 'leave',
    aliases: ['disconnect'],
    run: async (bot, message, args) => {
        if (!message.guild.me.permissions.has('SEND_MESSAGES')) return;
        if (!message.member.voice.channel) return message.channel.send('ERROR: You have to be in a voice channel first!');
        connection = await message.member.voice.channel.leave();
        return;
    }
};