//Bot Main File

const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const Util = require("discord.js");
const YouTube = require("simple-youtube-api");
const ytdl = require("ytdl-core");
const queue = new Map();
const fs = require("fs");
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const youtube = new YouTube(botconfig.GOOGLE_API_KEY);
let coins = require("./coins.json");
let xp = require("./xp.json");
let cooldown = new Set();
let cdseconds = 5;

//Listarea comenzilor care sunt pregatite.

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });

});

//Watching-ul de la Bot

bot.on("ready", async () => {
  console.log(`I am online and ready to go!`);
  bot.user.setActivity('over my lovely users <3 | /help', { type: 'WATCHING' });
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
  
  if(!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
      prefixes: botconfig.prefix
    };
  }
  
  let prefix = prefixes[message.guild.id].prefixes;
  
  if(message.content.startsWith(prefix)) return;
  else {

    let xpAdd = Math.floor(Math.random() * 3) + 4;

    if(!xp[message.author.id]){
      xp[message.author.id] = {
        xp: 0,
        level: 1
      };
    }

    let curxp = xp[message.author.id].xp;
    let curlvl = xp[message.author.id].level;
    let nxtLvl = xp[message.author.id].level * 500;
    xp[message.author.id].xp =  curxp + xpAdd;
    if(nxtLvl <= xp[message.author.id].xp){
      xp[message.author.id].level = curlvl + 1;
      let lvlup = new Discord.RichEmbed()
      .setAuthor(message.author.username, message.member.user.displayAvatarURL)
      .setColor("#363940")
      .setDescription(`**You are now level ${curlvl + 1}!**`);

      message.channel.send(lvlup).then(msg => {msg.delete(10000)});
    }
    fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
      if(err) console.log(err)
    });
  }
});

//Toate celelalte comenzi in afara de cele de muzica

bot.on("message", async message => {

  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  
  //Coins System
  
  if(!coins[message.author.id]){
    coins[message.author.id] = {
      coins: 0
    };
  }
  let coinAmt = Math.floor(Math.random() * 15) + 1;
  let baseAmt = Math.floor(Math.random() * 15) + 1;

  if(coinAmt === baseAmt){
    coins[message.author.id] = {
      coins: coins[message.author.id].coins + coinAmt
    }};
  
  fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
    if (err) console.log(err)
  });
  
  //Prefix System
  
  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
  
  if(!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
      prefixes: botconfig.prefix
    };
  }
  
  let prefix = prefixes[message.guild.id].prefixes;
  
  //Anti Command Spam
  
  if (!message.content.startsWith(prefix)) return;
  
  if(cooldown.has(message.author.id)){
    message.delete();
    return message.channel.send("You have to wait 5 seconds in order to write another command!");
  }
  if(!message.member.hasPermission("ADMINISTRATOR")){
    cooldown.add(message.author.id);
  }
  

  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  
  //Executarea comenzii
  
  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);
  
  //Crearea cooldown-ului daca comanda a fost executata cu succes
  
  setTimeout(() => {
    cooldown.delete(message.author.id)
  }, cdseconds * 1000)

});

//Comenzile de muzica

