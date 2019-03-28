const Discord = require("discord.js");
const osu = require('osu.js');

module.exports.run = async (bot, message, args) => {
    let embed = new Discord.RichEmbed();
    args = args.slice(1);
    let usrInfo = await bot.osuApi.getUser({
        u: args.join(" ").trim()
     });

     usrInfo = usrInfo[0];
     if (!usrInfo) {
        message.channel.send("Какая-то херабора произошла при попытке спиздинга данных с серверов OSU. Username / ID не найден");
     } else {
         let pt = "";
         let leftTime = usrInfo.total_seconds_played;
         let daysPlayd = usrInfo.total_seconds_played/86400;
         if (daysPlayd >= 1) {
            pt += `${Math.floor(daysPlayd)}д `;
            leftTime -= Math.floor(daysPlayd) * 86400;
         }
         pt += `${Math.floor(leftTime/3600)}ч `;
         leftTime -= Math.floor(leftTime/3600)*3600;
         pt += `${Math.floor(leftTime/60)}м ${leftTime%60}с`;
        embed.setAuthor(`${usrInfo.username} : OSU профиль`, `https://a.ppy.sh/${usrInfo.user_id}`, `https://osu.ppy.sh/users/${usrInfo.user_id}`)
        .addField("Рейтинг",`**Performace Points:** ${Math.round(usrInfo.pp_raw*10)/10}\n` +
                            `**Rank:** . . . . . . . . . . . . . ${placedots(usrInfo.pp_rank)}\n` +
                            `**Region Rank:** . . . . . . ${placedots(usrInfo.pp_country_rank)}\n` +
                            `**Точность:**   . . . . . . . . ${Math.round(usrInfo.accuracy*100)/100}%`)
        .addField("Общее", `**Всего очков:** ${placedots(usrInfo.ranked_score)}\n**Уровень:** ${Math.floor(usrInfo.level)}\n**Страна:** :flag_${usrInfo.country.toLowerCase()}:`)
        .addField("Карты", `**Всего игр:** ${placedots(usrInfo.playcount)}\n<:ssh:559720416667762688> : ${usrInfo.count_rank_ssh}\n<:ss:559720416567099393> : ${usrInfo.count_rank_ss}\n<:sh:559720416029966336> : ${usrInfo.count_rank_sh}\n<:osus:559720415795216386> : ${usrInfo.count_rank_s}\n<:osua:559720415967313920> : ${usrInfo.count_rank_a}`)
        .addField("Время", `**Играет в OSU! с:** ${usrInfo.join_date}\n**Наиграл за это время:** ${pt}`)
        .setColor("#dd6fe3");

        message.channel.send(embed);
     }

     function palcedots(str) {
        return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}

var placedots = function (str) {
    return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

module.exports.help = {
    name: ["статы", "статистика", "профиль", "стата"]
}