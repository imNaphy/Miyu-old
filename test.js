const Discord = require('discord.js');

const bot = new Discord.Client({ intents: 32767 });

bot.once('ready', () => {
    console.log('Ready!');
});

bot.login('ODg1OTM4MjA1MzY5NzI0OTQ4.YTuUQA.TvIRPIBwF1XMeMcinQRX2lfG3ug');