module.exports = function (bot) {
    bot.RegisterListener({
        func: (msg) =>{
            return /^\|\|[A-Za-z]+/.test(msg.content);
        },
        callback:(msg) => {
           msg.reply("Use a space between `||` and your command. For example: `|| help`")
        }
    });
};
