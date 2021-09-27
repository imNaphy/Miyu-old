const Discord = require('discord.js');
const urban = require('urban-dictionary');

module.exports = {
    name: 'urban',
    aliases: ['ud', 'urbandictionary'],
    run: async (bot, message, args) => {
        if (!message.guild.me.permissions.has('SEND_MESSAGES')) return;
        const msg = args.join(' ');
        urban.define(msg).then((results) => {
            const embed = new Discord.MessageEmbed()
            .setTitle(`UrbanDictionary definition for ${results[0].word}`)
            .setDescription(results[0].definition)
            .setColor('#2F3136')
            .addField('Example', results[0].example)
            .addField('Submitted by', results[0].author, true)
            .addField('Like/Dislike ratio', `${results[0].thumbs_up} / ${results[0].thumbs_down}`, true)
            .setURL(results[0].permalink)
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL());
            message.channel.send({embeds: [embed]});
        }).catch((error) => {
            return message.channel.send(`${error}`);
        });
    }
};