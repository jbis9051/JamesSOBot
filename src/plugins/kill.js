module.exports = function (bot) {
    bot.addCommand({

        name: "kill",
        args: [
            "person"
        ],
        description: "",
        shortcuts: [
            "kill",
        ],
        ignore: false,
        permissions: ["all"],
        func: async (msg) => {
            if (msg.args.length < 1) {
                bot.client.send("**Missing args**");
                return;
            }
            if (msg.args[0] === "yourself" || msg.args[0] === "self") {
                if (!bot.permissionCheck(bot.getCommandFromName('suicide'), msg)) {
                    bot.client.send("Your are not authorized to administer this command");
                    return;
                }
                bot.getCommandFromName('suicide').func(msg);
                return;
            }
            bot.client.send("This conflicts with the First Law.");
        }
    });
};
