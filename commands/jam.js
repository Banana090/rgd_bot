const Discord = require("discord.js");

module.exports.run = async (bot, message, args) =>
{
    message.delete();

    let builder = new Discord.RichEmbed();
    let icon = "https://cdn3.iconfinder.com/data/icons/unigrid-flat-food/90/006_092_jam_confiture_strawbery_marmalade_kitchen_sweet_food_provisions_preserves-512.png";

    if (args[0])
    {
        switch (args[0])
        {
            case "1":
                builder.setAuthor("Game Jam #1", icon)
                    .setDescription("**Тема**: \"Ужасы и Безысходность\"\n**Призовой фонд**: 6500 рублей\n**Время проведения**: 10 - 24 июля 2018")
                    .addField("Название и место", "1. **Это Сон**\n2. **The Gusnya Infinity**\n3. **My Job is Full of Fear**\n4. **Last Hack Mission**\n5. Отставшие\n6. lolScorp", true)
                    .addField("Автор(ы)", "ndecay\nGUSINY_GOD\nVishnya\nmax_hha\nFataliti + Godfree\nлолечка + Scorpicore", true)
                    .addField("Ссылки", `Папка с играми: <https://goo.gl/sKNx81>`)
                    .setColor("#FFFFFF");
                message.channel.send(builder);
                break;

            case "2":
                builder.setAuthor("Game Jam #2", icon)
                    .setDescription("**Тема**: \"Юмор\"\n**Призовой фонд**: 1000 рублей\n**Время проведения**: 10 - 11 августа 2018")
                    .addField("Название и место", "1. **Octosausage Adventures**\n2. **Flaxing Simulator**\n3. **В поисках юмора**\n4. **Taras Quest**\n5. gayvelopper\n6. Walking Is Fun\n7. **Яростный Шарокат**\n8. Master of Peace Death\n9. Чумные Маги\n10. RJOMBA clicker\n11. Captain Russia - Революция", true)
                    .addField("Автор(ы)", "Fataliti + benedique\nVishnya\nHaskiGame\nOffSide\nVishnya\nлолечка\nScorpicore\nDanil_Revnov\nShackal\nMaratG2\nNikudo", true)
                    .addField("Ссылки", "Игры: <https://goo.gl/bTF61d>\nРецензии от **Jesus_3k**: <https://goo.gl/RQBKfE>")
                    .setColor("#FFFFFF");
                message.channel.send(builder);
                break;

            case "3":
                builder.setAuthor("Weekend Jam #1", icon)
                    .setDescription("**Тема**: \"Шпионы\"\n**Призовой фонд**: 1500 рублей\n**Время проведения**: 25 - 26 августа 2018")
                    .addField("Название и место", "1. **Spy Among Us**\n2. **Ghost Spy Game**\n3. **ЖАСТБЁРНИТ**\n4. **Agent003**\n5. ULTRA SPY 64\n6. Cat Spy\n7. Escape from Marshold\n8. Spy Boy\n9. Bunker of Victory\n10. New Spy\n11. Afgan Spy", true)
                    .addField("Автор(ы)", "Vishnya + Jesus_3k\nFataliti + benedique\nЕвгений + max_hha\nOffSide\nULTRALORD\nRamses89\nHaskiGame\nehot\nSlug2002\nлолечка\n! AOAI", true)
                    .addField("Ссылки", "Игры: <https://goo.gl/ogDSai>\nЗапись стрима: <https://www.youtube.com/watch?v=tngX2qUD3YY>\nРецензии от **Jesus_3k** и **Shackal**: <https://goo.gl/Z6o254>", true)
                    .setColor("#FFFFFF");
                message.channel.send(builder);
                break;

            case "4":
                builder.setAuthor("Weekend Jam #2", icon)
                    .setDescription("**Тема**: \"А что если...\"\n**Призовой фонд**: 2000 рублей + ключи\n**Время проведения**: 27 - 28 октября 2018")
                    .addField("Название и место", "1. **What IF**\n2. **Сервак: Истории**\n3. **Что если Doka 2 существовала**\n4. The Legend of Halloween\n5. Halloween Party\n6. **Life is Flex: EEboy**\n7. Gusnya 3: Toxic World\n8. Invaders!\n9. Mark's Space Adventures", true)
                    .addField("Автор(ы)", "Kolhun (Дима)\nOffside\nProgrammmancer\nДанные Утеряны\nДанные Утеряны\nVishnya\nFataliti + Benedique\nДанные Утеряны\nДанные Утеряны", true)
                    .addField("Ссылки", "Игры: <https://goo.gl/CS2N8Z>\nЗапись стрима: <https://www.youtube.com/watch?v=Ty5HLA0NxoQ>", true)
                    .setColor("#FFFFFF");
                message.channel.send(builder);
                break;

            case "5":
                builder.setAuthor("Week Jam #1", icon)
                    .setDescription("**Тема**: \"Пародия на ААА игру\"\n**Призовой фонд**: 4000 рублей + ключи\n**Время проведения**: 17 - 24 ноября 2018")
                    .addField("Название и место", "1. **Metro**\n2. **Blocked**\n3. Low Man Sky\n4. Sovhoz\n5. Shelter 76\n6. Burda\n7. VS Train\n8. Not Immortal\n9. Metro 0.2\n10. Diablo 5\n11. Fate Chapters", true)
                    .addField("Автор(ы)", "Hatsimufu\nStranger\nglebster51\ntatarin289\nRE:OS\nСкорпикор\nnivel54\nVladis919\ncepblvl\nalexey_sudakov\nKolhun (Дима)", true)
                    .addField("Ссылки", "Игры: <https://goo.gl/GByxAQ>\nЗапись стрима: <https://www.youtube.com/watch?v=naZe3vSEfFY>")
                    .setColor("#FFFFFF");
                message.channel.send(builder);
                break;

            case "6":
                builder.setAuthor("Weekend XMAS Jam 20!8", icon)
                    .setDescription("**Тема**: \"Драма или мелодрама\"\n**Призовой фонд**: 2500 рублей \n**Время проведения**: 21 - 22 декабря 2018")
                    .addField("Название и место", "1. **Endless Failure**\n2. **My Butterfly**\n3. **Зима длиною в вечность**\n4. Тупое говно\n5. Niko\n6. Console Trap\n7. На первом месте новый год", true)
                    .addField("Автор(ы)", "Fataliti+Godfree\nndecay\nOffside\nGopa\nHatsimufu\nДанные утеряны\nДанные утеряны", true)
                    .addField("Ссылки", "Игры: <https://yadi.sk/d/GulwKp_MKRu7kA>\nЗапись стрима: <https://youtu.be/MCbsCJxB9Zs>")
                    .setColor("#FFFFFF");
                message.channel.send(builder);
                break;

            default: message.channel.send(`Извините, <@${message.author.id}>, джема с таким номером не найдено`);
        }
    } else
    {
        let embed = new Discord.RichEmbed()
            .setAuthor("Архив джемов Russian Gamedev", icon)
            .setDescription("Вы можете узнать результаты прошедших джемов нашего сервера, а также поиграть в игры с этих джемов!\n\nДля того, чтобы посмотреть информацию по джему воспользуйтесь командой `!джем ID`\nГде ID = Номер джема в списке")
            .addField("Список Джемов", "1. Game Jam #1\n2. Game Jam #2\n3. Weekend Jam #1\n4. Weekend Jam #2\n5. Week Jam #1\n6. Weekend XMAS Jam 20!8")
            .setColor("#FFFFFF");

        message.channel.send(embed);
    }
}

module.exports.help = {
    name: ["джем", "джемы"]
}