const Discord = require('discord.js');
const config = require('../../config.json');
const osu = require('node-osu');
const osuAPI = new osu.Api(config.osuAPI, {
    notFoundAsError: true,
    completeScores: true,
    parseNumeric: false
});

module.exports = {
    name: 'osu',
    run: async (bot, message, args) => {
        if (!message.guild.me.permissions.has('SEND_MESSAGES')) return;
        if (!args[0]) return message.channel.send('Possible arguments: \`profile / user\`, \`recentscore / recent / rs\`, \`map\`.');
        args[0] = args[0].toLowerCase();
        if (args[0] === 'profile' || args[0] === 'user') {
            try {
                const user = args.join(' ').slice(args[0].length + 1);
                await osuAPI.getUser({ u: user }).then(u => {
                    console.log(u);
                    let rank;
                    let rankCountry = '';
                    if (u.pp.raw === '0') {
                        rank = '-';
                    }
                    else {
                        rank = `#${u.pp.rank}`;
                        rankCountry = `#${u.pp.countryRank}`
                    }
                    const level = u.level.slice(0, -4) + ` + ${u.level.slice(-3, -1)}%`;
                    let accuracy;
                    if (u.accuracy === '100') accuracy = '100.00%';
                    else accuracy = u.accuracy.slice(0, 5) + '%';
                    var test = u.secondsPlayed / 60 / 60;
                    //test = test.split('.');
                    //const hours = (u.secondsPlayed / 60 / 60).split('.');
                    //console.log(test[0]);
                    const embed = new Discord.MessageEmbed()
                    .setAuthor(`osu! Standard Profile for ${u.name}`, `http://s.ppy.sh/a/${u.id}`)
                    .setThumbnail(`http://s.ppy.sh/a/${u.id}`)
                    .setColor('#363940')
                    .setDescription(`**› Bancho Rank:** ${rank} (${u.country}${rankCountry})\n**› Level:** ${level}\n**› PP:** ${u.pp.raw} **› Acc:** ${accuracy}\n**› Playcount:** ${u.counts.plays} (${u.secondsPlayed / 60 / 60})`)
                    .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL());
                    message.channel.send({embeds: [embed]});
                });
            } catch (error) {
                console.error(error);
                return message.channel.send('ERROR: User not found!');
            }
        }
        
        
    }
};