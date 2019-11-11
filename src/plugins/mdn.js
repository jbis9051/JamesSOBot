const {Message} = require('../events/Message.js');

module.exports = function (bot) {
    bot.addCommand({
        name: "mdn",
        args: [
            "query"
        ],
        description: "Searches for query on MDN",
        shortcuts: [
            "mdn"
        ],
        examples: ["|| mdn array sort"],
        ignore: false,
        permissions: ["all"],
        func: (msg) => {
            if (msg.args.length < 1) {
                msg.roomContext.send("**Missing args**");
                return;
            }
            bot.google_search(msg.args.join(" "), "developer.mozilla.org", null, /^https:\/\/developer\.mozilla\.org\/.*$/,
                (data)=> {
                    if (data) {
                        msg.replyDirect(Message.link(data.title, data.url).htmldecode());
                    } else {
                        msg.replyDirect('An error occurred with the request.');
                    }
                });
        },
    });
    bot.RegisterListener({
        func: (msg) => {
            const text = msg.getRawContent().replace(/<br>/g, "\n").replace(/<.+>/g, "").htmldecode();
            if (bot.permissionCheck(bot.getCommandFromName("eval"), msg) && /^(\|\|>|>\|\||!!>) ./.test(text)) {
                const trigger = text.match(/^(\|\|>|>\|\||!!>) ./)[1];
                msg.code = text.replace(trigger, '');
                if (/^\s*{/.test(msg.code) && /}\s*$/.test(msg.code)) {
                    msg.code = '(' + msg.code + ')';
                }
                return true;
            }
            return false;
        },
        callback: (msg) => _run(msg.code, msg)
    });
};
/**
 * Searches for query on MDN
 *
 * @param {String} query
 * @return {String} - An MDN article based on your `query`
 */
function mdn(query) {}
