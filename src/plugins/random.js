module.exports = function (bot) {
    bot.addCommand({
        name: "random",
        args: ["min", "max"],
        description: "Generates Random number in range of [min,max] (both inclusive)",
        shortcuts: [
            "random",
        ],
        ignore: false,
        permissions: ["all"],
        func: (msg) => {
            if (msg.args.length < 2) {
                bot.client.send("**Missing args**");
                return;
            }
            if (!/^\d+$/.test(msg.args[0] + msg.args[1])) {
                bot.client.send("**Invalid args. Must be two integers.**");
                return;
            }
            msg.args[0] = parseInt(msg.args[0]);
            msg.args[1] = parseInt(msg.args[1]);
            msg.reply(getRandomIntInclusive(Math.min(msg.args[0],msg.args[1]),Math.max(msg.args[0],msg.args[1])))
        }
    });
};
/* Nobody likes computer science so why not just trust MDN people did it properly --> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random*/
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}
/**
 * Generates Random number in range of [min,max] (both inclusive)
 *
 * @param {int} min
 * @param {int} max
 * @return {String} - A random number between min and max (inclusive)
 */
function random(min,max) {}
