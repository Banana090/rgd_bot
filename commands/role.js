const Discord = require("discord.js");
const utils = require("../extra_modules/utils.js");

module.exports.only_bot_channel = true;

module.exports.run = async (bot, message, args) =>
{
    message.delete();

    let roleList = message.guild.roles.filter(function (s)
    {
        return !(
            s.hasPermission("MANAGE_EMOJIS") ||
            !s.mentionable);
    })

    roleList = roleList.sort(function (a, b)
    {
        return a.position - b.position;
    })

    let desc = "", tmp = "";
    let i = 1;

    roleList.tap(element =>
    {
        desc += i++ + ". <@&" + element.id + ">\n";
        tmp += element.id + ".";
    });
    let arrChoose = tmp.split(".");

    if (!roleList.find(x => x.id == arrChoose[args[0] - 1]))
    {
        let descFormat = desc.split("\n");
        let ShowList = new Discord.RichEmbed()
            .setTitle("Управление ролями")
            .setDescription("Вы можете выбрать себе любую роль из спикска командой \`!роль 1..N\`\n\n**Список ролей:**")
            .addField("Часть 1", descFormat.slice(0, descFormat.length / 2), true)
            .addField("Часть 2", descFormat.slice(descFormat.length / 2), true)
            .setColor("#FFFFFF");
        return message.channel.send(ShowList);
    } else
    {
        if (!message.member.roles.find(x => x.id == arrChoose[args[0] - 1]))
        {
            message.member.addRole(arrChoose[args[0] - 1]);
            let reply = await message.channel.send("Подождите...");
            return reply.edit(`Роль <@&${arrChoose[args[0] - 1]}> была добавлена пользователю <@${message.author.id}>`);
        }
        message.member.removeRole(arrChoose[args[0] - 1]);
        let reply = await message.channel.send(`Подождите...`);
        return reply.edit(`Роль <@&${arrChoose[args[0] - 1]}> у пользователя <@${message.author.id}> удалена`);
    }
}

module.exports.help = {
    name: ["роль", "роли"]
}