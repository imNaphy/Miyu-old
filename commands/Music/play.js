const Discord = require('discord.js');
const DiscordVoice = require('@discordjs/voice');
const ytdl = require('ytdl-core');

module.exports = {
    name: 'play',
    aliases: ['p'],
    run: async (bot, message, args) => {
        if (!message.guild.me.permissions.has('SEND_MESSAGES')) return;
        if (!message.member.voice.channel) return message.channel.send('ERROR: You have to be in a voice channel first!');
        
        connection = DiscordVoice.getVoiceConnection(message.member.voice.channel.guild.id);
        try {
            if (!connection && DiscordVoice.getVoiceConnection(message.member.voice.channel.guild.id).state.status != 'ready') DiscordVoice.joinVoiceChannel({ channelId: message.member.voice.channel.id, guildId: message.guild.id, adapterCreator: message.guild.voiceAdapterCreator });
        } catch (error) {
            console.error(error);
        }
        
    }
};