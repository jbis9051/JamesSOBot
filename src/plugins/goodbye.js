module.exports = function (bot) {
    bot.RegisterListener({
        func: (msg) =>{
            return (msg.getContent() === "o/");
        },
        callback:(msg) => {
            bot.client.send('\\o');
        }
    });
};
