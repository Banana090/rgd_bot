const Discord = require("discord.js");
const fs = require("fs");
const auth = require("./json/auth.json");
const config = require("./json/config.json");
const bot_info = require("./json/bot_info.json");
const command_handler = require("./extra_modules/command_handler.js");
const reaction_handler = require("./extra_modules/reaction_handler.js");
const utils = require("./extra_modules/utils.js");

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
    bot.cachedChannels.roles = bot.rgdGuild.channels.get(config.channels.roles);

    bot.cachedMessages = {};
    bot.cachedMessages.role_profession = bot.cachedChannels.roles.fetchMessage(config.role_messages.profession);
    bot.cachedMessages.role_engine = bot.cachedChannels.roles.fetchMessage(config.role_messages.engine);
    bot.cachedMessages.role_subscribe = bot.cachedChannels.roles.fetchMessage(config.role_messages.subscribe);
    bot.cachedMessages.role_other = bot.cachedChannels.roles.fetchMessage(config.role_messages.other);

    bot.cachedRoles = {};
    bot.cachedRoles.mute = bot.rgdGuild.roles.get(config.roles.mute);
    bot.cachedRoles.active = bot.rgdGuild.roles.get(config.roles.active);
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

bot.on("messageReactionAdd", async (message_reaction, user) =>
{
    OnReactionAdd(message_reaction, user);
});

bot.on("messageReactionRemove", async (message_reaction, user) =>
{
    OnReactionRemove(message_reaction, user);
});

bot.login(auth.token);
//#endregion

async function OnEnabled()
{
    bot.user.setActivity(bot_info.activity.text, { type: bot_info.activity.type });
}

async function OnUserLeft(actionUser)
{
    utils.SendMessage(bot, bot.cachedChannels.bot, `**${actionUser.user.username}** вышел с сервера`);
}

async function OnMessage(message)
{
    command_handler.Handle(bot, message);
}

async function OnReactionAdd(message_reaction, user)
{
    reaction_handler.Handle(bot, message_reaction, user, "ADD");
}

async function OnReactionRemove(message_reaction, user)
{
    reaction_handler.Handle(bot, message_reaction, user, "REMOVE");
}