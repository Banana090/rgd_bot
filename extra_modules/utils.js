const Discord = require("discord.js");
const config = require("./config.json");

function isOperator(message) {
    console.log("Operator?");
    for (const operKey in Object.keys(config["operator"]))
        if (config[operKey] == message.author.id)
            return true;
    if (message.member.hasPermission(Discord.Permissions.FLAGS.ADMINISTRATOR))
        return true;
    return false;
}

module.exports.isOperator = isOperator;