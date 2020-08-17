module.exports = function (bot) {
    bot.addCommand({
        name: "funfact",
        args: [],
        description: "Sends a fun fact",
        shortcuts: [
            "funfact",
            "ff"
        ],
        examples: ["|| funfact"],
        ignore: false,
        permissions: ["all"],
        func: (msg) => {
            bot.json_request('https://uselessfacts.jsph.pl/random.json?language=en', (err, res, body) => {
                msg.roomContext.send(body.text);
            });
        }
    });
};

/**
 * Sends a fun fact
 *
 * @return {String} - A fun fact from the `https://uselessfacts.jsph.pl/random.json?language=en`
 */
function funfact() {
}
