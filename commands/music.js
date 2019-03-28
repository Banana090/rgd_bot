const Discord = require("discord.js");
const fs = require("fs");
const ytdl = require('ytdl-core');

module.exports.run = async (bot, message, args) => {
    message.delete();

    let connection = await message.guild.channels.find(x => x.id == "520244344062738432").join();
    if (args[0] == "0" && message.author.id == "357599627605966848") { connection.disconnect(); }
    if (bot.canplaymusic) {
        if (args[0] && ytdl.validateURL(args[0])) {
            ytdl.getBasicInfo(args[0]).then(ss => {
            let vidinfo = new Discord.RichEmbed()
                .setAuthor("Сейчас играет", "https://avatanplus.com/files/resources/original/572799669af7915472af38eb.png")
                .setDescription(`**Название:** ${ss.title}\n**Длительность:** ${Math.floor(ss.length_seconds/60)} минут ${ss.length_seconds%60} секунд`)
                .setThumbnail(ss.thumbnail_url)
                .setFooter(`Поставил: ${message.author.username}`)
                .setColor("#FFFFFF");

                message.channel.send(vidinfo);
            });

            const stream = ytdl(args[0], { filter: 'audioonly' });
            bot.dispatcher = connection.playStream(stream);

            bot.canplaymusic = false;

            bot.dispatcher.on("end", async () => {
                bot.canplaymusic = true;
            })

            stream.on("end", async () => {
                stream.destroy();
            })
        } else {
            message.channel.send("Не могу найти видео по этой ссылке...");
        }
    } else {
        message.channel.send("Стрим занят, не могу включить");
    }

}

module.exports.help = {
    name: ["играть"]
}