const Discord = require("discord.js");
const utils = require("../extra_modules/utils.js");

module.exports.only_bot_channel = true;

module.exports.run = async (bot, message, cmd, args) =>
{
    let i = 0;
    message.guild.members.forEach(element =>
    {
        if (element.presence.status != "offline")
            i++;
    });

    let embed = new Discord.RichEmbed()
        .setAuthor("Статистика онлайна", "https://cdn2.iconfinder.com/data/icons/weby-interface-vol-2/512/weby_analytics-statistics-128.png")
        .setDescription(`Всего: ${message.guild.memberCount}\nОнлайн: ${i}`)
        .setColor("#FFFFFF");

    utils.SendMessage(bot, message.channel, embed);
}

module.exports.help = {
    name: ["онлайн", "онлаин", "online"]
}