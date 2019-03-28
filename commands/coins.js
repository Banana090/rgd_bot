const Discord = require("discord.js");
const db = require("../databaseC.json");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
    message.delete();
    var users = [];
    if (args[0] == "топ") {
        for (var key in db)  {
            if (db[key].coins > 0) users.push({coins:db[key].coins,id:key})
        }
        users.sort((a, b) => a.coins - b.coins);
        let field1 = ""; let field2 = "";
        for (var i = 0; i < 10; i++) {
            let curusr = users.pop();
            field1 += `${i+1}. <@${curusr.id}>\n`;
            field2 += `${curusr.coins}\n`;
        }
        let topCoins = new Discord.RichEmbed()
            .setAuthor("Топ по монетам", "https://cdn.discordapp.com/emojis/518875768814829568.png?v=1")
            .addField("Никнейм", field1, true)
            .addField("Монеты", field2, true)
            .setFooter(`Запросил: ${message.author.username}`)
            .setColor("#ffffff");
        return message.channel.send(topCoins);
    } else if (args[0] == "дать") {
        let targetID = (message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[1])).id;
        if (!db[message.author.id]) {
            db[message.author.id] = {
                coins: 0,
                date: Date.now()
            };
        }
        if (!db[targetID]) {
            db[targetID] = {
                coins: 0,
                date: Date.now()
            };
        }
        let amount = Math.abs(parseInt(args[2]));
        if (!amount || amount == 0) {
            return message.channel.send(`Извините, <@${message.author.id}>, введенное число не распознано`)
        }
        if (db[message.author.id].coins < amount) {
            return message.channel.send(`Извините, <@${message.author.id}>, но у вас недостаточно монет`);
        } else if (message.author.id == targetID) {
            return message.channel.send(`Извините, <@${message.author.id}>, вы не можете отправить монеты самому себе`);
        }
        let coinsFrom = db[message.author.id].coins - amount;
        let coinsTo = db[targetID].coins + amount;
        db[message.author.id].coins = coinsFrom;
        db[targetID].coins = coinsTo;
        fs.writeFile("./databaseC.json", JSON.stringify(db), (err) => {
            if (err) console.log(err);
        })
        let sklon = "";
        if (amount % 100 < 10 || amount % 100 > 20) {
            if (amount % 10 == 1) { sklon = "у"; }
            if (amount % 10 >= 2 && amount % 10 <= 4) { sklon = "ы"; }
        }
        message.channel.send(`<@${message.author.id}> отправил ${amount} монет${sklon} пользователю <@${targetID}>`);
    } else if (args[0] == "выдать" || args[0] == "отнять") {
        if (message.author.id == "357599627605966848") {
            let targetID = (message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[1])).id;
            if (!db[targetID]) {
                db[targetID] = {
                    coins: 0,
                    date: Date.now()
                };
            }
            if (args[0] == "выдать") {
                db[targetID] = {
                    coins: db[targetID].coins + parseInt(args[2]),
                    date: db[targetID].date
                };
                let ms = await message.channel.send(`Подождите...`);
                ms.edit(`<@${message.author.id}> выдал <@${targetID}> ${args[2]} <:rgd_coin_rgd:518875768814829568>`);
            }

            if (args[0] == "отнять") {
                db[targetID] = {
                    coins: db[targetID].coins - parseInt(args[2]),
                    date: db[targetID].date
                };
                let ms = await message.channel.send(`Подождите...`);
                ms.edit(`<@${message.author.id}> отнял у <@${targetID}> ${args[2]} <:rgd_coin_rgd:518875768814829568>`)
            }
            fs.writeFile("./databaseC.json", JSON.stringify(db), (err) => {
                if (err) console.log(err);
            })
        }
    } else {
        let tmp = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
        let targetID = !tmp ? message.author.id : tmp.id;
        let target = message.guild.members.get(targetID);
        if (!db[targetID]) {
            db[targetID] = {
                coins: 0,
                date: Date.now()
            };
            fs.writeFile("./databaseC.json", JSON.stringify(db), (err) => {
                if (err) console.log(err);
            })
        }
        let embed = new Discord.RichEmbed()
            .setAuthor(`Монеты ${target.user.username}`, target.user.avatarURL)
            .setDescription(`__Баланс:__ ${db[targetID].coins} <:rgd_coin_rgd:518875768814829568>`)
            .setColor("#ffffff");
        message.channel.send(embed);
    }
}

module.exports.help = {
    name: ["монеты", "лайки", "лайк", "монета"]
}