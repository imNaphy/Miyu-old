const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
  if(!message.guild.me.permissions.has('SEND_MESSAGES')) return;
  let {body} = await superagent
  .get(`https://aws.random.cat/meow`);
  
  let catembed = new Discord.RichEmbed()
  .setTitle("Meow")
  .setColor("#363940")
  .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL)
  .setImage(body.file);
  
  
  message.channel.send(catembed);
}

module.exports.help = {
  name: "cat"
}