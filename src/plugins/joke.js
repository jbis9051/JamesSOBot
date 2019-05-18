module.exports = function (bot) {
    bot.addCommand({
        name: "joke",
        args: [],
        description: "Sends a joke",
        shortcuts: [
            "joke"
        ],
        ignore: false,
        permissions: ["all"],
        func: (msg, args, sudo) => {
            if (Math.random() <= 0.1 && args !== "bypass") {
                bot.client.send(`${msg.user_name}'s code :wink:`);
                return;
            }
            bot.json_request('https://official-joke-api.appspot.com/jokes/programming/random', (err, res, body) => {
                body = body[0];
                bot.client.send(body.setup);
                setTimeout(() => {
                    bot.client.send(body.punchline)
                }, 2500);
            });
        }
    });
};
