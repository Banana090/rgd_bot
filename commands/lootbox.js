const Discord = require("discord.js");
const db = require("../databaseC.json");
const fs = require("fs");

module.exports.run = async (bot, message, args) =>
{
    message.delete();
    if (!db[message.author.id])
    {
        db[message.author.id] = {
            coins: 0,
            date: Date.now()
        };
    }
    if (new Date(db[message.author.id].date).valueOf() <= Date.now())
    {
        let winning = Math.floor(Math.random() * 16) + 5;
        let data = new Date(Date.now());
        data.setHours(data.getHours() + 12);
        db[message.author.id] = {
            coins: db[message.author.id].coins + winning,
            date: data
        };
        fs.writeFile("./databaseC.json", JSON.stringify(db), (err) =>
        {
            if (err) console.log(err);
        })
        message.channel.send(`<@${message.author.id}> получил из подарка ${winning} монет`);
    } else
    {
        let dateForm = new Date(db[message.author.id].date);
        let hours = new Date(dateForm - Date.now());
        message.channel.send(`Извините, <@${message.author.id}>, ваш подарок еще не доступен, попробуйте через ${Math.floor(hours / 1000 / 60 / 60)} часов ${Math.floor((hours / 1000 / 60 / 60) % 1 * 60)} минут`);
    }
}

module.exports.help = {
    name: ["лутбокс", "подарок"]
}