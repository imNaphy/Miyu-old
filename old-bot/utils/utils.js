const Discord = require("discord.js");
const fs = require("fs");
let botconfig = require("../botconfig.json");

module.exports.noPerms = (message) => {
  let embed = new Discord.RichEmbed()
  .setColor("#363940")
  .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL)
  .setDescription("**You don't have permission to do that!**");

  message.channel.send(embed)
  return;
}

module.exports.correctUsage = (message, Usage) => {
  let embed = new Discord.RichEmbed()
  .setColor("#363940")
  .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL)
  .addField("› Use the following command", Usage);

  message.channel.send(embed)
  return;
}