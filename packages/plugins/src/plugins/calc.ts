import {PluginFunction} from "@chatbot/bot";
import fetch from 'node-fetch';

const calc: PluginFunction = (bot) => {
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
        cb: async (msg, client) => {
            if (msg.args[0] === "docs") {
                client.send("The calc command uses math.js. Checkout the docs [here](https://mathjs.org/docs/index.html)", msg);
                return;
            }
            /* mathjs has some vulnerability issues with it's evaluation function. So let's just use their API. Exploit them all you want! " */
            const response = await fetch('http://api.mathjs.org/v4/?expr=' + encodeURIComponent(msg.args.join(" ")));

            if (!(response.status === 200 || response.status === 400)) {
                client.hardReply("Error with request", msg);
            } else {
                client.hardReply(`"${await response.text()}"`, msg)
            }
        }
    });
};
export default calc;
