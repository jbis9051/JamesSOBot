const {Message} = require('../../../../old/src/events/Message.js');

module.exports = function (bot) {
    bot.addCommand({
        name: "Apple Search",
        args: [
            "query"
        ],
        description: "Searches for query on Apple Support",
        shortcuts: [
            "aps",
            "apple"
        ],
        examples: ["|| aps forgot Apple ID password"],
        ignore: false,
        permissions: ["all"],
        func: (msg) => {
            if (msg.args.length < 1) {
                msg.roomContext.send("**Missing args**");
                return;
            }
            bot.google_search(msg.args.join(" "), "support.apple.com", null, /^https:\/\/support\.apple\.com\/.*$/,
                (data) => {
                    if (data) {
                        msg.roomContext.send(Message.link(data.title, data.url));
                    } else {
                        msg.roomContext.send('An error occurred with the request.');
                    }
                });
        },
    })
};

/**
 * Searches for query on Apple Support
 *
 * @param {String} query
 * @return {String} - An Apple Support article based on your `query`
 */
function aps(query) {
}
