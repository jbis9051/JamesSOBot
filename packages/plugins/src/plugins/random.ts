import {PermissionType, PluginFunction} from "@chatbot/bot";

export const random: PluginFunction = (bot) => {
    bot.addCommand({
        name: "random",
        args: ["min", "max"],
        description: "Generates Random number in range of [min,max] (both inclusive)",
        shortcuts: [
            "random",
        ],
        examples: ["|| random 2 30", "|| random -2 30", "|| random 30 18"],
        ignore: false,
        permissions: [PermissionType.ALL],
        cb: (msg, client) => {
            if (msg.args.length < 2) {
                client.send("**Missing args**", msg);
                return;
            }
            if (!/^\d+$/.test((msg.args[0] + msg.args[1]).replace(/-/g, ""))) { // check if its all digits and replace the "-" incase it is negative
                client.send("**Invalid args. Must be two integers.**", msg);
                return;
            }
            const num1 = parseInt(msg.args[0]);
            const num2 = parseInt(msg.args[1]);
            client.hardReply(getRandomIntInclusive(Math.min(num1, num2), Math.max(num1, num2)).toString(), msg)
        }
    });
};

export default random;

/* Nobody likes computer science so why not just trust MDN people did it properly --> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random*/
function getRandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function getRandomIntInclusive(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}
