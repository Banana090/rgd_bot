const tokenfile = require("./token.json");
const Discord = require("discord.js");
const fs = require("fs");
const osu = require('osu.js');

const bot = new Discord.Client({
    disableEveryone: true
});

bot.osuApi = osu.api('5cf938985c80885ed1a3987b8bdd03a08f4f476c');
bot.canplaymusic = true;

var timerReconnect;

bot.commands = new Discord.Collection();
bot.osu_commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
    if (err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if (jsfile.length <= 0) {
        console.log("Couldn't find commands.");
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`);
        props.help.name.forEach(element => {
            bot.commands.set(element, props);
        });
    });
});

fs.readdir("./osu_commands/", (err, files) => {
    if (err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if (jsfile.length <= 0) {
        console.log("Couldn't find osu commands.");
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./osu_commands/${f}`);
        console.log(`${f} loaded!`);
        props.help.name.forEach(element => {
            bot.osu_commands.set(element, props);
        });
    });
});


bot.on("ready", async () => {
    console.log(`${bot.user.username} подключен!`);
    bot.user.setActivity("Хостит Евгения", { type: "PLAYING" });
    if (timerReconnect) {
        clearTimeout(timerReconnect);
    }
});

bot.on("guildMemberRemove", async leftuser => {
    let chan = leftuser.guild.channels.find(x => x.id === "504706488368103435");
    chan.send(`**<@${leftuser.user.id}> (${leftuser.user.username}) вышел с сервера**`);
});

bot.on("message", async message => {
    if (!message.content.startsWith("!")) return;
    if (message.author.bot) return;
    if (!message.guild) return;

    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].slice(1);
    let args = messageArray.slice(1);

    let commandfile = bot.commands.get(cmd);
    if (cmd == "осу") {
        commandfile = bot.osu_commands.get(args[0].trim());
    }
    if (commandfile) {
        if (cmd == "играть" || cmd == "пропуск") {
            if (message.channel.name != "текстовый_voice") {
                let rep = await message.channel.send(`Извините, <@${message.author.id}>, я не могу ответить тут. Попробуйте в <#506791803207548948>`);
                rep.delete(3000);
                return;
            }
        } else if (!(
            message.channel.name == "бот" ||
            message.member.hasPermission("KICK_MEMBERS") ||
            cmd == "опрос" ||
            cmd == "пишет"
        )) {
            let rep = await message.channel.send(`Извините, <@${message.author.id}>, я не могу ответить тут. Попробуйте в <#504618938517159946>`);
            rep.delete(3000);
            return;
        }

        commandfile.run(bot, message, args);
    }
});

bot.on("disconnect", async () => {
    console.log(`${bot.user.username} отключён!!!`);
    timerReconnect = setTimeout(reconnect, 10000);
})

function reconnect() {
    bot.login(tokenfile.token);
    console.log(`реконнект...`);
}

bot.login(tokenfile.token);
/* NTA4Mjc2Njk2NTQyMDg1MTIx.Dr-Q_A.1yzrfCIqSHqu067AmuFH8eLRnzc */