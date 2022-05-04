const Discord = require('discord.js');
const superagent = require('superagent');
const axios = require('axios');

module.exports = {
    name: 'test2',
    run: async (bot, message, args) => {
        if (!message.guild.me.permissions.has('SEND_MESSAGES')) return;
        /*
        let {body} = await superagent
            .get('https://osu.ppy.sh/api/get_beatmaps')
            .query({k: '94b3572ebdf7b6f4d4910110afd6cfef105b9f91', b: '252002', s: '93398'})
            .then(console.log(res.text));
        */
        axios.get('https://osu.ppy.sh/api/get_beatmaps', {
            params: {
                k: '94b3572ebdf7b6f4d4910110afd6cfef105b9f91',
                //s: '93398',
                b: '252003',
                mods: 80
            }
        })
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }
};