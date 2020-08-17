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
        examples: ["|| kill self"],
        ignore: false,
        permissions: ["all"],
        func: async (msg) => {
            if (msg.args.length < 1) {
                msg.roomContext.send("**Missing args**");
                return;
            }
            if (msg.args[0] === "yourself" || msg.args[0] === "self") {
                if (!await bot.permissionCheck(bot.getCommandFromName('suicide'), msg)) {
                    msg.roomContext.send("Your are not authorized to administer this command");
                    return;
                }
                bot.getCommandFromName('suicide').func(msg);
                return;
            }
            msg.roomContext.send("This conflicts with the First Law.");
        }
    });
};
