module.exports = function (bot) {
    bot.addCommand({
        name: "help",
        args: [],
        description: "Lists commands",
        shortcuts: [
            "help"
        ],
        examples: ["|| help"],
        ignore: false,
        permissions: ["all"],
        func: (msg) => {
            /*
            let exportText = "";
            Object.keys(bot.commands).forEach(e => {
                e = bot.getCommand(e);
                if (e && !e.ignore) {
                    exportText += `\`${e.name}\` - **${e.args.toString()}** - ${e.description}\n`
                }
            });
            msg.roomContext.send(exportText);
             */
            msg.replyDirect("Command documentation and syntax can be found [here](https://github.com/jbis9051/SO-ChatBot/blob/master/docs/COMMANDS.md).")
        }
    })
};
/**
 * Lists commands
 *
 * @return {String} - List of commands
 */
function help(query) {}
