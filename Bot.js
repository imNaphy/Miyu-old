const Discord = require('discord.js');
const config = require('./config.json');
const fs = require('fs');

const bot = new Discord.Client({ intents: 32767 });
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

fs.readdirSync(`./commands/`).forEach(dir => {
    const commandFiles = fs.readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const command = require(`./commands/${dir}/${file}`);
        bot.commands.set(command.name, command);
        console.log(`${file} loaded!`)
        if (command.aliases && Array.isArray(command.aliases)) command.aliases.forEach(alias => bot.aliases.set(alias, command.name));
    }
});

bot.once('ready', () => {
    console.log('Ready!');
    bot.user.setActivity('over my lovely users <3 | /help', { type: 'WATCHING' });
});

/*bot.on('message', async message => {
    var msg = message.content.toLowerCase();
    if (msg.includes('milsugi')) return message.channel.send('ma-ta il suge!');
});*/

bot.on('message',  async message => {
    const prefix = '/';
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(1).trim().split(/ +/);
    const cmd = args.shift().toLowerCase();
    if (cmd.length === 0) return;
    
    let command = bot.commands.get(cmd);
    if (!command) command = bot.commands.get(bot.aliases.get(cmd));

    if (command) {
        try {
            command.run(bot, message, args);
        } catch (error) {
            return;
        }
    }
});

bot.login(config.token);