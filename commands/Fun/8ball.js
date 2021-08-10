const Discord = require('discord.js');

module.exports = {
    name: '8ball',
    run: async (bot, message, args) => {
        if (!message.guild.me.permissions.has('SEND_MESSAGES')) return;
        if (!args[2]) return message.channel.send('ERROR: Please write a full sentence!');
        if (!args[args.length - 1].endsWith("?")) return message.channel.send('ERROR: The phrase you requested is not a question!');
        const replies = ['Yes.', 'No.', 'I don\'t know.', 'Ask again later.'];

        const result = Math.floor((Math.random() * replies.length));
        //let question = args.slice(0).join(" ");

        return message.channel.send(replies[result]);
    }
};