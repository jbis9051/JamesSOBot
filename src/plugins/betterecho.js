module.exports = function (bot) {
    bot.addCommand({
        name: "echo",
        args: [],
        description: "",
        shortcuts: [
            "echo",
            "betterecho",
        ],
        ignore: true,
        permissions: ["all"],
        func: (msg) => {
            msg.roomContext.send(msg.args.join(" ").htmldecode());
        }
    });
};
