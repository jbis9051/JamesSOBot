module.exports = function (bot) {
    bot.addCommand({
        name: "echo",
        args: [],
        description: "Bot echo's what you say",

        shortcuts: [
            "echo",
            "betterecho",
            "say"
        ],
        examples: ["|| echo hi"],
        ignore: true,
        permissions: ["all"],
        func: (msg) => {
            msg.roomContext.send(msg.args.join(" ").htmldecode());
        }
    });
};
