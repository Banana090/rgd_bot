const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    message.delete();
    if (!bot.canplaymusic) {
        let embed = new Discord.RichEmbed()
            .setAuthor("Пропустить композицию?", "https://www.shareicon.net/download/2016/08/18/810131_arrows_512x512.png")
            .setDescription(`<@${message.author.id}> начал голосование за смену трека`)
            .setColor("#FFFFFF");

        let vote = await message.channel.send(embed);

        vote.react("✅");
        vote.react("❌");

        let filter = (reaction) => reaction.emoji.name == `✅` || reaction.emoji.name == `❌`;
        let yes = 0; let no = 0;

        vote.awaitReactions(filter, { time: 10000 })
            .then(collected => {
                collected.forEach(element => {
                    if (element.emoji.name == `✅`) { yes = element.count; }
                    if (element.emoji.name == `❌`) { no = element.count; }
                })
                vote.delete();
                if (yes > no) {
                    bot.dispatcher.end();
                    bot.canplaymusic = true;
                    return message.channel.send(`Композиция пропущена)\nЗА: ${yes}\nПРОТИВ: ${no}`);
                }
                return message.channel.send(`Дискотека продолжается!\nЗА: ${yes}\nПРОТИВ: ${no}`)
            }).catch(error => console.log(error))
    }
}

module.exports.help = {
    name: ["пропуск"]
}