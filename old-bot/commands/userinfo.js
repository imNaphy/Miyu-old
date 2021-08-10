const Discord = require("discord.js");
const moment = require("moment");
const coins = require("../coins.json");
let xp = require("../xp.json");

module.exports.run = async (bot, message, args) => {
  if(!message.guild.me.permissions.has('SEND_MESSAGES')) return;
  let member = message.mentions.members.first() || message.member;
  let status = { online: 'Online', idle: 'Idle', dnd: 'Do not Disturb', offline: 'Offline' };
  let presence = member.presence.game || "Not doing anything";
  let testUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!xp[member.user.id]){
    xp[member.user.id] = {
      xp: 0,
      level: 1
    };
  }
  let curlvl = xp[member.user.id].level;
  if(!coins[member.user.id]){
  coins[member.user.id] = {
    coins: 0
  }};
  let embed = new Discord.RichEmbed()
  .setAuthor(member.user.username, member.user.displayAvatarURL)
  .setColor("#363940")
  .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL)
  .setThumbnail(member.user.displayAvatarURL)
  .addField("› Tag", member.user.tag, true)
  .addField("› ID", member.user.id, true)
  .addField("› Status", status[member.presence.status], true)
  .addField("› Activity", `${presence}`, true)
  .addField("› Coins", coins[member.user.id].coins, true)
  .addField("› Level", curlvl, true)
  .addField("› Roles", member.roles.array().join(" "),)
  .addField("› Joined at", `${moment(member.joinedAt).format("dddd, MMMM Do YYYY")}`, true)
  .addField("› Created at", `${moment(message.author.createdAt).format("dddd, MMMM Do YYYY")}`, true);
  
  message.channel.send(embed);
}

module.exports.help = {
  name: "userinfo"
}
