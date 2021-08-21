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
    aliases: ['osu!', 'std', 'osustd', 'osu!std'],
    run: async (bot, message, args) => {
        if (!message.guild.me.permissions.has('SEND_MESSAGES')) return;
        if (!args[0]) return message.channel.send('ERROR: You have to specify a username!');
        try {
            const user = args.join(' ');
            await osuAPI.getUser({ u: user }).then(u => {
                //Ranking
                let rank;
                let rankCountry = '';
                if (u.pp.raw === '0') {
                    rank = '-';
                }
                else {
                    rank = u.pp.rank;
                    rank = '#' + rank.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    rankCountry = u.pp.countryRank;
                    rankCountry = '#' + rankCountry.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                }
                //PP
                let pp = u.pp.raw;
                pp = pp.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                //Ranked Score
                let rankedScore = u.scores.ranked;
                rankedScore = rankedScore.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                //Total Score
                let totalScore = u.scores.total;
                totalScore = totalScore.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                //Level
                let level;
                if (u.level >= 100) level = u.level.slice(0, 3) + ` + ${u.level.slice(4, 6)}%`;
                if (u.level < 10) level = u.level.slice(0, 1) + ` + ${u.level.slice(2, 4)}%`;
                if (u.level >= 10 && u.level < 100) level = u.level.slice(0, 2) + ` + ${u.level.slice(3, 5)}%`;
                //Accuracy
                let accuracy;
                if (u.accuracy === '100') accuracy = '100.00%';
                else accuracy = u.accuracy.slice(0, 5) + '%';
                //Time Played
                let time = (u.secondsPlayed / 60 / 60).toString();
                time = time.split('.')[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                //Play Count
                let playCount = u.counts.plays;
                playCount = playCount.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                const embed = new Discord.MessageEmbed()
                .setAuthor(`osu! Standard Profile for ${u.name}`, `https://osu.ppy.sh/images/flags/${u.country}.png`)
                .setThumbnail(`http://s.ppy.sh/a/${u.id}`)
                .setColor('#2F3136')
                .addField('› Global Rank', `${rank} (${u.country}${rankCountry})`, true)
                .addField('› Level', level, true)
                .addField('› PP', pp, true)
                .addField('› Accuracy', accuracy, true)
                .addField('› Play Count', playCount, true)
                .addField('› Time Played', `${time} hours`, true)
                .addField('› Ranked Score', rankedScore, true)
                .addField('› Total Score', totalScore, true)
                .addField('› Ranks', `<:SSH:878549683931324456>\`${u.counts.SSH}\`<:SS:878549683746775061>\`${u.counts.SS}\`<:SH:878549683679678474>\`${u.counts.SH}\`<:S_:878549683671269376>\`${u.counts.S}\`<:A_:878549683759382560>\`${u.counts.A}\``, false)
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL());
                message.channel.send({embeds: [embed]});
            });
        } catch (error) {
            console.error(error);
            return message.channel.send('ERROR: User not found!');
        }
}
};