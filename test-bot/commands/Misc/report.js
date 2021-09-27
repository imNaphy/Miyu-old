const Discord = require('discord.js');
let cooldown = new Set();
let cdseconds = 3600;

module.exports = {
    name: 'report',
    aliases: ['suggest', 'suggestion'],
    run: async (bot, message, args) => {
        if (!message.guild.me.permissions.has('SEND_MESSAGES')) return;
        if (cooldown.has(message.author.id)) {
            message.channel.send('ERROR: You have to wait one hour in order to report something again!').then(message => {
                setTimeout(function() {
                    message.delete();
                }, 5000);
            });
            return;
        }
        if (!args[0]) return message.channel.send('ERROR: You need to specify a message!');

        const msg = args.join(' ');
        bot.users.cache.get('350316509291216906').send(`Reporter: ${message.author.tag} (${message.author.id}) \nMessage: ${msg}`);
        message.channel.send('Your report has been sent!\n\nRemember: abusing the command will result in a bot-blacklist!');

        cooldown.add(message.author.id);
        setTimeout(() => {
            cooldown.delete(message.author.id);
        }, cdseconds * 1000);
    }
};