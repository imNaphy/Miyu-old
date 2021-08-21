const Discord = require('discord.js');
const config = require('../../config.json');
const osu = require('node-osu');
const osuAPI = new osu.Api(config.osuAPI, {
    notFoundAsError: true,
    completeScores: true,
    parseNumeric: false
});

function osuMods(bit) {
    mods = [];
    if (bit >= 16384 ) { //Perfect
        bit -= 16416;
        mods.push('PF');
    }
    if (bit >= 16384 ) {
        bit -= 16416;
        mods.push('PF');
    }
    if (bit >= 16384 ) {
        bit -= 16416;
        mods.push('PF');
    }
    if (bit >= 16384 ) {
        bit -= 16416;
        mods.push('PF');
    }
    if (bit >= 16384 ) {
        bit -= 16416;
        mods.push('PF');
    }
    if (bit >= 16384 ) {
        bit -= 16416;
        mods.push('PF');
    }
    if (bit >= 16384 ) {
        bit -= 16416;
        mods.push('PF');
    }
    if (bit >= 16384 ) {
        bit -= 16416;
        mods.push('PF');
    }
    if (bit >= 16384 ) {
        bit -= 16416;
        mods.push('PF');
    }
    if (bit >= 16384 ) {
        bit -= 16416;
        mods.push('PF');
    }
    if (bit >= 16384 ) {
        bit -= 16416;
        mods.push('PF');
    }
    if (bit >= 16384 ) {
        bit -= 16416;
        mods.push('PF');
    }
    if (bit >= 16384 ) {
        bit -= 16416;
        mods.push('PF');
    }
    if (bit >= 16384 ) {
        bit -= 16416;
        mods.push('PF');
    }
    if (bit >= 16384 ) {
        bit -= 16416;
        mods.push('PF');
    }
}

module.exports = {
    name: 'recentscore',
    aliases: ['rs'],
    run: async (bot, message, args) => {
        if (!message.guild.me.permissions.has('SEND_MESSAGES')) return;
        if (!args[0]) return message.channel.send('ERROR: You have to specify a username!');
        try {
            const user = args.join(' ');
            let username;
            await osuAPI.getUser({ u: user }).then(player => {
                username = player.name;
            });
            await osuAPI.getUserRecent({ u: username }).then(score => {
                console.log(score[0]);
                let mods;
                if (score[0].raw_mods === 0) mods = '+ No Mod';
                else mods = osuMods(score[0].raw_mods);
                console.log(modNumber);

                const embed = new Discord.MessageEmbed()
                .setAuthor(`${score[0].beatmap.title} [${score[0].beatmap.version}]`, `http://s.ppy.sh/a/${username}`)
                .setThumbnail(`https://b.ppy.sh/thumb/${score[0].beatmap.beatmapSetId}l.jpg`)
                .setColor('#2F3136')
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL());
                message.channel.send({ content: `**Recent osu! Standard play for ${username}:**`, embeds: [embed]});
            });
        } catch (error) {
            console.error(error);
            return message.channel.send('ERROR: User not found!');
        }
}
};