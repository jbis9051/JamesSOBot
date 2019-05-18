module.exports = function (bot) {
    bot.addCommand({
            name: "status",
            args: [],
            description: "Displays bot status",
            shortcuts: [
                "status"
            ],
            ignore: false,
            permissions: ["all"],
            func: (msg) => {
                bot.client.send(`I am currently alive!`);
            }
        },
    )
};
