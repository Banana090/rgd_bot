const Discord = require("discord.js");

module.exports.run = async (bot, message, args) =>
{
    let status = args.join(" ").trim();
    let typ = "PLAYING";
    switch (args[0])
    {
        case "0": args[0] = " ";
            status = args.join(" ").trim();
            typ = "STREAMING";
            break;

        case "1": args[0] = " ";
            status = args.join(" ").trim();
            typ = "WATCHING";
            break;

        case "2": args[0] = " ";
            status = args.join(" ").trim();
            typ = "LISTENING";
            break;
    }
    bot.user.setActivity(status, { type: typ, url: "https://www.twitch.tv/russian_gamedev_cool_stream" });
}

module.exports.help = {
    name: ["статус"]
}