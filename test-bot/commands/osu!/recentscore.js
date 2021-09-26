const Discord = require('discord.js');
const config = require('../../config.json');

var readline = require("readline");
var osu = require('ojsama');
/*const osu = require('node-osu');
const osuAPI = new osu.Api(config.osuAPI, {
    notFoundAsError: true,
    completeScores: true,
    parseNumeric: false
});

function osuMods(bit) {
    var mods = [];
    let finalMods = '';
    if (bit >= 16384) { // Perfect
        bit -= 16416;
        mods.push('PF');
    }
    if (bit >= 4096) { // Spun Out
        bit -= 4096;
        mods.push('SO');
    }
    if (bit >= 1024) { // Flashlight
        bit -= 1024;
        mods.push('FL');
    }
    if (bit >= 512) { // Nightcore
        bit -= 576;
        DT = 1;
        mods.push('NC');
    }
    if (bit >= 256) { // Half Time
        bit -= 256;
        HT = 1;
        mods.push('HT');
    }
    if (bit >= 64) { // Double Time
        bit -= 64;
        DT = 1;
        mods.push('DT');
    }
    if (bit >= 32) { // Sudden Death
        bit -= 32;
        mods.push('SD');
    }
    if (bit >= 16) { // Hard Rock
        bit -= 16;
        HR = 1;
        mods.push('HR');
    }
    if (bit >= 8) { // Hidden
        bit -= 8;
        mods.push('HD');
    }
    if (bit >= 4) { // Touch Device
        bit -= 4;
        mods.push('TD');
    }
    if (bit >= 2) { // Easy
        bit -= 2;
        EZ = 1;
        mods.push('EZ');
    }
    if (bit >= 1) { // No Fail
        bit -= 1;
        mods.push('NF');
    }
    for (let i = mods.length; i >= 1; --i) {
        finalMods += mods[i - 1];
    }
    return finalMods;
}*/

module.exports = {
    name: 'recentscore',
    aliases: ['rs'],
    run: async (bot, message, args) => {
        if (!message.guild.me.permissions.has('SEND_MESSAGES')) return;
        if (!args[0]) return message.channel.send('ERROR: You have to specify a username!');
        try {
            const user = args.join(' ');
            //let username, userId, beatmapId, modsList, mods, title, version, beatmapSetId;
            /*
            await osuAPI.getUser({ u: user }).then(player => {
                username = player.name;
                userId = player.id;
            });
            await osuAPI.getUserRecent({ u: username }).then(score => {
                console.log(score[0]);
                beatmapId = score[0].beatmap.id;
                beatmapSetId = score[0].beatmap.beatmapSetId;
                title = score[0].beatmap.title;
                version = score[0].beatmap.version;
                if (score[0].raw_mods === 0) modsList = ' No Mod';
                else modsList = osuMods(score[0].raw_mods);
                mods = score[0].raw_mods;
            });
            await osuAPI.getBeatmaps({ b: beatmapId, mods: mods }).then(beatmap => {
                stars = beatmap[0].difficulty.rating.slice(0, 4);
            });

            const embed = new Discord.MessageEmbed()
            .setAuthor(`${title} [${version}] +${modsList} [${stars}★]`, `http://s.ppy.sh/a/${userId}`)
            .setThumbnail(`https://b.ppy.sh/thumb/${beatmapSetId}l.jpg`)
            .setColor('#2F3136')
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL());
            message.channel.send({ content: `**Recent osu! Standard play for ${username}:**`, embeds: [embed]});
            */
            
            
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
        } catch (error) {
            console.error(error);
            return message.channel.send('ERROR: User not found!');
        }
}
};