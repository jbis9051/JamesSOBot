module.exports = function (bot) {
    bot.addCommand({
        name: "choose",
        description: "Chooses an option from a space delimited string of options. Strips 'or's .",
        examples: ["|| choose heads tails", "|| choose 1 2 3 or 4"],
        shortcuts: ["choose", "pick", "choice"],
        permissions: ["all"],
        func: message => {
            message.args = message.args.filter(arg => arg !== "or");
            if (message.args.length === 0) {
                message.roomContext.send("I can't read your mind. Please provide an arg or two.")
            }
            message.roomContext.send(message.args[Math.floor(Math.random() * message.args.length)]);
        }
    })
};
