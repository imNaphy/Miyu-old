const Discord = require('discord.js');
const superagent = require("superagent");

module.exports = {
    name: 'cat',
    aliases: ['meow'],
    run: async (bot, message, args) => {
        if (!message.guild.me.permissions.has('SEND_MESSAGES')) return;
        
        try {
            //let {body} = await superagent.get(`https://aws.random.cat/meow`);
            let {body} = await superagent.get(`http://random.cat`);
            console.log(body);
            if (body.file) {
                const embed = new Discord.MessageEmbed()
                .setAuthor('🐱 Meow')
                .setColor('#2F3136')
                .setFooter(`Requested by ${message.author.tag}\nPowered by random.cat`, message.author.displayAvatarURL())
                .setImage(body.file);
                await message.channel.send({embeds: [embed]});
            }
        } catch (error) {
            console.log(error);
        }
            
        
    }
};