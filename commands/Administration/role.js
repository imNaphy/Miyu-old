const Discord = require('discord.js');

module.exports = {
    name: 'role',
    run: async (bot, message, args) => {
        if (!message.guild.me.permissions.has('SEND_MESSAGES')) return;
        if (!message.member.permissions.has('MANAGE_ROLES')) return message.channel.send('ERROR: No permission!');
        if (!message.guild.me.permissions.has('MANAGE_ROLES')) return message.channel.send('ERROR: I don\'t have permission!');
        const member = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
        if (!member) return message.channel.send('ERROR: No member found!');
        const role = args.join(' ').slice(args[0].length + 1);
        if (!role) return message.channel.send('ERROR: No role round!');
        const gRole = message.guild.roles.cache.find(r => r.name === role);
        if (!gRole) return message.channel.send('ERROR: Can\'t find that role!');
        if (member.roles.cache.some(r => r.id === gRole.id)) {
            await member.roles.remove(gRole.id).catch();
            return message.channel.send(`The role \`${gRole.name}\` has been successfully taken away from <@${member.id}>!`);
        } else if (!member.roles.cache.some(r => r.id === gRole.id)) {
            await member.roles.add(gRole.id).catch();
            return message.channel.send(`The role \`${gRole.name}\` has been successfully given to <@${member.id}>!`);
        }
    }
};