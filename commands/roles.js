const Discord = require("discord.js");
const utils = require("../extra_modules/utils.js");

module.exports.only_bot_channel = true;

module.exports.run = async (bot, message, cmd, args) =>
{
    let target = message.guild.member(message.author);
    let roles = target.roles.filter(r => { return r.id != bot.cachedRoles.mute.id && r.name != "@everyone"; });
    roles = roles.sort((a, b) => { return b.position - a.position; });
    roles = roles.array();
    let cross_indexes = new Array(roles.length).fill(false);

    let desc = `Нажмите на соответствующую роли реакцию под сообщением, чтобы снять с себя эту роль. Нажмите повторно, если сняли роль по ошибке. Не спешите`;

    let embed = new Discord.RichEmbed()
        .setAuthor(`Роли ${target.displayName}`, target.user.avatarURL)
        .setDescription(desc + "\n\n" + GenerateRolesString(roles, cross_indexes))
        .setColor("#FFFFFF");

    let msg = await utils.SendMessage(bot, message.channel, embed);

    let length = roles.length;
    if (length > 9) length = 9;

    for (let i = 1; i <= length; i++)
        await msg.react(`${i}\u20e3`);

    let filter = (reaction, user) => user.id == target.id && /\d\u20e3/i.test(reaction.emoji.name);
    let collector = msg.createReactionCollector(filter, { time: 40000 });
    collector.on('collect', async r => 
    {
        let chosen = parseInt(r.emoji.name.replace(/\u20e3/i, ""));
        if (!chosen)
        {
            utils.SendMessage(bot, bot.cachedChannels.tsar, `Chosen role by **${target.displayName}** was undefined but passed the filter. Check <#${bot.cachedChannels.bot.id}>\nName was: \`${r.emoji.name}\``);
            return;
        }
        r.remove(target);

        let role = roles[chosen - 1];
        if (target.roles.has(role.id))
        {
            cross_indexes[chosen - 1] = true;
            embed.setDescription(desc + "\n\n" + GenerateRolesString(roles, cross_indexes));
            msg.edit(embed);
            target.removeRole(role);
        }
        else
        {
            cross_indexes[chosen - 1] = false;
            embed.setDescription(desc + "\n\n" + GenerateRolesString(roles, cross_indexes));
            msg.edit(embed);
            target.addRole(role);
        }
    });
    collector.on('end', async collected => 
    {
        embed.setDescription("Время работы данного окна вышло.\nПожалуйста, используйте команду `!роли` повторно\n\n" + GenerateRolesString(roles, cross_indexes));
        msg.edit(embed);
    });
}

function GenerateRolesString(roles, cross_indexes)
{
    let ret = "";
    for (let i = 0; i < roles.length; i++)
    {
        ret += (i + 1) + ". ";
        if (cross_indexes[i])
            ret += "~~<@&" + roles[i].id + ">~~\n";
        else
            ret += "<@&" + roles[i].id + ">\n";
    }
    return ret;
}

module.exports.help = {
    name: ["роль", "роли"]
}