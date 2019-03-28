const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    message.delete();
    let checkUser = (message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0].trim()));
    
    if (checkUser.user.typingDurationIn(message.channel) > 0) {
        message.channel.send(`**${checkUser.displayName}** пишет сообщение в этот канал уже ${checkUser.user.typingDurationIn(message.channel)/1000} секунд`);
    } else {
        message.channel.send(`**${checkUser.displayName}** сейчас не пишет в этот канал`);
    }
}

module.exports.help = {
    name: ["пишет"]
}