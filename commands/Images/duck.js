const Discord = require('discord.js');
const superagent = require("superagent");

module.exports = {
    name: 'duck',
    aliases: ['quack'],
    run: async (bot, message, args) => {
        if (!message.guild.me.permissions.has('SEND_MESSAGES')) return;
        let {body} = await superagent.get(`https://random-d.uk/api/v1/random?type=jpg`);

        const embed = new Discord.MessageEmbed()
        .setAuthor('🦆 Duck')
        .setColor('#2F3136')
        .setFooter(`Requested by ${message.author.tag}\nPowered by random-d.uk`, message.author.displayAvatarURL())
        .setImage(body.url);
        message.channel.send({embeds: [embed]});
    }
};