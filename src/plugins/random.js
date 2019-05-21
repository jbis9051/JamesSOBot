module.exports = function (bot) {
    bot.addCommand({
        name: "random",
        args: ["Integer 1", "Integer 2"],
        description: "Random number in range of [arg[0],arg[0]] (both inclusive)",
        shortcuts: [
            "random",
        ],
        ignore: false,
        permissions: ["all"],
        func: (msg, args) => {
            if (args.length < 2) {
                bot.client.send("**Missing args**");
                return;
            }
            if (!/^\d+$/.test(args[0] + args[1])) {
                bot.client.send("**Invalid args. Must be two integers.**");
                return;
            }
            args[0] = parseInt(args[0]);
            args[1] = parseInt(args[1]);
            msg.reply(getRandomIntInclusive(Math.min(args[0],args[1]),Math.max(args[0],args[1])))
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
