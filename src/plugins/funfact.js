module.exports = function (bot) {
    bot.addCommand({
        name: "funfact",
        args: [],
        description: "Sends a funfact",
        shortcuts: [
            "funfact",
            "ff"
        ],
        ignore: false,
        permissions: ["all"],
        func: (msg, args, client, sudo) => {
            bot.json_request('http://randomuselessfact.appspot.com/random.json?language=en', (err, res, body) => {
                bot.client.send(body.text);
            });
        }
    });
};
