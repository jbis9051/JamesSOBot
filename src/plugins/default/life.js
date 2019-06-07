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
                msg.roomContext.send("Try `sudo`");
                return;
            }
            bot.log("Shut Down");
            msg.roomContext.send("Shut Down");
            live = false;
        },
    });
    bot.addCommand({
        name: "enable",
        args: [],
        description: "Enables the bot.",
        shortcuts: [
            "enable"
        ],
        ignore: false,
        permissions: ["admin"],
        func: (msg) => {
            if (live) {
                msg.roomContext.send("I'm already alive...");
            } else {
                bot.log("Enable Bot");
                msg.roomContext.send("I'm back alive!");
                live = true;
            }
        },
    });
    bot.addValidatorScript("life", (msg) => {
        return live || msg.getContent() === "|| enable";
    });
};

/**
 * Disables the bot. Won't respond to messages until `|| enable` is ran by admin.
 *
 */
function disable() {}
/**
 * Enables the bot. Will start listening for messages again.
 *
 */
function enable() {}
