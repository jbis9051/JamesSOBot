const {ChatEvent} = require('../events/ChatEvent.js');

let afk_data;
// 2 min between afk message
const rateLimit = 2 * 60 * 1000;
// 2 minutes where you can talk without escaping the afk.
const gracePeriod = 2 * 60 * 1000;
let lastTell = 0;
module.exports = function (bot) {
    afk_data = bot.loadData("afk_data") || {};

    bot.RegisterListener({
        func: message => {
            return true
        },
        callback: (msg) => {
            if (msg.isMyEvent()) {
                return;
            }
            const username = msg.getVariableUsername().replace(/ /g, '');
            if (isAFK(username)
                && Date.now() - afk_data[username].afkSince >= gracePeriod
            ) {
                delete afk_data[username];
                bot.log(username + " is not afk");
                bot.saveData('afk_data', afk_data);
            }
            const people_mentioned = msg.getContent().match(/@[^ ]+/g) || [];
            people_mentioned.forEach(person => {
                person = person.replace('@', '');
                if (
                    isAFK(person)
                    && Date.now() - lastTell >= rateLimit
                ) {
                    msg.replyDirect(person + ' is afk: ' + afk_data[person].msg);
                    afk_data[person].lastPing = Date.now();
                    lastTell = Date.now();
                    bot.saveData('afk_data', afk_data);
                }
            });
        }
    });

    function isAFK(username) {
        return afk_data.hasOwnProperty(username);
    }

    bot.addCommand({
        name: "afk",
        args: ["message"],
        description: "Add an afk message",
        shortcuts: [
            "afk"
        ],
        examples: ["|| afk bla", "|| afk foo"],
        ignore: false,
        permissions: ["all"],
        func: async (msg) => {
            afk_data[msg.getVariableUsername().replace(/ /g, '')] = {
                afkSince: Date.now(),
                lastPing: null,
                id: msg.getStaticUserUID(),
                msg: msg.args.join(" "),
            };
            bot.saveData('afk_data', afk_data);
            bot.log(msg.getVariableUsername() + " is afk");
            msg.replyDirect("bye " + msg.getVariableUsername())
        }
    });
};
