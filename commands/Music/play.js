const Discord = require('discord.js');
const DiscordVoice = require('@discordjs/voice');
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const queue = new Map();
const mFunc = require('../../utils/mFunc.js');

module.exports = {
    name: 'play',
    aliases: ['p'],
    run: async (bot, message, args) => {
        if (!message.guild.me.permissions.has('SEND_MESSAGES')) return;
        const voiceChannel = message.member.voice.channel;
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send('ERROR: I can\'t conenct to the voice channel!');
        if (!permissions.has('SPEAK')) return message.channel.send('ERROR: I can\'t talk in this voice channel!');
        if (!voiceChannel) return message.channel.send('ERROR: You have to be in a voice channel first!');
        if (!args[0]) return message.channel.send('ERROR: No input provided!');
        if (message.guild.me.voice.channel !== message.member.voice.channel && message.guild.me.voice.channel && message.member.voice.channel) return message.channel.send('ERROR: I am in a different voice channel!');
        if (!message.guild.me.voice.channel) {
            try {
                await DiscordVoice.joinVoiceChannel({ channelId: message.member.voice.channel.id, guildId: message.guild.id, adapterCreator: message.guild.voiceAdapterCreator });
            } catch (error) {
                console.error(error);
            }
        }

        /*
        const arguments = message.content.split(' ');
        const searchString = arguments.slice(1).join(' ');
        const url = arguments[1] ? arguments[1].replace(/<(.+)>/g, '$1') : '';
        const serverQueue = queue.get(message.guild.id);
        console.log(`${searchString} \n${url}`);
        if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
            const playlist = await YouTube.getPlaylist(url);
            const videos = await playlist.getVideos();
            for (const video of Object.values(videos)) {
                const video2 = await YouTube.getVideoById(video.id);
                await mFunc.handleVideo(video2, message, voiceChannel, true)
            }
            return message.channel.send(`The **${playlist.title}** playlist has been added to the queue!`);
        } else if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/watch(.*)$/)) {
            try {
                const video = await YouTube.getVideo(url);
                return mFunc.handleVideo(video, message, voiceChannel);
            } catch (error) {
                return message.channel.send('I couldn\'t find any video based on the URL provided!');
            }
        } else {
            try {
                var videos = await YouTube.searchVideos(searchString, 10);
                let index = 0;
                message.channel.send(`**Select a video:** \n${videos.map(video2 => `** ${++index}.** ${video2.title}`).join(`\n`)} \n\nPlease provide a value to select one of the search results from 1 to 10.\nIf no value is provided within 30 seconds, it will be cancelled.`).then(msg => {msg.delete(30000)});
                try {
                    var response = await message.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11 , {
                        maxMatches: 1,
                        time: 30000,
                        errors: ['time']
                    });
                } catch (error) {
                    console.error(error);
                    return message.channel.send('No or invalid value entered, cancelling video selection.');
                }
                const videoIndex = parseInt(response.first().content);
                var video = await YouTube.getVideoByID(videos[videoIndex - 1].id);
                //return handleVideo(video, message, voiceChannel);
            } catch (error) {
                return message.channel.send('I couldn\'t obtain any search results.');
            }
        }
        */
    }
};