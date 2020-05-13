module.exports = function (bot) {
    bot.addCommand({
        name: "issue",
        args: [],
        description: "Adds an issue to the tracker." +
            "**Adding Issues**" +
            "\n" +
            "First arg is the category and must be must be either 'bug' or 'request'. Second arg is the content of the issue. Please include a link to any relevant messages to help debug." +
            "\n" +
            "**Viewing Issues**" +
            "\n" +
            "First arg must be 'view'" +
            "\n" +
            "**Closing Issues**" +
            "\n" +
            "First arg must be 'close'. Second arg must be ",
        shortcuts: ["issue",],
        examples: ["|| issue bug the issue command doesn't work", "|| learn tbh to be honest", "|| learn hbd Happy Birthday {1}!", "|| learn vampire_redirect https://lmgtfy.com/?q=[1]"],
        ignore: false,
        permissions: ["all"],
        func: async (msg) => {
            if (
                bot.getCommand(msg.args[0]) /* if its already registered a command */
                && !(learn_list.hasOwnProperty(msg.args[0]) && learn_list[msg.args[0]].creatorID === msg.getStaticUserUID()) /* unless its a learned command and you have permission to overwrite it */
            ) {
                msg.replyDirect("Command with that shortcut already exists");
                return;
            }
            if (msg.args.length < 2) {
                msg.roomContext.send("Invalid Number of args");
                return;
            }

            const name = msg.args.shift();
            const output = msg.args.join(" ").htmlToMarkdown();
            const description = `User-taught Command: \`${output}\``;
            // let description = msgString.match(/(?<=\[).+(?=])/);

            learn_list[name] = {
                name: name,
                output: output,
                description: description,
                creatorID: msg.getStaticUserUID(),
                creator: msg.getVariableUsername(),
                date_created: (new Date()).toString(),
            };
            addLearnCommand(learn_list[name]);
            bot.saveData('learn_list', learn_list);
            msg.roomContext.send(name + " has been added");
        }
    });
};