bot.on("message", async message => {
  
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  
  if(!coins[message.author.id]){
    coins[message.author.id] = {
      coins: 0
    };
  }
  
  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
  
  if(!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
      prefixes: botconfig.prefix
    };
  }
  
  let prefix = prefixes[message.guild.id].prefixes;
  
  if(!message.content.startsWith(prefix)) return;
  const args = message.content.split(' ');
  const searchString = args.slice(1).join(' ');
  const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
  const serverQueue = queue.get(message.guild.id);
  
  //Comanda Play
  
  if(message.content.startsWith(`${prefix}play`)) {
    const voiceChannel = message.member.voiceChannel;
    if(!voiceChannel) return message.channel.send("You must be in a voice channel in order to use this command!");
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT")) return message.channel.send("I need the permission to connect to a voice channel!");
    if (!permissions.has("SPEAK")) return message.channel.send("I need the permission to speak in a voice channel!");

    if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
      const playlist = await youtube.getPlaylist(url);
      const videos = await playlist.getVideos();
      for (const video of Object.values(videos)) {
        const video2 = await youtube.getVideoByID(video.id);
        await handleVideo(video2, message, voiceChannel, true);
      }
      return message.channel.send(`The **${playlist.title}** playlist has been added to the queue!`);
    } else {
        try {
          var video = await youtube.getVideo(url);
        } catch (error) {
        try {
          var videos = await youtube.searchVideos(searchString, 10);
          let index = 0;
          message.channel.send(`**Select a video:** \n${videos.map(video2 => `**  ${++index})** ${video2.title}`).join(`\n`)} \n\nPlease provide a value to select one of the search results ranging from 1 to 10.\nIf no value is provided within 10 seconds it will be cancelled.`).then(msg => {msg.delete(10000)});
          try {
            var response = await message.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11 , {
               maxMatches: 1,
               time: 10000,
               errors: ['time']
            });
          } catch (error) {
            console.log(error);
            return message.channel.send("No or invalid value entered, cancelling video selection.");
          }
          const videoIndex = parseInt(response.first().content);
          var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
        } catch (error) {
          return message.channel.send("I could not obtain any search results.");
        }
      }
      
      return handleVideo(video, message, voiceChannel);
    }
    
  //Comanda Skip
    
  } else if (message.content.startsWith(`${prefix}skip`)) {
    if (!message.member.voiceChannel) return message.channel.send("You are not in a voice channel!");
    if (!serverQueue) return message.channel.send("There is nothing playing that I could skip!");
    serverQueue.connection.dispatcher.end();
    return;
    
  //Comanda Stop
    
  } else if(message.content.startsWith(`${prefix}stop`)) {
    if (!message.member.voiceChannel) return message.channel.send("You are not in a voice channel!");
    if (!serverQueue) return message.channel.send("There is nothing playing right now!");
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
    return;
    
  //Comanda Volume
    
  } else if(message.content.startsWith(`${prefix}volume`)){
    if (!args[1]) return message.channel.send(`The current volume is: ${serverQueue.volume}`);
    serverQueue.volume = args[1];
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1]);
    return message.channel.send(`Volume set to: ${args[1]}!`);
    
  //Comanda Now Playing
    
  } else if(message.content.startsWith(`${prefix}np`) || message.content.startsWith(`${prefix}nowplaying`)) {
    if (!serverQueue) return message.channel.send("There is nothing playing right now!");
    
    return message.channel.send(`🎶 Now playing: ${serverQueue.songs[0].title}`);
    
  //Comanda Queue
    
  } else if(message.content.startsWith(`${prefix}queue`)) {
    if (!serverQueue) return message.channel.send("There is nothing playing right now!");
    return message.channel.send(`**Song queue:** \n${serverQueue.songs.map(song => `**  -** ${song.title}`).join(`\n`)} \n\n **Now playing:** ${serverQueue.songs[0].title}`);
    
  //Comanda Pause
    
  } else if(message.content.startsWith(`${prefix}pause`)) {
    if (!message.member.voiceChannel) return message.channel.send("You are not in a voice channel!");
    if (serverQueue && serverQueue.playing){
      serverQueue.playing = false;
      serverQueue.connection.dispatcher.pause();
      return message.channel.send(`⏸ Paused the video successfully!`);
    } 
    return message.channel.send("There is nothing playing right now!");
    
  //Comanda Resume
    
  } else if(message.content.startsWith(`${prefix}resume`)) {
    if (serverQueue && !serverQueue.playing){
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      return message.channel.send(`▶ Resumed the video successfully!`);
    } 
    return message.channel.send("There is nothing playing right now!");
  }
  
  //Ultimul return
  
  return;
});

//Functia de pornire de video-uri

async function handleVideo(video, message, voiceChannel, playlist = false) {
  const serverQueue = queue.get(message.guild.id);
  const song = {
  id: video.id,
  title: Util.escapeMarkdown(video.title),
  url: `https://www.youtube.com/watch?v=${video.id}`
  };
  if(!serverQueue) {
    const queueConstruct = {
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 1,
      playing: true
    };
    queue.set(message.guild.id, queueConstruct);
  
    queueConstruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      queueConstruct.connection = connection;
      play(message.guild, queueConstruct.songs[0]);
    } catch (error) {
      console.log(error);
      queue.delete(message.guild.id);
      return message.channel.send("I could not join the voice channel!");
    }
  } else {
    serverQueue.songs.push(song);
    if (playlist) return;
    else return message.channel.send(`${song.title} has been added to the queue!`);
  }
  return;
}

//Functia de Play

function play(guild, song) {
  const serverQueue = queue.get(guild.id);
  
  if(!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }
  
  const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
    .on("end", () => {
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
    .on("error", error => console.log(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume);

  serverQueue.textChannel.send(`🎶 Started playing **${song.title}**`).then(msg => {msg.delete(10000)});
}

bot.login(botconfig.token);