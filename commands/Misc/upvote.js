const Discord = require('discord.js');

module.exports = {
    name: 'upvote',
    aliases: ['vote'],
    run: async (bot, message, args) => {
        if (!message.guild.me.permissions.has('SEND_MESSAGES')) return;
        const embed = new Discord.MessageEmbed()
        .setAuthor('Upvote', bot.user.displayAvatarURL())
        .setColor('#2F3136')
        .setDescription('**If you like me and want to help me, you can do so by upvoting me on the following links:**')
        .addField('› Discord Bots', 'https://discordbots.org')
        .addField('› Bots on Discord', 'https://bots.ondiscord.xyz')
        .addField('› Discord Bot List', 'https://discordbotlist.com')
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL());
        return message.channel.send(embed);
    }
};