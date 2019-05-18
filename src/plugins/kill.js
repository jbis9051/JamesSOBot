module.exports = function (bot) {
    bot.addCommand({

        name: "kill",
        args: [
            "person"
        ],
        description: "",
        shortcuts: [
            "kill"
        ],
        ignore: false,
        permissions: ["all"],
        func: async (msg, args, sudo) => {
            if (args.length < 1) {
                bot.client.send("**Missing args**");
                return;
            }
            if (args[0] === "yourself" || args[0] === "self") {
                if (!bot.permissionCheck('selfDestruct', msg)) {
                    bot.client.send("Your are not authorized to administer this command");
                    return;
                }
                bot.getCommand('selfDestruct').func(msg, args, sudo);
            }
            bot.client.send("This conflicts with the First Law.");
        }
    });
};
