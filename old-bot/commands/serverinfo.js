const Discord = require("discord.js");
const pms = require('parse-ms');

module.exports.run = async (bot, message, args) => {
  if(!message.guild.me.permissions.has('SEND_MESSAGES')) return;
  let sicon = message.guild.iconURL;
  let created = pms(Date.now() - message.guild.createdAt);
  let serverembed = new Discord.RichEmbed()
  .setAuthor(message.guild.name, sicon)
  .setColor("#363940")
  .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL)
  .setThumbnail(sicon)
  .addField("› Owner", message.guild.owner.displayName, true)
  .addField("› Region", message.guild.region, true)
  .addField("› Roles", message.guild.roles.size, true)
  .addField("› Total Members", message.guild.memberCount, true)
  .addField("› Humans", message.guild.members.filter(member => !member.user.bot).size, true)
  .addField("› Bots", message.guild.members.filter(member => member.user.bot).size, true)
  .addField("› Created", `${created.days} days, ${created.hours} hours, ${created.minutes} minutes ago`, true);
  message.channel.send(serverembed);
}

module.exports.help = {
  name: "serverinfo"
}
