module.exports = function (bot) {
    bot.RegisterListener({
        func: (msg) =>{
            return (msg.content === "o/");
        },
        callback:(msg) => {
            bot.client.send('\\o');
        }
    });
};
