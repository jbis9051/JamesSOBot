let people_seen;
module.exports = function (bot) {
    people_seen = bot.loadData('people_seen') || [];
    const welcome_msg = "@{USERNAME} Welcome to the Test My Bot chat. Feel free to test @JamesBot using `|| command args` syntax. You can also discuss and ask questions about bot creation.  StackOverflow and StackOverflow Chat rules apply. Be nice and don't ask to ask, just ask.";
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
                bot.client.send("**Missing arg `person`**");
                return;
            }
            const person = msg.args[0];
            bot.client.send(welcome_msg.replace("{USERNAME}", person));
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
            if (await bot.client.getNumMessagesFromId(msg.getStaticUserUID()) < 2) {
                bot.client.send(welcome_msg.replace('{USERNAME}', msg.getVariableUsername()));
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
