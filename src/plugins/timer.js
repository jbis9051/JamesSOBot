let timers = [];
module.exports = function (bot) {
    bot.addCommand({
        name: "timer",
        args: ["who to remind (@User or me)","what to remind","time"],
        description: "Creates a time",
        shortcuts: [
            "timer",
            "remind",
            "remind"
        ],
        ignore: false,
        permissions: ["all"],
        func: (msg, args, sudo) => {
            if(args.length < 3){
                if(args.length < 1){
                    bot.client.send("Need more args");
                    return;
                }
                if(args[0] === "list"){
                    //TODO list current timers/reminders
                }
                return;
            }
            let user = args.pop();
            if(user === "me"){
                user = "@"+msg.user_name;
            }
            let time = convertTimeToMiliseconds(args.pop());
            if(!time){
                bot.client.send("Invalid time.");
                return;
            }
            const content = `${user}, ${args.join(" ")}`;
            timers.push({
               user: msg.user_name,
               content: content,
               date: Date.now() + time,
            });
            const index = timers.length;
            setTimeout(()=>{
               bot.client.send(content);
               timers.splice(index,1);
            },time);
            bot.client.send("Ok. I'll remind you.")
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
