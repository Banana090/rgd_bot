const Discord = require("discord.js");
const db = require("../databaseC.json");
const fs = require("fs");

module.exports.run = async (bot, message, args) =>
{
    message.delete();
    let amount = Math.abs(parseInt(args[0]));
    if ((!amount || amount == 0) && !(args[0] == "олин"))
    {
        let embed = new Discord.RichEmbed()
            .setAuthor("Игра в коробки", "https://cdn.discordapp.com/attachments/518873414707052566/518964380541517839/box_coin.gif")
            .addField("Суть игры", "Вам предлагаются три коробки на выбор.\nНужно выбрать одну из них, нажав на реацию под сообщением.\nЕсли вы не выберите коробку в течение 10-и секунд игра будет автоматически завершена (ставка вернется)\nИграть бесплатно нельзя. Баланс должен быть не менее, чем две ставки\n\nЧтобы играть введите `!коробки ставка`")
            .addField("Выплаты", "<:box_ass:518967412339507214> (Жопка): -2х ставка\n" +
                "<:box_empty:518967411706167347> (Пустая): -1х ставка\n" +
                "<:box_coin:518967411802636289> (Монетка): +1x ставка\n" +
                "<:box_cherry:518967412385775616> (Вишенка): +5x ставка\n" +
                "<:box_ass:518967412339507214><:box_ass:518967412339507214><:box_ass:518967412339507214> (Три жопки) - **Неудачник** (+0x ставка)\n" +
                "<:box_cherry:518967412385775616><:box_cherry:518967412385775616><:box_cherry:518967412385775616> (Три вишенки) - **JACKPOT** (+2000x)")
            .addField("Шансы", "Шансы на каждую коробку рассчитываются отдельно.\n" +
                "<:box_ass:518967412339507214> (Жопка): 20%\n" +
                "<:box_empty:518967411706167347> (Пустая): 36%\n" +
                "<:box_coin:518967411802636289> (Монетка): 36%\n" +
                "<:box_cherry:518967412385775616> (Вишенка): 8%\n")
            .setFooter(`Запросил: ${message.author.username}`)
            .setColor("#ffffff");
        return message.channel.send(embed);
    }
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
    if (args[0] == "олин") { amount = Math.floor(db[message.author.id].coins / 2); }
    if (amount == 0) { return; }
    if (amount * 2 <= db[message.author.id].coins)
    {
        let embed = new Discord.RichEmbed()
            .setAuthor(`${message.author.username} играет в коробки`, message.author.avatarURL)
            .addField("**ИГРА ИДЁТ**", `__Ставка:__ **${amount}** <:rgd_coin_rgd:518875768814829568>\n__Результат:__ **?** <:rgd_coin_rgd:518875768814829568>\n__Баланс:__ **?** <:rgd_coin_rgd:518875768814829568>`, true)
            .addField("**Что было внутри**", `1. <:box_closed:518967412062945280> (неизвестно)\n2. <:box_closed:518967412062945280> (неизвестно)\n3. <:box_closed:518967412062945280> (неизвестно)`, true)
            .setImage("https://cdn.discordapp.com/attachments/518873414707052566/518981566786043906/CLOSED_BOXES.png")
            .setColor("#ffffff");
        let game = await message.channel.send(embed);
        await game.react(`1\u20e3`); await game.react(`2\u20e3`); await game.react(`3\u20e3`);
        let gamerID = message.author.id;
        let gameEnded = null;
        let plusL = 0; let plusM = 0; let plusR = 0; let finalPlus = 0;
        let imgL = ""; let imgM = ""; let imgR = ""; let finalImg = "";
        let left = Math.random();
        if (left <= 0.2) { plusL = amount * -2; left = "<:box_ass:518967412339507214> (Жопка)"; imgL = "https://cdn.discordapp.com/attachments/518873414707052566/518989376542474257/2.png"; }
        else if (left <= 0.28) { plusL = amount * 5; left = "<:box_cherry:518967412385775616> (Вишня)"; imgL = "https://cdn.discordapp.com/attachments/518873414707052566/518989378010349600/3.png"; }
        else if (left <= 0.64) { plusL = amount; left = "<:box_coin:518967411802636289> (Монета)"; imgL = "https://cdn.discordapp.com/attachments/518873414707052566/518989380946231296/4.png"; }
        else { plusL = -amount; left = "<:box_empty:518967411706167347> (Пусто)"; imgL = "https://cdn.discordapp.com/attachments/518873414707052566/518989375108022273/1.png"; }
        let mid = Math.random();
        if (mid <= 0.2) { plusM = amount * -2; mid = "<:box_ass:518967412339507214> (Жопка)"; imgM = "https://cdn.discordapp.com/attachments/518873414707052566/518990776840224799/2.png"; }
        else if (mid <= 0.28) { plusM = amount * 5; mid = "<:box_cherry:518967412385775616> (Вишня)"; imgM = "https://cdn.discordapp.com/attachments/518873414707052566/518990778018693131/3.png"; }
        else if (mid <= 0.64) { plusM = amount; mid = "<:box_coin:518967411802636289> (Монета)"; imgM = "https://cdn.discordapp.com/attachments/518873414707052566/518990781261021205/4.png"; }
        else { plusM = -amount; mid = "<:box_empty:518967411706167347> (Пусто)"; imgM = "https://cdn.discordapp.com/attachments/518873414707052566/518990774378037263/1.png"; }
        let right = Math.random();
        if (right <= 0.2) { plusR = amount * -2; right = "<:box_ass:518967412339507214> (Жопка)"; imgR = "https://cdn.discordapp.com/attachments/518873414707052566/518991339765891075/2.png"; }
        else if (right <= 0.28) { plusR = amount * 5; right = "<:box_cherry:518967412385775616> (Вишня)"; imgR = "https://cdn.discordapp.com/attachments/518873414707052566/518991342211170304/3.png"; }
        else if (right <= 0.64) { plusR = amount; right = "<:box_coin:518967411802636289> (Монета)"; imgR = "https://cdn.discordapp.com/attachments/518873414707052566/518991344014852127/4.png"; }
        else { plusR = -amount; right = "<:box_empty:518967411706167347> (Пусто)"; imgR = "https://cdn.discordapp.com/attachments/518873414707052566/518991338759389204/1.png"; }
        let jp = 0;
        if (right == left && left == mid && left == "<:box_cherry:518967412385775616> (Вишня)") { jp = 1; }
        if (right == left && left == mid && left == "<:box_ass:518967412339507214> (Жопка)") { jp = 2; }
        let filter = (reaction, user) => (reaction.emoji.name == "1⃣" || reaction.emoji.name == "2⃣" || reaction.emoji.name == "3⃣") && user.id == gamerID;
        let collector = game.createReactionCollector(filter, { time: 10000 });
        collector.on("collect", r =>
        {
            if (!gameEnded)
            {
                gameEnded = true;
                switch (r.emoji.name)
                {
                    case "1⃣":
                        finalPlus = plusL;
                        finalImg = imgL;
                        break;

                    case "2⃣":
                        finalPlus = plusM;
                        finalImg = imgM;
                        break;

                    case "3⃣":
                        finalPlus = plusR;
                        finalImg = imgR;
                        break;
                }
                if (jp != 0)
                {
                    if (jp == 1) { finalPlus = amount * 2000; finalImg = "https://cdn.discordapp.com/attachments/518873414707052566/518995956004552707/JACKPOT.png"; }
                    if (jp == 2) { finalPlus = 0; finalImg = "https://cdn.discordapp.com/attachments/518873414707052566/518995973654183961/FUCKEDUP.png"; }
                }
                let embedRes = new Discord.RichEmbed()
                    .setAuthor(`${message.author.username} играет в коробки`, message.author.avatarURL)
                    .addField(`${finalPlus >= 0 ? "**ПОБЕДА!**" : "**ПРОИГРЫШ**"}`, `__Ставка:__ **${amount}** <:rgd_coin_rgd:518875768814829568>\n__Результат:__ **${finalPlus + amount}** <:rgd_coin_rgd:518875768814829568>\n__Баланс:__ **${db[gamerID].coins + finalPlus}** <:rgd_coin_rgd:518875768814829568>`, true)
                    .addField("**Что было внутри**", `1. ${left}\n2. ${mid}\n3. ${right}`, true)
                    .setImage(finalImg)
                    .setColor("#ffffff");
                game.edit(embedRes);
                db[gamerID].coins += finalPlus;
                fs.writeFile("./databaseC.json", JSON.stringify(db), (err) =>
                {
                    if (err) console.log(err);
                })
            }
        });
        collector.on("end", collected =>
        {
            if (!gameEnded)
            {
                embed.setDescription("**ИГРА ОКОНЧЕНА**\nВремя вышло...");
                game.edit(embed);
            }
        });
    } else
    {
        return message.channel.send(`Извините, <@${message.author.id}>, но у вас недостаточно монет (баланс должен быть не менее двух ставок)`);
    }
}

module.exports.help = {
    name: ["коробки", "коробка", "боксы", "кейсы"]
}