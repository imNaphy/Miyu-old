const Discord = require('discord.js');

module.exports = {
    name: 'uptime',
    run: async (bot, message, args) => {
        if (!message.guild.me.permissions.has('SEND_MESSAGES')) return;
        let totalSeconds = bot.uptime / 1000;
        const days = Math.floor(totalSeconds / 86400);
        const hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = Math.floor(totalSeconds % 60);

        const embed = new Discord.MessageEmbed()
        .setAuthor('Uptime', bot.user.displayAvatarURL())
        .setColor('#2F3136')
        .addField('› Uptime', `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds.`)
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL());
        return message.channel.send(embed);
    }
};