const Discord = require('discord.js');
const moment = require('moment');

module.exports = {
    name: 'serverinfo',
    run: async (bot, message, args) => {
        if (!message.guild.me.permissions.has('SEND_MESSAGES')) return;
        const created = moment(message.guild.createdAt).format("dddd, MMMM Do YYYY");
        await message.guild.fetchOwner().then(guildMember => owner = guildMember);
        if (owner.nickname === null) ownerNick = owner.user.username;
        else ownerNick = owner.nickname;
        const serverembed = new Discord.MessageEmbed()
        .setAuthor(message.guild.name, message.guild.iconURL())
        .setColor('#363940')
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        .setThumbnail(message.guild.iconURL())
        .addField('› Owner', ownerNick.toString(), true)
        .addField('› Roles', message.guild.roles.cache.size.toString(), true)
        .addField('› Total Members', message.guild.memberCount.toString(), true)
        .addField('› Humans', message.guild.members.cache.filter(member => !member.user.bot).size.toString(), true)
        .addField('› Bots', message.guild.members.cache.filter(member => member.user.bot).size.toString(), true)
        .addField('› Created on', created, true);
        message.channel.send({embeds: [serverembed]});
    }
};

