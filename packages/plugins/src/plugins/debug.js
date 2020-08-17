let debug = false;
module.exports = function (bot) {
    bot.addCommand({
        name: "debug",
        args: [],
        description: "Disables/Enables the bot in the test room (193540)",
        shortcuts: ["debug"],
        examples: ["|| sudo debug enable"],
        ignore: false,
        permissions: ["admin"],
        func: (msg) => {
            if (!msg.sudo) {
                msg.roomContext.send("Try `sudo`");
                return;
            }
            if (msg.args[0] === "disable") {
                debug = false;
                msg.roomContext.send("**DEBUG MODE DISABLED**");
            } else {
                msg.roomContext.send("**DEBUG MODE ENABLED**");
                debug = true;
            }
        },
    });
    bot.addValidatorScript("debug", (msg) => {
        return msg.getContext() !== 193540 || !debug || msg.getContent() === "|| sudo debug disable";
    });
};
