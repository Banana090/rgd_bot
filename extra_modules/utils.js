const Discord = require("discord.js");
const coins = require("../json/coins.json");
const fs = require("fs");

module.exports.IsAdmin = (guildMember) =>
{
    return guildMember.hasPermission(Discord.Permissions.FLAGS.ADMINISTRATOR);
}

module.exports.IsJeka = (bot, guildMember) =>
{
    return guildMember.id == bot.rgdGuild.ownerID;
}

module.exports.CheckForCoinsRegistered = (user) =>
{
    if (!coins[user.id])
    {
        coins[user.id] = {
            coins: 0,
            date: Date.now()
        };
    }
}

module.exports.GetCoins = (user) =>
{
    this.CheckForCoinsRegistered(user);
    return coins[user.id].coins;
}

module.exports.AddCoins = (user, amount) =>
{
    this.CheckForCoinsRegistered(user);
    coins[user.id].coins += amount;
    if (coins[user.id].coins < 0) coins[user.id].coins = 0;
}

module.exports.SaveCoins = () =>
{
    fs.writeFile("./json/coins.json", JSON.stringify(coins), (err) =>
    {
        if (err)
            console.log(err);
    })
}

module.exports.HandleException = async (bot, ex) =>
{
    this.SendMessage(bot, bot.cachedChannels.tsar, `${ex.name}\n${ex.message}`);
}

module.exports.SendMessage = async (bot, channel, text) => 
{
    return channel.send(text)
        .catch(ex =>
        {
            bot.cachedChannels.tsar.send(`${ex.name}\n${ex.message}`);
        });
}