const Discord = require('discord.js');
const { Player } = require('.');

module.exports = async (bot) => {
    // track start
    Player.on('trackStart', async (queue, track) => {
        queue.metadata.channel.send(`Playing **${track.title}**!`);
    })
    // song added
    Player.on('trackAdd', async (queue, track) => {
        queue.metadata.channel.send(`Added song **${track.title}**!`);
    })
}