const eval = require('./eval/index');
require('../utils.js');
/**
 *
 * @param {Bot} bot
 */
module.exports = function (bot) {
    bot.addCommand({
        name: "eval",
        args: [
            "code"
        ],
        description: "Evaluates JS",
        shortcuts: ["eval"],
        examples: ["|| eval console.log('Hello World!');", ">|| console.log('Hello World!');"],
        ignore: false,
        permissions: ["admin", "second"],
        func: (msg) => {
            _run(msg.args.join(" "), msg);
        },
    });

    function truncate(str) {
        if (typeof str === "string" && str.length > 400) {
            return str.slice(0, 400);
        } else {
            return str;
        }
    }

    async function _run(code, msg) {
        const val = await eval(code);
        val.result = truncate(val.result);
        if (val.error) {
            msg.reply(`Error running script: \`${val.result}\``);
            return;
        }
        let logged = truncate(val.logged.join(", "));
        msg.reply(`\`${val.result}\` Logged: \`${logged}\``);
    }

    bot.RegisterListener({
        func: (msg) => {
            const text = msg.getRawContent().replace(/<br>/g, "\n").replace(/<.+>/g, "").htmldecode();
            if (bot.permissionCheck(bot.getCommandFromName("eval"), msg) && /^\|\|> ./.test(text)) {
                msg.code = text.replace('||>', '');
                return true;
            }
            return false;
        },
        callback: (msg) => _run(msg.code, msg)
    });
};

/**
 * Searches for query on Android Developer Docs
 *
 * @param {String} query
 * @return {String} - An Android Doc article based on your `query`
 */
function adocs(query) {
}
