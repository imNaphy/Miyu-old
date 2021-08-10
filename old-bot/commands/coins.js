const Discord = require("discord.js");
let coins = require("../coins.json");

module.exports.run = async (bot, message, args) => {
  if(!message.guild.me.permissions.has('SEND_MESSAGES')) return;
  if(!coins[message.author.id]){
    coins[message.author.id] = {
      coins: 0
    };
  }

  let uCoins = coins[message.author.id].coins;

  message.channel.send(`**At the moment you currently have ${uCoins} coins!**`);
}

module.exports.help = {
  name: "coins"
}
