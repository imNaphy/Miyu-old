const Discord = require("discord.js");
const fs = require("fs");
const utils = require("../utils/utils.js");

module.exports.run = async (bot, message, args) => {
  if(!message.guild.me.permissions.has('SEND_MESSAGES')) return;
  if(!message.member.hasPermission("ADMINISTRATOR")) return utils.noPerms(message);
  if(!args[0]) return message.channel.send(`Use the command: /prefix <the prefix you want>`);
  
  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
  
  prefixes[message.guild.id] = {
    prefixes: args[0]
  }
  
  fs.writeFile("./prefixes.json", JSON.stringify(prefixes), (err) => {
    if (err) console.log(err)
  });
  
  let embed = new Discord.RichEmbed()
  .setAuthor(message.author.username, message.member.user.displayAvatarURL)
  .setColor("#363940")
  .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL)
  .addField("Prefix set!", `New prefix: ${args[0]}`);
  
  message.channel.send(embed);
}

module.exports.help = {
  name: "prefix"
}