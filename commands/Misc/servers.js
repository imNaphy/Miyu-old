const Discord = require('discord.js');

module.exports = {
    name: 'servers',
    aliases: ['users'],
    run: async (bot, message, args) => {
        if (!message.guild.me.permissions.has('SEND_MESSAGES')) return;
        const embed = new Discord.MessageEmbed()
        .setAuthor('Servers', bot.user.displayAvatarURL())
        .setColor('#2F3136')
        .addField('› Servers', bot.guilds.cache.size, true)
        .addField('› Total users', bot.users.cache.size, true)
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL());
        return message.channel.send(embed);
    }
};