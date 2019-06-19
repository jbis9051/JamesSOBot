module.exports = function (bot) {

    function requestEval(msg) {
        /* mathjs has some vulnerabilitiy issues with it's evaluation function. So let's just use their API. Exploit them all you want! " */
        bot.standard_request('http://api.mathjs.org/v4/?expr=' + encodeURIComponent(msg.args.join(" ")), (error, response, body) => {
            if (!(response.statusCode === 200 || response.statusCode === 400)) {
                msg.reply("Error with request");
            } else {
                msg.reply(`"${body}"`)
            }
        });
    }

    bot.addCommand({
        name: "calc",
        args: [],
        description: "Calculates an expression using Math.js",
        shortcuts: [
            "calc",
            "math",
            "calculator",
            "c"
        ],
        examples: ["|| calc 5^2", "|| calc 9*2"],
        ignore: false,
        permissions: ["all"],
        func: (msg) => {
            if (msg.args[0] === "docs") {
                msg.reply("The calc command uses math.js. Checkout the docs [here](https://mathjs.org/docs/index.html)");
                return;
            }
            requestEval(msg);
        }
    });
};

/**
 * Sends a fun fact
 * @param expression - expression to evaluate
 * @return {String} - result
 */
function calc(expression) {
}

