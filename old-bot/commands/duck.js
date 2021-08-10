const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
  if(!message.guild.me.permissions.has('SEND_MESSAGES')) return;
  let {body} = await superagent
  .get(`https://random-d.uk/api/v1/random?type=jpg`);
  
  let dogembed = new Discord.RichEmbed()
  .setTitle("Quack")
  .setColor("#363940")
  .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL)
  .setImage(body.url);
  
  message.channel.send(dogembed);
}

module.exports.help = {
  name: "duck"
}