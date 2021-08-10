const Discord = require("discord.js");
const Coins = require("../coins.json");

module.exports.run = async (bot, message, args) => {
/*  Coins.find({serverID: message.guild.id}).sort([['coins', 'descending']]).exec(err, res) => {
    if(err) console.log(err);
    
    let embed = new Discord.RichEmbed()
    .setTitle("Coins Leaderboard")
    if(res.length === 0){
      embed.setColor("#363940");
      embed.addField("No data found", "Please type in chat to gain coins");
    }else if (res.length < 10){
      embed.setColor("#363940");
      for (i=0; i<res.length; i++){
        let name = message.guild.members.get(res[i].userID) || "User Left";
        if(name === "User Left"){
           embed.addField(`${i + 1}. ${name}`, `**Coins**: ${res[i].coins}`);
        }
      }
    }else
  } */
}

module.exports.help = {
  name: "rank"
}