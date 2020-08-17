const {Message} = require('../../../../old/src/events/Message.js');

module.exports = function (bot) {
    bot.addCommand({
        name: "Android Docs",
        args: [
            "query"
        ],
        description: "Searches for query on Android Developer Docs",
        shortcuts: [
            "adocs",
            "adoc",
            "androiddocs",
            "droiddocs"
        ],
        examples: ["|| adoc bluetooth"],
        ignore: false,
        permissions: ["all"],
        func: (msg) => {
            if (msg.args.length < 1) {
                msg.roomContext.send("**Missing args**");
                return;
            }
            bot.google_search(msg.args.join(" "), "developer.android.com/reference", null, /^https:\/\/developer\.android\.com\/reference\/.*$/,
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
 * Searches for query on Android Developer Docs
 *
 * @param {String} query
 * @return {String} - An Android Doc article based on your `query`
 */
function adocs(query) {
}
