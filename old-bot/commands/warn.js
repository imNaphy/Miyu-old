const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
const utils = require("../utils/utils.js");
let warns = JSON.parse(fs.readFileSync("./warnlist.json", "utf8"));

module.exports.run = async (bot, message, args) => {
/*  if(!message.member.hasPermission("MANAGE_GUILD")) return utils.noPerms(message);
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!wUser) return message.channel.send("Can't find that user!");
  if(wUser.hasPermission("MANAGE_GUILD")) return message.channel.send("I can't warn that user!");
  let reason = args.join(" ").slice(22);

  if(!warns[wUser.id]) warns[wUser.id] = {
    warns: 0
  };

  warns[wUser.id].warns++;

  fs.writeFile("./warnlist.json", JSON.stringify(warns), (err) => {
    if (err) console.log(err)
  });

  let warnEmbed = new Discord.RichEmbed()
  .setDescription("~Warn~")
  .setColor("#363940")
  .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL)
  .addField("Warned user", `<@${wUser.id}>`)
  .addField("Warned by", `<@${message.author.id}>`)
  .addField("Reason", reason)
  .addField("Number of warnings", warns[wUser.id].warns)
  .addField("Banned on", message.createdAt);

  message.channel.send(warnEmbed); */
}

module.exports.help = {
  name: "warn"
}
