const Discord = require('discord.js');

module.exports = {
    name: 'invite',
    run: async (bot, message, args) => {
        if (!message.guild.me.permissions.has('SEND_MESSAGES')) return;
        
        return message.channel.send(`🎉 To invite me to your server, use these links:\n\nhttps://discord.com/oauth2/authorize?client_id=756085215650119710&scope=bot&permissions=8589934591 (full permissions, recommended)\n<placeholder> (only the required permissions)`);
    }
};