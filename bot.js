console.log('beep beep');

require('dotenv').config();

const Discord = require("discord.js");
const client = new Discord.Client();
const superagent = require("superagent");
const prefix = "!";
client.on('ready', () => console.log("Ready."));

client.on('message', async message => {
    if (message.author.bot) return;
    if (!message.content.toLowerCase().startsWith(prefix)) return;

    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();

    if (cmd === "whatis") {
        let query = args.join(" ");
        if (!query) return message.channel.send("No query.");

        let result = await superagent.get("https://customsearch.googleapis.com/customsearch/v1")
        .query({q: query, cx: "c292a9796a2f4b5e8", key: "AIzaSyAr5TIgzSS8PU5DA-A1ftfR35HiMh8VEA8"});

        if(!result.body.items) return message.channel.send("Not found.");
        if (result.status >= 400) return (await message.channel.send("Errorrr.")).then(console.log(result.message));

        let res =result.body.items[0];
        const embed = new Discord.MessageEmbed()
        .setColor(0x7289DA)
        .setTitle(res.title)
        .setDescription(res.snippet)
        .setURL(res.link)
        return message.channel.send(embed);

    }
});


client.login(process.env.BOTTOKEN);