let timers = [];
module.exports = function (bot) {
    bot.addCommand({
        name: "timer",
        args: [],
        description: "Creates a timer",
        shortcuts: [
            "timer",
            "remind",
            "remindme"
        ],
        examples: ["|| remind 'hello JBis' in 10 minutes", "|| remind 'hello JBis' 10 hours"],
        ignore: false,
        permissions: ["all"],
        func: (msg) => {
            const content = msg.quotedArgsList.shift();
            const mili = convertTimeStringToMiliseconds(msg.quotedArgsList.join(" "));
            if (!mili) {
                msg.roomContext.send("I don't know that time.");
                return;
            }
            timers.push({
                user: msg.getVariableUsername(),
                id: msg.getStaticUserUID(),
                room: msg.getContext(),
                content: content,
                expires: Date.now() + mili,
                timer: setTimeout(_ => msg.softReply(content), mili)
            });

            msg.roomContext.send("Reminder Added.")
        }
    });
};

function convertTimeStringToMiliseconds(time) {
    const parts = time.split(" ");
    let unit = parts.pop();
    let numeric = Number(parts.pop());
    if (!numeric || !unit || numeric < 0) {
        return false;
    }
    const units = [
        {
            name: "hours",
            alias: ["h"],
            multiplier: 3.6e+6,
        },
        {
            name: "minutes",
            alias: ["min", "m"],
            multiplier: 60000,
        },
        {
            name: "seconds",
            alias: ["sec", "s"],
            multiplier: 1000,
        },

    ];
    const timeObj = units.find(obj => obj.name === unit || obj.alias.includes(unit));
    if (!timeObj) {
        return false;
    }
    return numeric * timeObj.multiplier;

}

/**
 * Sets a timer to remind a user a message at a specific time relative to the current time
 *
 * Alias:
 *
 * - `timer`
 * @param {String} user - username of the person to remind, or "me" if you want the bot to remind you
 * @param {String} message - the message to be reminded about
 * @param {String} time - in how much time, relative to the current time, would you like the remind to occur. Must be in the following format: `int [suffix]` or `int[one letter suffix]`
 *
 * Example:
 *
 * `|| remind @JBis Hello. 5 seconds`
 * `|| remind @JBis Hello. 5s`
 *
 * Suffixes:
 *
 * | Unit | Suffixes |
 * |------|----------|
 * | Seconds | <ul><li>`seconds`</li><li>`sec`</li><li>`s`</li></ul> |
 * | Minutes | <ul><li>`minutes`</li><li>`min`</li><li>`m`</li></ul> |
 * | Hours | <ul><li>`hours`</li><li>`h`</li></ul> |
 */
function remind(user, message, time) {
}
