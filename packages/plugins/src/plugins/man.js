module.exports = function (bot) {
    bot.addCommand({
        name: "man",
        args: [
            "command"
        ],
        description: "Displays the man page for a bot command",
        shortcuts: [
            "man"
        ],
        examples: ["|| man ban"],
        ignore: false,
        permissions: ["all"],
        func: (msg) => {
            if (msg.args.length < 1) {
                msg.roomContext.send("**Missing args**");
                return;
            }
            const command = bot.getCommand(msg.args[0]);
            if (!command) {
                msg.roomContext.send("No manual entry for " + msg.args[0]);
                return;
            }
            let stringToSend = `[\`${command.name}\`](https://github.com/jbis9051/JamesSOBot/blob/master/docs/COMMANDS.md#${command.name}): "${command.description || ""}" `;
            if (command.creator) {
                stringToSend += "Creator: " + command.creator
            } else {
                stringToSend += `Examples: ${(command.examples || []).map(example => `\`${example}\``).join(" , ")}`;
            }
            msg.roomContext.send(stringToSend);
        }
    });
};
