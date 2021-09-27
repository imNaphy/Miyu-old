const Discord = require('discord.js');

module.exports = {
    name: 'urban',
    aliases: ['ud', 'urbandictionary'],
    run: async (bot, message, args) => {
        if (!message.guild.me.permissions.has('SEND_MESSAGES')) return;
        var urban = require('urban'),
            trollface = urban('trollface');

      /*trollface.first(function(json) {
        console.log(json);
      });*/
      trollface.define(function(json) {
        console.log(json);
      });

      /*
      // Random mode
      var urban = require('urban');

      urban.random().first(function(json) {
        console.log(json);
      });*/
    }
};