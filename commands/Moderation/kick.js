const Discord = require('discord.js');
const moment = require('moment');

module.exports = {
    name: 'kick',
    run: async (bot, message, args) => {
        if (!message.guild.me.permissions.has('SEND_MESSAGES')) return;
        if(!message.member.permissions.has('KICK_MEMBERS')) return message.channel.send('ERROR: No permission!')
        let kUser = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!kUser) return message.channel.send('Use the command `/kick <@user mention> <reason>`');
        let kReason = args.join(' ').slice(22) || 'No reason provided';
        if(kUser.permissions.has('MANAGE_GUILD')) return message.channel.send('That person can\'t be kicked!');

        let kickEmbed = new Discord.MessageEmbed()
        .setAuthor('Kick', bot.user.displayAvatarURL())
        .setColor('#363940')
        .addField('› User', `${kUser}`, true)
        .addField('› Moderator', `<@${message.author.id}>`, true)
        .addField('› Reason', kReason, false)
        .addField('› Date', `${moment(message.createdAt).format("dddd, MMMM Do YYYY")}`, true)
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL());

        await kUser.send(`You have been kicked from ${message.guild.name} by <@${message.author.id}> for \`${kReason}\`!`);

        kUser.kick({reason: kReason}).catch(error => {
            message.channel.send('Something went wrong!').then(message => {
                setTimeout(function() {
                    message.delete();
                }, 5000);
            });
            console.log(error);
        });
        message.channel.send({embeds: [kickEmbed]});
    }
};