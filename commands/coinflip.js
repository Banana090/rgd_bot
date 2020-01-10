const Discord = require("discord.js");
const db = require("../databaseC.json");
const fs = require("fs");

module.exports.run = async (bot, message, args) =>
{
    message.delete();
    let amount = Math.abs(parseInt(args[0]));
    if (!amount) { amount = 0; }
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
    if (amount > db[message.author.id].coins)
    {
        return message.channel.send(`Извините, <@${message.author.id}>, но у вас недостаточно монет`);
    } else
    {
        let win = Math.random() >= 0.5;
        let newbalance = db[message.author.id].coins + (win ? amount : -amount);
        if (amount != 0)
        {
            db[message.author.id].coins = newbalance;
            fs.writeFile("./databaseC.json", JSON.stringify(db), (err) =>
            {
                if (err) console.log(err);
            })
        }
        let embed = new Discord.RichEmbed()
            .setAuthor(`${message.author.username} подбросил монетку`, message.author.avatarURL)
            .setDescription(`**ПОДБРАСЫВАЕМ...**\n__Ставка:__ **${amount}** <:rgd_coin_rgd:518875768814829568>\n__Баланс:__ **${(amount == 0) ? newbalance : "?"}** <:rgd_coin_rgd:518875768814829568>`)
            .setThumbnail("https://cdn.discordapp.com/emojis/518875396545052682.gif?v=1")
            .setColor("#ffffff");
        let mess = await message.channel.send(embed);
        embed.setDescription(win ? `**ПОБЕДА!**\n__Ставка:__ **${amount}** <:rgd_coin_rgd:518875768814829568>\n__Баланс:__ **${newbalance}** <:rgd_coin_rgd:518875768814829568>` :
            `**ПРОИГРЫШ**\n__Ставка:__ **${amount}** <:rgd_coin_rgd:518875768814829568>\n__Баланс:__ **${newbalance}** <:rgd_coin_rgd:518875768814829568>`);
        embed.setThumbnail(win ? "https://cdn.discordapp.com/emojis/518875768814829568.png?v=1" : "https://cdn.discordapp.com/emojis/518875812913610754.png?v=1");
        setTimeout(function ()
        {
            mess.edit(embed);
        }, 3000);
    }
}

function coinflip_game()
{

}

module.exports.help = {
    name: ["флип", "монетка"]
}