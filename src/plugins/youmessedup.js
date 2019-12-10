module.exports = function (bot) {
    bot.RegisterListener({
        func: (msg) => {
            return /^!! .+/.test(msg.getContent()) && msg.getContext() === 193540;
        },
        callback: (msg) => {
            msg.roomContext.send("This bot does not use exclamation points `!!`, instead use the pipe character `||`. For example: `|| help`")
        }
    });
};
