let learn_list;
module.exports = function (bot) {
    learn_list = bot.loadData("learn_list") || {};
    Object.values(learn_list).forEach(addLearnCommand);
    bot.addCommand({
        name: "learn",
        args: ["shortcut", "output"],
        description: "Teaches a bot a command. Will output the `output` when `|| shortcut` is called. You can also add args by wrapping the arg number (starting with 1) in curly brackets. If you would like to escape spaces (like for a link) wrap the index in regular brackets. You can also use `{a}` to include all the arguments and `[a]` to encode them all.",
        shortcuts: [
            "learn"
        ],
        examples: ["|| learn shortcut output", "|| learn tbh to be honest", "|| learn hbd Happy Birthday {1}!", "|| learn vampire_redirect https://lmgtfy.com/?q=[1]"],
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

    function addLearnCommand(learn_object) {
        bot.addCommand({
            name: learn_object.name,
            args: [],
            description: learn_object.description,
            creator: learn_object.creator,
            shortcuts: [
                learn_object.name.toLowerCase()
            ],
            ignore: true,
            permissions: ["all"],
            func: (msg) => {
                let output = learn_object.output;
                Array.from(
                    msg.args
                        .join(" ") // get em back to the original args
                        .matchAll(/(["'])((?:(?!\1).)*)(\1)|([^\s]+)/) // match all args https://stackoverflow.com/a/8057827/7886229
                )
                    .map(matches => {
                        if (matches[2]) { // we have a quoter
                            return matches[2].substring(0, matches[2].length) // am i the only one that has to look this up everytime i use it?
                        } else {
                            return matches[4] // otherwise just return the match
                        }
                    })
                    .forEach((arg, index) => {
                        output = output
                            .replace(new RegExp('\\{' + (index + 1) + '\\}', 'g'), arg)
                            .replace(new RegExp('\\[' + (index + 1) + '\\]', 'g'), encodeURIComponent(arg))
                    });
                output = output
                    .replace(/{a}/g, msg.args.join(" "))
                    .replace(/\[a]/g, encodeURIComponent(msg.args.join(" ")));

                msg.roomContext.send(output).then(id => {
                    const imageExtensions = ["png", "jpg", "jpeg", "gif"];
                    if (imageExtensions.includes(output.substring(output.lastIndexOf(".") + 1))) {
                        setTimeout(() => {
                            msg.roomContext.edit(id, `> ${output}`); // get the annoying images away after a timeout
                        }, 60000);
                    }
                });
            }
        });
    }

    bot.addCommand({
        name: "unlearn",
        args: [""],
        description: "Unlearns a learned command command",
        shortcuts: [
            "unlearn",
            "forget"
        ],
        examples: ["|| unlearn tbh"],
        ignore: false,
        permissions: ["all"],
        func: async (msg) => {
            if (!learn_list.hasOwnProperty(msg.args[0])) {
                msg.roomContext.send("That command doesn't exist");
                return;
            }
            if (!(bot.isAdmin(msg.args[0]) || await msg.roomContext.isRoomOwnerId(msg.getStaticUserUID()) || learn_list[msg.args[0]].creatorID === msg.getStaticUserUID())) { /* if the user is not an admin or a room owner or they created the command */
                msg.roomContext.send("You do not have permission to remove this command.");
                return;
            }
            delete learn_list[msg.args[0]];
            bot.deleteCommand(bot.getCommandFromName(msg.args[0]));
            bot.saveData('learn_list', learn_list);
            msg.roomContext.send(msg.args[0] + " has been unlearned");
        }
    });
};
