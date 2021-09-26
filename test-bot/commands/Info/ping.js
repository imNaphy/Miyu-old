const Discord = require('discord.js');

module.exports = {
    name: 'ping',
    run: async (bot, message, args) => {
        if (!message.guild.me.permissions.has('SEND_MESSAGES')) return;
        const msg = await message.channel.send(`🏓 Pinging...`);
        msg.edit(`🏓 Pong!\nLatency: ${Math.floor(msg.createdAt - message.createdAt)}ms\nHeartbeat: ${Math.round(bot.ws.ping)}ms`);
        return;
    }
};