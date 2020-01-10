const Discord = require("discord.js");

module.exports.run = async (bot, message, args) =>
{
    message.delete();
    let target = (message.guild.member(message.mentions.users.first()));

    if (args[0] == "создан" && target)
    {
        message.channel.send(`<@${target.id}> создал аккаунт ${target.user.createdAt.toUTCString()}`);
    } else
    {
        if (target)
        {
            message.channel.send(`<@${target.id}> зашел на сервер ${target.joinedAt.toUTCString()}\nМожет голосовать: ${target.joinedAt < (Date.now() - new Date(3600 * 24 * 1000 * 3))}`);
        } else
        {
            message.channel.send(`Сервер был создан ${message.guild.createdAt.toUTCString()}`);
        }
    }
}

module.exports.help = {
    name: ["когда", "когдазашел"]
}