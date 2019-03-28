const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    message.delete();
    
    message.guild.member(bot.user).setNickname(args.join(" ").trim());
}

module.exports.help = {
    name: ["ник"]
}