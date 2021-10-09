const Discord = require('discord.js');
const DiscordVoice = require('@discordjs/voice');

module.exports = {
    name: 'leave',
    aliases: ['disconnect'],
    run: async (bot, message, args) => {
        if (!message.guild.me.permissions.has('SEND_MESSAGES')) return;
        if (!message.member.voice.channel) return message.channel.send('ERROR: You have to be in a voice channel first!');
        if (!message.guild.me.voice.channel) return message.channel.send('ERROR: I am not in any voice channels currently!');
        try {
            await DiscordVoice.getVoiceConnection(message.member.voice.channel.guild.id).destroy();
        } catch (error) {
            console.error(error);
        }
        return;
    }
};