module.exports = function (bot) {
    bot.RegisterListener({
        func: (msg) =>{
            console.log(msg.content);
            return (msg.content === "o/");
        },
        callback:(msg) => {
            bot.client.send('\\o');
        }
    });
};
