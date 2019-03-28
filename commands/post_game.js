const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if (message.author.id == "357599627605966848") {
        message.delete();
        args = args.join(" ");
        args = args.split("]]");
        args.forEach(element => {
            element.replace("]]", "");
        });
        if (!args[3]) {
            return message.channel.send("название ]] ссылка на игру ]] ссылка на тамбнейл ]] (steam/appstore/googleplay) ]] Описание ]] Цена ]] Жанр ]] Разработчик(и) ]] цвет HEX c #");
        }
        let shop;
        switch (args[3].toLowerCase().trim()) {
            case "steam": shop = "https://media.discordapp.net/attachments/560488420686823444/560490861918421034/512px-Steam_icon_logo.png";
                break;
            case "appstore": shop = "https://media.discordapp.net/attachments/560488420686823444/560490872718753792/Apple_Store-512.png";
                break;
            case "googleplay": shop = "https://media.discordapp.net/attachments/560488420686823444/560490882894266388/google_play.png";
                break;
        }

        let opisanie = args[4].split("\\n");
        opisanie.forEach(element => {
            element.replace("\\n", ""); 
        });
        opisanie = opisanie.join("\n");

        let embed = new Discord.RichEmbed()
            .setDescription(`**${args[0].trim().toUpperCase()}**\n\n**Цена:** ${args[5].trim()}\n**Жанр:** ${args[6].trim()}\n**Разработчики:** ${args[7].trim()}\n\n${opisanie}\n\n[**ПЕРЕЙТИ В МАГАЗИН**](${args[1].trim()})`)
            .setImage(args[2].trim())
            .setThumbnail(shop)
            .setColor(args[8].trim());

        message.channel.send(embed);

    }
}

module.exports.help = {
    name: ["пост"]
}