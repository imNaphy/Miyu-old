const Discord = require('discord.js');

module.exports = {
    name: 'poll',
    run: async (bot, message, args) => {
        if (!message.guild.me.permissions.has('SEND_MESSAGES')) return;
        if (!message.member.permissions.has('MANAGE_MESSAGES')) return message.channel.send('ERROR: No permission!');
        if (!args[0]) return message.channel.send('ERROR: Specify a message!');
        const poll = args.join(' ');

        const embed = new Discord.MessageEmbed()
        .setAuthor('Poll', bot.user.displayAvatarURL())
        .setColor('#363940')
        .setTitle(poll)
        .setDescription('Please react to the message.')
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL());
        message.delete().catch();
        message.channel.send({embed: embed}).then(embedMessage => {
            embedMessage.react('👍');
            embedMessage.react('👎');
        });
        return;
    }
};