const Discord = require('discord.js');
const ytdl = require('ytdl-core');

module.exports = {
    name: 'play',
    aliases: ['p', 'yt', 'youtube'],
    run: async (bot, message, args) => {
        if (!message.guild.me.permissions.has('SEND_MESSAGES')) return;
        if (!message.member.voice.channel) return message.channel.send('ERROR: You have to be in a voice channel first!');
        if (!message.guild.voice.channel) connection = await message.member.voice.channel.join();

        
    }
};