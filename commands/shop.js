const Discord = require("discord.js");
const db = require("../databaseC.json");
const fs = require("fs");

module.exports.run = async (bot, message, args) =>
{
    message.delete();

    let cmd = message.content.split(" ")[0].slice(1);

    if (cmd == "товар")
    {
        switch (args[0])
        {
            case "1":
                let embed = new Discord.RichEmbed()
                    .setAuthor("Смена цвета никнейма", "https://ocompah.ru/wp-content/uploads/2016/04/bezopasnost_pokupok_v_online_magazinah.png")
                    .setDescription("Вы можете выбрать себе цвет никнейма.\n\nЧтобы это сделать - узнайте HEX код нужного цвета (например #33ae8f) и напишите `!купить  1 33ae8f`\n\nСоответственно вместо `33ae8f` должен быть ваш HEX-Code\n\n**Не добавляйте перед кодом #**")
                    .setColor("#FFFFFF");
                message.channel.send(embed);
                break;

            default: message.channel.send(`Извините, <@${message.author.id}>, но товара с таким номером не найдено`);
        }
    } else if (cmd == "купить")
    {
        switch (args[0])
        {
            case "1":
                if (!db[message.author.id])
                {
                    db[message.author.id] = {
                        coins: 0,
                        date: Date.now()
                    };
                    fs.writeFile("./databaseC.json", JSON.stringify(db), (err) =>
                    {
                        if (err) console.log(err);
                    })
                }

                if (100 > db[message.author.id].coins)
                {
                    return message.channel.send(`Извините, <@${message.author.id}>, но у вас недостаточно монет`);
                } else
                {
                    let hexcode = args[1].trim();

                    let newrole = await message.guild.createRole({
                        name: hexcode.toUpperCase(),
                        color: hexcode,
                        position: message.guild.roles.array().length - 1
                    });

                    db[message.author.id].coins = db[message.author.id].coins - 100;
                    fs.writeFile("./databaseC.json", JSON.stringify(db), (err) =>
                    {
                        if (err) console.log(err);
                    })

                    message.member.addRole(newrole);

                    message.channel.send(`<@${message.author.id}> изменил цвет ника в магазине на <@&${newrole.id}>`);
                }

                break;

            default: message.channel.send(`Извините, <@${message.author.id}>, но товара с таким номером не найдено`);
        }
    } else
    {
        let embed = new Discord.RichEmbed()
            .setAuthor("Магазин Russian Gamedev", "https://ocompah.ru/wp-content/uploads/2016/04/bezopasnost_pokupok_v_online_magazinah.png")
            .setDescription("Вы можете купить любой товар из списка в магазине за игровую валюту на сервере (монеты <:rgd_coin_rgd:518875768814829568>)\n\nЧтобы узнать о товаре подробнее, напишите `!товар ID`\nгде ID = Номер товара в списке.")
            .addField("Товар", "1. Цвет никнейма", true)
            .addField("Цена", "100 <:rgd_coin_rgd:518875768814829568>", true)
            .setColor("#FFFFFF");

        return message.channel.send(embed);
    }
}

module.exports.help = {
    name: ["магазин", "купить", "товар"]
}