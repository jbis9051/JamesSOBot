let live = true;
module.exports = function (bot) {
    bot.addCommand({
        name: "disable",
        args: [],
        description: "Disables the bot. Won't respond to messages until `|| enable` is ran by admin.",
        shortcuts: [
            "disable"
        ],
        ignore: false,
        permissions: ["admin"],
        func: (msg) => {
            if (!msg.sudo) {
                bot.client.send("Try `sudo`");
                return;
            }
            bot.log("Shut Down");
            bot.client.send("Shut Down");
            live = false;
        },
    });
    bot.addCommand({
        name: "enable",
        args: [],
        description: "Enabled the bot.",
        shortcuts: [
            "enable"
        ],
        ignore: false,
        permissions: ["admin"],
        func: (msg) => {
            if (live) {
                bot.client.send("I'm already alive...");
            } else {
                bot.log("Enable Bot");
                bot.client.send("I'm back alive!");
                live = true;
            }
        },
    });
    bot.addValidatorScript("life",(msg) => {
        return live || msg.getContent() === "|| enable";
    });
};
