const Discord = require("discord.js")
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
  if(!message.guild.me.permissions.has('SEND_MESSAGES')) return;
  if (message.author.id !== "350316509291216906") return message.channel.send("You don't have permission to use this command!");
  try {
      await message.channel.send('Bot is rebooting.');
      fs.readdir("./commands/", (err, files) => {
      const filez = files.length
      if (err) return console.error(err);
      message.channel.send(`Refreshed \`${filez + 11}\` commands successfully!`)
      console.log("Refreshed " + filez + " commands")
      files.forEach(file => {
        delete require.cache[require.resolve(`./${file}`)];
      });
    });
    process.exit(1);
  } catch (e) {
      console.log(e);
    }
}

module.exports.help = {
  name: "reboot"
}