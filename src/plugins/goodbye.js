module.exports = function (bot) {
    bot.RegisterListener({
        func: (msg) =>{
            return msg.getContext() === 193540 && (msg.getContent() === "o/");
        },
        callback:(msg) => {
            msg.roomContext.send('\\o');
        }
    });
};
