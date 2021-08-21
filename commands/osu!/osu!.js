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
            await osuAPI.getUser({ u: user }).then(player => {
                //Ranking
                let rank;
                let rankCountry = '';
                if (player.pp.raw === '0') {
                    rank = '-';
                }
                else {
                    rank = player.pp.rank;
                    rank = '#' + rank.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    rankCountry = player.pp.countryRank;
                    rankCountry = '#' + rankCountry.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                }
                //PP
                let pp = player.pp.raw;
                pp = pp.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                //Ranked Score
                let rankedScore = player.scores.ranked;
                rankedScore = rankedScore.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                //Total Score
                let totalScore = player.scores.total;
                totalScore = totalScore.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                //Level
                let level;
                if (player.level >= 100) level = player.level.slice(0, 3) + ` + ${player.level.slice(4, 6)}%`;
                if (player.level < 10) level = player.level.slice(0, 1) + ` + ${player.level.slice(2, 4)}%`;
                if (player.level >= 10 && player.level < 100) level = player.level.slice(0, 2) + ` + ${player.level.slice(3, 5)}%`;
                //Accuracy
                let accuracy;
                if (player.accuracy === '100') accuracy = '100.00%';
                else accuracy = player.accuracy.slice(0, 5) + '%';
                //Time Played
                let time = (player.secondsPlayed / 60 / 60).toString();
                time = time.split('.')[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                //Play Count
                let playCount = player.counts.plays;
                playCount = playCount.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                const embed = new Discord.MessageEmbed()
                .setAuthor(`osu! Standard Profile for ${player.name}`, `https://osu.ppy.sh/images/flags/${player.country}.png`)
                .setThumbnail(`http://s.ppy.sh/a/${player.id}`)
                .setColor('#2F3136')
                .addField('› Global Rank', `${rank} (${player.country}${rankCountry})`, true)
                .addField('› Level', level, true)
                .addField('› PP', pp, true)
                .addField('› Accuracy', accuracy, true)
                .addField('› Play Count', playCount, true)
                .addField('› Time Played', `${time} hours`, true)
                .addField('› Ranked Score', rankedScore, true)
                .addField('› Total Score', totalScore, true)
                .addField('› Ranks', `<:ranking_SSH:878549683931324456>\`${player.counts.SSH}\`<:ranking_SS:878549683746775061>\`${player.counts.SS}\`<:ranking_SH:878549683679678474>\`${player.counts.SH}\`<:ranking_S:878549683671269376>\`${player.counts.S}\`<:ranking_A:878549683759382560>\`${player.counts.A}\``, false)
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL());
                message.channel.send({embeds: [embed]});
            });
        } catch (error) {
            console.error(error);
            return message.channel.send('ERROR: User not found!');
        }
}
};