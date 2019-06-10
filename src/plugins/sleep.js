module.exports = function (bot) {
    bot.addCommand({
        name: "sleep",
        args: [],
        description: "",
        shortcuts: [
            "sleep",
        ],
        ignore: true,
        permissions: ["admin"],
        func: (msg) => {
            console.log("Sleeping");
            sleep(10000);
            msg.reply("Woke up");
        }
    });
};

function sleep(ms) {
    var start = new Date().getTime(), expire = start + ms;
    while (new Date().getTime() < expire) {
    }
    return;
}
