module.exports = function (bot) {
    var lastJavaSucks = 0;
    bot.RegisterListener({
        func: (msg) =>{
            return (msg.getContent().toLowerCase().includes("java") &&  Date.now() - lastJavaSucks > 600000);
        },
        callback:(msg) => {
            lastJavaSucks = Date.now();
            msg.roomContext.send(`Hey ${msg.user_name}...`);
            setTimeout(() => msg.roomContext.send(`Did you know...`), 1500);
            setTimeout(() => msg.roomContext.send(`__***3 BILLION DEVICES RUN JAVA***__`), 2000);
        }
    });
};
