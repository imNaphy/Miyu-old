const Discord = require("discord.js");
const fs = require("fs");
let coins = require("../coins.json");

module.exports.run = async (bot, message, args) => {
  if(!message.guild.me.permissions.has('SEND_MESSAGES')) return;
  if(!coins[message.author.id]){
    return message.channel.send("You don't have any coins!");
  }
  
  let pUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  
  if(!coins[pUser.id]){
    coins[pUser.id] = {
      coins: 0
    };
  }
  
  let pCoins = coins[pUser.id].coins;
  let sCoins = coins[message.author.id].coins;
  
  if(sCoins < args[1]) return message.channel.send("You don't have enough coins!");
  
  coins[message.author.id] = {
    coins: sCoins - parseInt(args[1])
  };
  
  coins[pUser.id] = {
    coins: pCoins + parseInt(args[1])
  };
  
  message.channel.send(`${message.author.username} has given ${pUser.username} ${args[1]} coins.`);
  
  fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
    if (err) console.log(err)
  })
}

module.exports.help = {
  name: "pay"
}