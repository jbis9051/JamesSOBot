module.exports = function (bot) {
    bot.RegisterListener({
        func: (msg) =>{
            return /^\|\|[A-Za-z]+/.test(msg.getContent());
        },
        callback:(msg) => {
            msg.replyDirect("Use a space between `||` and your command. For example: `|| help`")
        }
    });
    bot.RegisterListener({
        func: (msg) => {
            return /^!! *.+/.test(msg.getContent()) && msg.getContext() === 193540;
        },
        callback: (msg) => {
            msg.replyDirect("This bot does not use exclamation points `!!`, instead use the pipe character `||`. For example: `|| help`")
        }
    });
};
