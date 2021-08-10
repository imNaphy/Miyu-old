const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if(!message.guild.me.permissions.has('SEND_MESSAGES')) return;
  let embed = new Discord.RichEmbed()
  .setAuthor("Asahi", bot.user.avatarURL)
  .setColor("#363940")
  .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL)
  .setDescription("Here is a list of commands you can use.")
  .addField("**› Information**", "`avatar`, `coins`, `invite`, `level`, `ping`, `serverinfo`, `servers`, `userinfo`.")
  .addField("**› Moderation**", "`ban`, `clear`, `kick`, `mute`, `say`.")
  .addField("**› Administration**", "`addrole`, `removerole`, `poll`, `prefix`.")
  .addField("**› Games**", "`fortnite`.")
  .addField("**› Images**", "`cat`, `dog`, `duck`.")
  .addField("**› Fun**", "`8ball`.")
  .addField("**› Music**", "`play`, `skip`, `stop`, `volume`, `nowplaying / np`, `queue`, `pause`, `resume`.")
  .addField("**› Misc**", "`pay`, `report`, `uptime`, `upvote`.");
  
  message.channel.send(embed);
}

module.exports.help = {
  name: "help"
}