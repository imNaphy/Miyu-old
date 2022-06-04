const Discord = require('discord.js');
const superagent = require("superagent");

module.exports = {
    name: 'koala',
    run: async (bot, message, args) => {
        if (!message.guild.me.permissions.has('SEND_MESSAGES')) return;
        let {body} = await superagent.get(`https://some-random-api.ml/animal/koala`);

        const embed = new Discord.MessageEmbed()
        .setAuthor('Koala')
        .setColor('#2F3136')
        .setFooter(`Requested by ${message.author.tag}\nPowered by some-random-api.ml`, message.author.displayAvatarURL())
        .setImage(body.image);
        message.channel.send({embeds: [embed]});
    }
};