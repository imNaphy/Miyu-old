const Discord = require('discord.js');
const superagent = require("superagent");

module.exports = {
    name: 'cat',
    aliases: ['meow'],
    run: async (bot, message, args) => {
        if (!message.guild.me.permissions.has('SEND_MESSAGES')) return;
        
        try {
            const {body} = await superagent.get(`https://aws.random.cat/meow`);
            if (body.file) {
                const embed = new Discord.MessageEmbed()
                .setAuthor('🐱 Meow')
                .setColor('#363940')
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
                .setImage(body.file);
                await message.channel.send({embeds: [embed]});
            }
        } catch (error) {
            console.log(error);
        }
            
        
    }
};