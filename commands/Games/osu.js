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
                var time = (u.secondsPlayed / 60 / 60).toString();
                time = time.split('.')[0];
                const embed = new Discord.MessageEmbed()
                .setAuthor(`osu! Standard Profile for ${u.name}`, `http://s.ppy.sh/a/${u.id}`)
                .setThumbnail(`http://s.ppy.sh/a/${u.id}`)
                .setColor('#2F3136')
                .addField('› Bancho Rank', `${rank} (${u.country}${rankCountry})`, true)
                .addField('› Level', level, true)
                .addField('› PP', u.pp.raw, true)
                .addField('› Accuracy', accuracy, true)
                .addField('› Playcount', u.counts.plays, true)
                .addField('› Time Played', `${time} hours`, true)
                .addField('› Ranks', `<:SSH:878549683931324456>\`${u.counts.SSH}\`<:SS:878549683746775061>\`${u.counts.SS}\`<:SH:878549683679678474>\`${u.counts.SH}\`<:S_:878549683671269376>\`${u.counts.S}\`<:A_:878549683759382560>\`${u.counts.A}\``, true)
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL());
                message.channel.send({embeds: [embed]});
            });
        } catch (error) {
            console.error(error);
            return message.channel.send('ERROR: User not found!');
        }
}
};