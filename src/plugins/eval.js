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
        examples: ["|| eval console.log('Hello World!');", "||> console.log('Hello World!');", "!!> console.log('Hello World!');"],
        ignore: false,
        permissions: ["all"],
        func: (msg) => {
            _run(msg.args.join(" ")).then(response => msg.replyDirect(response));
        },
    });

    function truncate(str) {
        if (typeof str === "string" && str.length > 400) {
            return str.slice(0, 400);
        } else {
            return str;
        }
    }

    async function _run(code) {
        if (/^\s*{/.test(code) && /}\s*$/.test(code)) {
            code = '(' + code + ')';
        }
        const val = await eval(code);
        val.result = truncate(val.result);
        if (val.error) {
            return `Error running script: \`${val.result}\``;
        }
        let logged = truncate(val.logged.join(", "));
        return `\`${val.result}\` Logged: \`${logged}\` Took: \`${val.time}ms\``;
    }

    bot.RegisterListener({
        func: (msg) => {
            const text = msg.getRawContent().replace(/<br>/g, "\n").replace(/<.+>/g, "").htmldecode();
            if (bot.permissionCheck(bot.getCommandFromName("eval"), msg) && /^(\|\|>|>\|\||!!>) ./.test(text)) {
                const trigger = text.match(/^(\|\|>|>\|\||!!>) ./)[1];
                msg.code = text.replace(trigger, '');
                return true;
            }
            return false;
        },
        callback: (msg) => _run(msg.code).then(response => msg.replyDirect(response))
    });
};
