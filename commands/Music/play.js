const Discord = require('discord.js');
const DiscordVoice = require('@discordjs/voice');
const ytdl = require('ytdl-core');

module.exports = {
    name: 'play',
    aliases: ['p'],
    run: async (bot, message, args) => {
        if (!message.guild.me.permissions.has('SEND_MESSAGES')) return;
        const permissions = message.member.voice.channel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send('ERROR: I can\'t conenct to the voice channel!');
        if (!permissions.has('SPEAK')) return message.channel.send('ERROR: I can\'t talk in this voice channel!');
        if (!message.member.voice.channel) return message.channel.send('ERROR: You have to be in a voice channel first!');
        if (!message.guild.me.voice.channel) {
            try {
                await DiscordVoice.joinVoiceChannel({ channelId: message.member.voice.channel.id, guildId: message.guild.id, adapterCreator: message.guild.voiceAdapterCreator });
            } catch (error) {
                console.error(error);
            }
        }
        const arguments = message.content.split(' ');
        const searchString = arguments.slice(1).join(' ');
        const url = arguments[1] ? arguments[1].replace(/<(.+)>/g, '$1') : '';
        //const serverQueue = queue.get(message.guild.id);
        console.log(`${searchString} \n${url}`);
        if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) message.channel.send('youtube playlist');
        
    }
};