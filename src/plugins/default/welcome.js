let people_seen;
module.exports = function (bot) {
    people_seen = bot.loadData('people_seen') || [];
    const welcome_msg = "@{USERNAME} Welcome to the Test My Bot chat. Feel free to test @JamesBot using `|| command args` syntax. You can also discuss and ask questions about bot creation.  StackOverflow and StackOverflow Chat rules apply. Be nice and don't ask to ask, just ask. Chat API Documentation can be found [here](https://github.com/jbis9051/JamesSOBot/blob/master/docs/CHAT_API.md)";
    bot.addCommand({
        name: "welcome",
        args: [
            "person"
        ],
        description: "Welcomes a new user to the room with a message",
        shortcuts: [
            "welcome"
        ],
        ignore: false,
        permissions: ["all"],
        func: (msg) => {
            if (msg.args.length < 1) {
                msg.roomContext.send("**Missing arg `person`**");
                return;
            }
            const person = msg.args[0];
            msg.roomContext.send(welcome_msg.replace("{USERNAME}", person));
        }
    });
    bot.addShutdownScript((msg) => {
        bot.saveData("people_seen", people_seen);
    });
    bot.RegisterListener({
        func: (msg) => {
            if (bot.isMyMsg(msg)) {
                return false;
            }
            if (people_seen.includes(msg.getStaticUserUID())) {
                return false;
            } else {
                people_seen.push(msg.getStaticUserUID());
                return true;
            }
        },
        callback: async (msg) => {
            if (await msg.roomContext.getNumMessagesFromId(msg.getStaticUserUID()) < 2) {
                msg.roomContext.send(welcome_msg.replace('{USERNAME}', msg.getVariableUsername().replace(" ", "")));
            }
        }
    });
};

/**
 * Welcomes a new user to the room with a message
 * @param {String} user - user to welcome
 */
function welcome(user) {
}
