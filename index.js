const Discord = require("discord.js");
const fs = require("fs");
const auth = require("./json/auth.json");
const config = require("./json/config.json");
const command_handler = require("./extra_modules/command_handler.js");

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
    console.log(`${bot.user.username} connected`);
    bot.rgdGuild = bot.guilds.get(config.guild);
    bot.cachedChannels = {};
    bot.cachedChannels.bot = bot.rgdGuild.channels.get(config.channels.bot);
    bot.cachedChannels.tsar = bot.rgdGuild.channels.get(config.channels.tsar);
    bot.cachedChannels.obsh = bot.rgdGuild.channels.get(config.channels.obsh);
    bot.cachedChannels.role = bot.rgdGuild.channels.get(config.channels.role);
    bot.cachedRoles = {};
    bot.cachedRoles.mute = bot.rgdGuild.roles.get(config.roles.mute);
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
    bot.cachedChannels.bot.send(`**${actionUser.user.username}** вышел с сервера`);
}

async function OnMessage(message)
{
    command_handler.Handle(bot, message);
}