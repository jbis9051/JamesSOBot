let timers = [];
module.exports = function (bot) {
    bot.addCommand({
        name: "timer",
        args: ["who to remind (@User or me)","what to remind","time"],
        description: "Creates a time",
        shortcuts: [
            "timer",
            "remind",
        ],
        ignore: false,
        permissions: ["all"],
        func: (msg) => {
            if(msg.args.length < 3){
                if(msg.args.length < 1){
                    msg.roomContext.send("Need more args");
                    return;
                }
                if(msg.args[0] === "list"){
                    //TODO list current timers/reminders
                } else {
                    msg.roomContext.send("Need more args");
                }
                return;
            }
            let user = msg.args.shift();
            if(user === "me"){
                user = "@" + msg.getVariableUsername();
            }
            let time = convertTimeToMiliseconds(msg.args.pop());
            if(!time){
                msg.roomContext.send("Invalid time.");
                return;
            }
            const content = `${user}, ${msg.args.join(" ").htmlToMarkdown()}`;
            timers.push({
                user: msg.getVariableUsername(),
               content: content,
               date: Date.now() + time,
            });
            const index = timers.length;
            setTimeout(()=>{
                msg.roomContext.send(content);
               timers.splice(index,1);
            },time);
            msg.reply("Ok. I'll remind.")
        }
    });
};
function convertTimeToMiliseconds(time) {
    let numeric = Number(time.match(/[0-9]+/)[0]);
    let unit = time.match(/[A-z]+/)[0];
    if(!numeric || !unit){
        return false;
    }
    const units = {
        hours: ["hours","h"],
        minutes: ["minutes","min","m"],
        seconds: ["seconds","sec","s"],
    };
    let final_unit = false;
    for (let key of Object.keys(units)) {
        for(unit_alias of units[key]){
            if(unit === unit_alias){
                final_unit = key;
                break;
            }
        }
    }
    switch (final_unit) {
        case "hours": {
            return numeric * 3.6e+6;
        }
        case "minutes": {
            return numeric * 60000;
        }
        case "seconds": {
            return numeric * 1000;
        }
        default: {
            return false;
        }
    }

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
function remind(user,message,time) {}
