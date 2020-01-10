const Discord = require("discord.js");

module.exports.run = async (bot, message, args) =>
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

    message.channel.send(embed);
}

module.exports.help = {
    name: ["онлайн", "онлаин"]
}