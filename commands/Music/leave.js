const Discord = require('discord.js');
const DiscordVoice = require('@discordjs/voice');

module.exports = {
    name: 'leave',
    aliases: ['disconnect'],
    run: async (bot, message, args) => {
        if (!message.guild.me.permissions.has('SEND_MESSAGES')) return;
        if (!message.member.voice.channel) return message.channel.send('ERROR: You have to be in a voice channel first!');
        DiscordVoice.getVoiceConnection(message.member.voice.channel.guild.id).disconnect();
        return;
    }
};