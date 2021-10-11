const Discord = require('discord.js');
const DiscordVoice = require('@discordjs/voice');
const fs = require('fs');
const ytdl = require('ytdl-core');
const queue = new Map();

/*
module.exports.handleVideo = (video, message, voiceChannel, playlist = false) => {
    const serverQueue = queue.get(message.guild.id);
    const song = {
        id: video.id,
        title: Util.escapeMarkdown(video.title),
        url: `https://www.youtube.com/watch?v=${video.id}`
    };
    if (!serverQueue) {
        const queueConstruct = {
            textChannel: message.channel,
            voiceChannel: voice.channel,
            connection: null,
            songs: [],
            volume: 1,
            playing: true
        };
        queue.set(message.guild.id, queueConstruct);
        queueConstruct.songs.push(song);
        try {
            if (!message.guild.me.voice.channel) DiscordVoice.joinVoiceChannel({ channelId: message.member.voice.channel.id, guildId: message.guild.id, adapterCreator: message.guild.voiceAdapterCreator });
            //queueConstruct.connection = connection;
            play(message.guild, queueConstruct.songs[0]);
        } catch (error) {
            console.log(error);
            queue.delete(message.guild.id);
            return message.channel.send('I could not join the voice channel!');
        }
    } else {
        serverQueue.songs.push(song);
        if (playlist) return;
        else return message.channel.send(`**${song.title}** has been added to the queue!`);
    }
    return;
}

module.exports.play = (guild, song) => {
    const serverQueue = queue.get(guild.id);
  
    if(!song) {
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
    }
    
    const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
        .on("end", () => {
        serverQueue.songs.shift();
        play(guild, serverQueue.songs[0]);
        })
        .on("error", error => console.log(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume);

    serverQueue.textChannel.send(`🎶 Started playing **${song.title}**`).then(msg => {msg.delete(10000)});
}
*/