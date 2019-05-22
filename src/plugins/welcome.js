module.exports = function (bot) {
    const welcome_msg = "<@{USER_ID}> Welcome, {USERNAME}, to the programming chat. Please introduce yourself after joining. This includes age and location (if you are comfortable with sharing that), favorite languages and frameworks, a few recent and past projects (if you have any you want to share), github profiles, personal websites, etc., and anything else that you want us to know about you. Also please tell us who recruited you into the chat. Thanks!";
    bot.addCommand({
        name: "welcome",
        args: [
            "person"
        ],
        description: "Welcomes a new user to the room with a message",
        shortcuts: [
            "welcome"
        ],
        ignore: false,
        permissions: ["all"],
        func: (msg) =>{
            if (msg.args.length < 1) {
                bot.client.send("**Missing arg `person`**");
                return;
            }
            const person = msg.args[0];
            bot.client.send(welcome_msg.replace("{USER_ID}",person).replace("{USERNAME}",person));
        }
    });
    bot.RegisterClientListener('guildMemberAdd',(member) => {
        bot.client.channels.find("name","general").send(welcome_msg.replace("{USER_ID}",member.user.id).replace("{USERNAME}",member.user.username));
    });
};
