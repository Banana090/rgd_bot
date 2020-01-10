const Discord = require("discord.js");
const fs = require("fs");
const auth = require("./auth.json");
const config = require("./config.json");

const bot = new Discord.Client();

//#region Load Commands
bot.commands = new Discord.Collection();
fs.readdir("./commands/", (err, files) =>
{
    if (err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if (jsfile.length <= 0)
    {
        console.log("Couldn't find commands.");
        return;
    }

    jsfile.forEach((f, i) =>
    {
        let props = require(`./commands/${f}`);
        props.help.name.forEach(element =>
        {
            bot.commands.set(element, props);
        });
    });
});
//#endregion
//#region System Events
bot.on("ready", async () =>
{
    console.log(`${bot.user.username} ready!`);
    OnEnabled();
});

bot.on("guildMemberRemove", async leftuser =>
{
    OnUserLeft(leftuser);
});

bot.on("message", async message =>
{
    OnMessage(message);
});

bot.login(auth.token);
//#endregion

async function OnEnabled()
{
    bot.user.setActivity(config.activity.text, { type: config.activity.type });
}

async function OnUserLeft(actionUser)
{
    let chan = actionUser.guild.channels.find(x => x.id === "504706488368103435");
    chan.send(`**<@${actionUser.user.id}> (${actionUser.user.username}) вышел с сервера**`);
}

async function OnMessage(message)
{
    if (!message.content.startsWith("!")) return;
    if (message.author.bot) return;
    if (!message.guild) return;

    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].slice(1);
    let args = messageArray.slice(1);

    let commandfile = bot.commands.get(cmd);

    if (commandfile)
    {
        if (cmd == "играть" || cmd == "пропуск")
        {
            if (message.channel.name != "текстовый_voice")
            {
                let rep = await message.channel.send(`Извините, <@${message.author.id}>, я не могу ответить тут. Попробуйте в <#506791803207548948>`);
                rep.delete(3000);
                return;
            }
        } else if (!(
            message.channel.name == "бот" ||
            message.member.hasPermission("KICK_MEMBERS") ||
            cmd == "опрос" ||
            cmd == "пишет"
        ))
        {
            let rep = await message.channel.send(`Извините, <@${message.author.id}>, я не могу ответить тут. Попробуйте в <#504618938517159946>`);
            rep.delete(3000);
            return;
        }

        commandfile.run(bot, message, args);
    }
}