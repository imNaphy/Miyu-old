const Discord = require('discord.js');

module.exports = {
    name: 'eval',
    run: async (bot, message, args) => {
        if (!message.guild.me.permissions.has('SEND_MESSAGES')) return;
        if (!message.author.id === '350316509291216906') return;
        try {
            const codein = args.join(" ");
            let code = eval(codein);
    
            if (typeof code !== 'string')
                code = require('util').inspect(code, { depth: 0 });
            const embed = new Discord.MessageEmbed()
            .setAuthor('Evaluate')
            .setColor("#363940")
            .addField('📥 Input', `\`\`\`js\n${codein}\`\`\``)
            .addField('📤 Output', `\`\`\`js\n${code}\n\`\`\``);
            await message.channel.send({embeds: [embed]})
        } catch(error) {
            message.channel.send(`\`\`\`js\n${error}\n\`\`\``);
        }
        return;
    }
};