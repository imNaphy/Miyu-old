const Discord = require('discord.js');
const superagent = require("superagent");

module.exports = {
    name: 'dog',
    aliases: ['woof'],
    run: async (bot, message, args) => {
        if (!message.guild.me.permissions.has('SEND_MESSAGES')) return;
        let {body} = await superagent.get(`https://random.dog/woof.json`);

        const embed = new Discord.MessageEmbed()
        .setAuthor('🐶 Woof')
        .setColor('#363940')
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        .setImage(body.url);
        message.channel.send({embeds: [embed]});
    }
};