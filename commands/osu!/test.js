const Discord = require('discord.js');
const axios = require('axios');
const osu = require('ojsama');


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
       /*
        axios.get('https://osu.ppy.sh/api/get_beatmaps', {
            params: {
                k: '94b3572ebdf7b6f4d4910110afd6cfef105b9f91',
                //s: '93398',
                b: '252003',
                mods: 80
            }
        }).then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
        axios.get('https://osu.ppy.sh/api/get_user_best', {
            params: {
                k: '94b3572ebdf7b6f4d4910110afd6cfef105b9f91',
                u: '12123660',
                limit: 1
            }
        }).then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
        */
        let data = await axios.get('https://osu.ppy.sh/api/get_user_recent', {
            params: {
                k: '94b3572ebdf7b6f4d4910110afd6cfef105b9f91',
                u: '12123660',
                limit: 1
            }
        }).then((result) => {
            return result;
        })
        .catch(function (error) {
            console.log(error);
        });
        var mods = data.data.enabled_mods;
        var acc_percent = 67.23;
        var combo = 53;
        var nmiss = 10;

        var parser = new osu.parser();
        
        console.log(data.data);
    }
};