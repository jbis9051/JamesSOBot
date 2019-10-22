const eval = require('./eval/index');
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

    async function _run(code, msg) {
        const val = await eval(code);
        if (val.error) {
            msg.reply(`Error running script: \`${val.result}\``);
            return;
        }
        msg.reply(`\`${val.result}\` Logged: \`${val.logged.join(" ").trim()}\``);
    }

    bot.RegisterListener({
        func: (msg) => {
            return bot.permissionCheck(bot.getCommandFromName("eval"), msg) && /^\|\|>.*$/.test(msg.getContent());
        },
        callback: (msg) => _run(msg.getContent().replace('||>', ''), msg)
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
