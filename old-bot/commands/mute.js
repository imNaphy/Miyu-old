const Discord = require("discord.js");
const ms = require("ms");
const utils = require("../utils/utils.js");

module.exports.run = async (bot, message, args) => {
  if(!message.guild.me.permissions.has('SEND_MESSAGES')) return;
  if(!message.member.hasPermission("MANAGE_MESSAGES")){
    if (message.author.id === '350316509291216906'){
      let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
      if(!tomute) return message.channel.send("You don't have permission to do that.");
      let muterole = message.guild.roles.find(`name`, "muted");
      if(!muterole){
        try{
          muterole = await message.guild.createRole({
            name: "muted",
            color: "#000000",
            permissions:[]
          });
          message.guild.channels.forEach(async (channel, id) => {
            await channel.overwritePermissions(muterole, {
              SEND_MESSAGES: false,
              ADD_REACTIONS: false
            });
          });
        }catch(e){
          console.log(e.stack);
        }
      }

      await(tomute.addRole(muterole.id));
  }}
  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return utils.noPerms(message);
  if(!tomute) return message.channel.send("Use the command: /mute <user> <reason>");
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.channel.send("I can't mute that person!");
  let muterole = message.guild.roles.find(`name`, "muted");
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "muted",
        color: "#000000",
        permissions:[]
      });
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }

  await(tomute.addRole(muterole.id));
  message.channel.send(`<@${tomute.id}> has been muted!`);
}

module.exports.help = {
  name: "mute"
}
