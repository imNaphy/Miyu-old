const Discord = require('discord.js');
const moment = require('moment');

module.exports = {
    name: 'ban',
    run: async (bot, message, args) => {
        if (!message.guild.me.permissions.has('SEND_MESSAGES')) return;
        if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('ERROR: No permission!')
        let bUser = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!bUser) return message.channel.send('Use the command `/ban <@user mention> <reason>`');
        let bReason = args.join(' ').slice(22) || 'No reason provided';
        if(bUser.hasPermission('MANAGE_GUILD')) return message.channel.send('That person can\'t be banned!');

        let banEmbed = new Discord.MessageEmbed()
        .setAuthor('Ban', bot.user.displayAvatarURL())
        .setColor('#363940')
        .addField('› User', `${bUser}`, true)
        .addField('› Moderator', `<@${message.author.id}>`, true)
        .addField('› Reason', bReason, false)
        .addField('› Date', `${moment(message.createdAt).format("dddd, MMMM Do YYYY")}`, true)
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL());

        await bUser.send(`You have been banned from ${message.guild.name} by <@${message.author.id}> for \`${bReason}\`!`);

        bUser.ban({reason: bReason}).catch(error => {
            message.channel.send('Something went wrong!').then(message => {
                setTimeout(function() {
                    message.delete();
                }, 5000);
            });
            console.log(error);
        });
        message.channel.send(banEmbed);
    }
};