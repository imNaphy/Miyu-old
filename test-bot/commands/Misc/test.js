const Discord = require('discord.js');
const osu = require('ojsama');

module.exports = {
    name: 'test',
    run: async (bot, message, args) => {
        if (!message.guild.me.permissions.has('SEND_MESSAGES')) return;
        const member = message.mentions.members.first() || message.member;
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
        message.channel.send({embeds: [embed]});
        var readline = require("readline");
        var osu = require("./ojsama");

        var mods = osu.modbits.none;
        var acc_percent;
        var combo;
        var nmiss;

        // get mods, acc, combo, misses from command line arguments
        // format: +HDDT 95% 300x 1m
        var argv = process.argv;

        for (var i = 2; i < argv.length; ++i)
        {
        if (argv[i].startsWith("+")) {
            mods = osu.modbits.from_string(argv[i].slice(1) || "");
        }

        else if (argv[i].endsWith("%")) {
            acc_percent = parseFloat(argv[i]);
        }

        else if (argv[i].endsWith("x")) {
            combo = parseInt(argv[i]);
        }

        else if (argv[i].endsWith("m")) {
            nmiss = parseInt(argv[i]);
        }
        }

        var parser = new osu.parser();
        readline.createInterface({
        input: process.stdin, terminal: false
        })
        .on("line", parser.feed_line.bind(parser))
        .on("close", function() {
        var map = parser.map;
        console.log(map.toString());

        if (mods) {
            console.log("+" + osu.modbits.string(mods));
        }

        var stars = new osu.diff().calc({map: map, mods: mods});
        console.log(stars.toString());

        var pp = osu.ppv2({
            stars: stars,
            combo: combo,
            nmiss: nmiss,
            acc_percent: acc_percent,
        });

        var max_combo = map.max_combo();
        combo = combo || max_combo;

        console.log(pp.computed_accuracy.toString());
        console.log(combo + "/" + max_combo + "x");

        console.log(pp.toString());
        });
        //await message.guild.fetchOwner().then(guildMember => owner = guildMember);
        //if (owner.nickname === null) message.channel.send('test1');
        //else message.channel.send('test2');
        //for (let i = 1; i <= 100; ++i) message.channel.send('test');
    }
};