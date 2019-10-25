let people_seen;
module.exports = function (bot) {
    people_seen = bot.loadData('people_seen') || [];
    const welcome_messages = require('../../../config/config.json').welcome_msg;
    bot.addCommand({
        name: "welcome",
        args: [
            "person"
        ],
        description: "Welcomes a new user to the room with a message",
        shortcuts: [
            "welcome"
        ],
        examples: ["|| welcome @JBis", "|| welcome JBis"],
        ignore: false,
        permissions: ["all"],
        func: (msg) => {
            if (msg.args.length < 1) {
                msg.roomContext.send("**Missing arg `person`**");
                return;
            }
            const person = msg.args[0];
            if (welcome_messages[msg.getContext()]) {
                msg.roomContext.send(welcome_messages[msg.getContext()].replace("{USERNAME}", person.replace("@", '')));
            } else {
                msg.replyDirect("No welcome message listed.")
            }

        }
    });
    bot.addShutdownScript((msg) => {
        bot.saveData("people_seen", people_seen);
    });
    bot.RegisterListener({
        func: (msg) => {
            if (msg.isMyEvent()) {
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
                if (welcome_messages[msg.getContext()]) {
                    msg.roomContext.send(welcome_messages[msg.getContext()].replace('{USERNAME}', msg.getVariableUsername().replace(" ", "")));
                }
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
