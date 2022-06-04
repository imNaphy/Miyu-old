const Discord = require('discord.js');
const superagent = require("superagent");

module.exports = {
    name: 'kangaroo',
    run: async (bot, message, args) => {
        if (!message.guild.me.permissions.has('SEND_MESSAGES')) return;
        let {body} = await superagent.get(`https://some-random-api.ml/animal/kangaroo`);

        const embed = new Discord.MessageEmbed()
        .setAuthor('Kangaroo')
        .setColor('#2F3136')
        .setFooter(`Requested by ${message.author.tag}\nPowered by some-random-api.ml`, message.author.displayAvatarURL())
        .setImage(body.image);
        message.channel.send({embeds: [embed]});
    }
};