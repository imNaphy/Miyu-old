const Discord = require('discord.js');
//const test = require('../../utils/mFunc.js');
const ytdl = require('ytdl-core');
const fs = require('fs');

module.exports = {
    name: 'test',
    run: async (bot, message, args) => {
        if (!message.guild.me.permissions.has('SEND_MESSAGES')) return;
        const member = message.mentions.members.first() || message.member;
        /*
        const embed = new Discord.MessageEmbed()
        .setAuthor('Embed mare manca-l-ar mama are si URL textul asta', bot.user.displayAvatarURL(), 'https://naphy.cf')
        .setTitle('are si titlu embed-ul asta, URL-ul e de la .setURL')
        .setDescription('are si descriere')
        .setColor('#2F3136')
        .setImage('https://naphy.cf/domnulchef.png')
        .setThumbnail('https://cdn.discordapp.com/avatars/756085215650119710/0e446c930445303766e6748006eed4e5.webp?size=2048') //poza de la bot, miyu
        .addField('Field', 'text1 din field', true)
        .addField('Field2', 'text2 din field, ambele inline = pe aceeasi linie', true)
        .setURL('https://naphy.cf')
        .setFooter(`si footer avem, cum sa n-avem ${message.author.tag}`, message.author.displayAvatarURL());
        ///message.channel.send({embeds: [embed]});
        //await message.guild.fetchOwner().then(guildMember => owner = guildMember);
        //if (owner.nickname === null) message.channel.send('test1');
        //else message.channel.send('test2');
        //for (let i = 1; i <= 100; ++i) message.channel.send('test');
        //const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        //if (user) user.send('test');
        //test.handleVideo(message, 'test');
        //require('./test')(bot, message, args, cmd)
        ytdl("https://www.youtube.com/watch?v=x8VYWazR5mE", {
            filter: "audioonly",
            fmt: "mp3"
        }).pipe(fs.createWriteStream("yorunikakeru.mp3"));
        */
        fs.readFile('test.json', 'utf8', (err, data) => {
            if (err) console.error(err);
            console.log(data);
        })
    }
};