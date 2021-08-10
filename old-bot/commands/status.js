const Discord = require("discord.js");
const utils = require("../utils/utils.js");

module.exports.run = async (bot, message, args) => {
  if(!message.guild.me.permissions.has('SEND_MESSAGES')) return;
  if (message.author.id !== '350316509291216906') return utils.noPerms(message);
  let activity = args[0] || "PLAYING";
  if(!args[1]) return message.channel.send("Use the command: /status [type of status] <status>");
  bot.user.setActivity(`${args[1]}`);
  let embed = new Discord.RichEmbed()
  .setColor("#363940")
  .setDescription(`**Status set to ${args[0]} ${args[1]}!**`);
  
  bot.user.setActivity(`${args[1]}`, { type: `${args[0]}` });
  return message.channel.send(embed);
}

module.exports.help = {
  name: "status"
}