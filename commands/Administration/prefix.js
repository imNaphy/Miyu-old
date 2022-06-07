const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'prefix',
    run: async (bot, message, args) => {
        if (!message.guild.me.permissions.has('SEND_MESSAGES')) return;
        if(!args[0]) return message.channel.send(`Use the command: m!prefix <the prefix you want>`);
        if(args[0] === 'm!') {
            let prefixes = JSON.parse(fs.readFileSync("././prefixes.json", "utf8"));
            
            const embed = new Discord.MessageEmbed()
            .setAuthor('Prefix', bot.user.displayAvatarURL())
            .setColor('#2F3136')
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
            .addField('Prefix reset!', `New prefix: ${args[0]}`);
            message.channel.send({embeds: [embed]});
        }

        let prefixes = JSON.parse(fs.readFileSync("././prefixes.json", "utf8"));
        
        prefixes[message.guild.id] = {
            prefixes: args[0]
        }
        
        fs.writeFile("./prefixes.json", JSON.stringify(prefixes), (err) => {
        if (err) console.log(err)
        });
        
        const embed = new Discord.MessageEmbed()
        .setAuthor('Prefix', bot.user.displayAvatarURL())
        .setColor('#2F3136')
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        .addField('Prefix set!', `New prefix: ${args[0]}`);
        message.channel.send({embeds: [embed]});
    }
};