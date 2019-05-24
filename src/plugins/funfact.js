module.exports = function (bot) {
    bot.addCommand({
        name: "funfact",
        args: [],
        description: "Sends a fun fact",
        shortcuts: [
            "funfact",
            "ff"
        ],
        ignore: false,
        permissions: ["all"],
        func: (msg) => {
            bot.json_request('http://randomuselessfact.appspot.com/random.json?language=en', (err, res, body) => {
                bot.client.send(body.text);
            });
        }
    });
};
/**
 * Sends a fun fact
 *
 * @return {String} - A fun fact from the `http://randomuselessfact.appspot.com/random.json?language=en`
 */
function funfact() {}
