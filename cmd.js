const Discord = require('discord.js');
const { Player } = require('.');

module.exports = async (bot, message, args, cmd) => {
    if (cmd === 'ping') message.channel.send('Pong!');
    else if (cmd === 'play') {
        let channel = message.member.voice;
        if (!channel) return message.channel.send('You need to join a voice channel!');

        let query = args.join(' ');
        if (!query) return message.channel.send('Please provide some music material to sing!');
        let queue = Player.createQueue(message.guild.id, {
            metadata: {
                channel: message.channel,
            }
        });
        try {
            if (!queue.connection) await queue.connect(channel);
        } catch (error) {
            queue.destroy();
            return await message.channel.send('Could not join the voice channel!');
        }

        const track = await Player.search(query, {
            requestedBy: message.author,
        }).then(r => r.tracks[0]);

        queue.play(track);
        message.channel.send(`Loading track **${track.title}**!`)
    }
    else if (cmd === 'skip') {
        let queue = Player.getQueue(message.guild.id);
        queue.skip();
        message.channel.send('Song skipped!');
    }
    else if (cmd === 'pause') {
        let queue = Player.getQueue(message.guild.id);
        queue.setPaused(true);
        message.channel.send('Song paused!');
    }
    else if (cmd === 'resume') {
        let queue = Player.getQueue(message.guild.id);
        queue.setPaused(false);
        message.channel.send('Song resumed!');
    }
    else if (cmd === 'volume') {
        let queue = Player.getQueue(message.guild.id);
        queue.setVolume(args[0]);
        message.channel.send(`Volume changed to ${args[0]}!`);
    }
}