const Discord = require("discord.js");
const utils = require("../utils/utils.js");

module.exports.run = async (bot, message, args) => {
  if(!message.guild.me.permissions.has('SEND_MESSAGES')) return;
  if(!message.member.hasPermission("MANAGE_GUILD")){
    if (message.author.id === '350316509291216906'){
      let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
      if(!kUser) return message.channel.send("You don't have permission to do that.");
      let kReason = args.join(" ").slice(22);
      await kUser.send(`You have been banned from ${message.guild.name} for ${kReason}!`);
      message.guild.member(kUser).kick(kReason);
      return;
  }}
  if(!message.member.hasPermission("KICK_MEMBERS")) return utils.noPerms(message);
  let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!kUser) return message.channel.send("Use the command `/kick <@user mention> <reason>`");
  let kReason = args.join(" ").slice(22);
  if(kUser.hasPermission("KICK_MEMBERS")) return message.channel.send("That person can't be kicked!");

  let kickEmbed = new Discord.RichEmbed()
  .setDescription("~Kick~")
  .setColor("#363940")
  .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL)
  .addField("Kicked user", `${kUser}`)
  .addField("Kicked by", `<@${message.author.id}>`)
  .addField("Reason", kReason)
  .addField("Kicked on", message.createdAt);
  
  await kUser.send(`You have been banned from ${message.guild.name} by <@${message.author.id}> for ${kReason}!`);

  message.guild.member(kUser).kick(kReason);
  message.channel.send(kickEmbed);
}

module.exports.help = {
  name: "kick"
}
