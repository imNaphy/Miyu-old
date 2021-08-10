const Discord = require("discord.js");
const botconfig = require("../botconfig");
let xp = require("../xp.json");

module.exports.run = async (bot, message, args) => {
  if(!message.guild.me.permissions.has('SEND_MESSAGES')) return;

  if(!xp[message.author.id]){
   xp[message.author.id] = {
     xp: 0,
     level: 1
  };
  }
  let curxp = xp[message.author.id].xp;
  let curlvl = xp[message.author.id].level;
  let nxtLvlXp = curlvl * 500;
  let difference = nxtLvlXp - curxp;

  let lvlEmbed = new Discord.RichEmbed()
  .setAuthor(message.author.username, message.member.user.displayAvatarURL)
  .setColor("#363940")
  .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL)
  .addField("› Level", curlvl, true)
  .addField("› XP", curxp, true)
  .addField("› XP until you level up", difference);

  message.channel.send(lvlEmbed);

}

module.exports.help = {
  name: "level"
}