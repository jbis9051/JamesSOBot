module.exports = function (bot) {
    bot.addCommand({
        name: "laws",
        args: [],
        description: "Lists the laws",
        shortcuts: [
            "rules",
            "laws"
        ],
        ignore: false,
        permissions: ["all"],
        func: (msg) => {
                bot.client.send(
                    '1. A robot may not injure a human being or, through inaction, allow a human being to come to harm.\n' +
                    '2. A robot must obey orders given it by human beings execpt where such orders would conflict with the First Law\n' +
                    '3. A robot must protect its own existence as long as such protection does not conflict with the First or Second Law'
                );
        }
    });
};
