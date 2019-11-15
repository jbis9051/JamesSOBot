let learn_list;
module.exports = function (bot) {
    learn_list = bot.loadData("learn_list") || {};
    Object.values(learn_list).forEach(addLearnCommand);
    bot.addCommand({
        name: "learn",
        args: ["shortcut", "output"],
        description: "Teaches a bot a command. Will output the `output` when `|| shortcut` is called",
        shortcuts: [
            "learn"
        ],
        examples: ["|| learn shortcut output", "|| learn tbh to be honest"],
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
            shortcuts: [
                learn_object.name.toLowerCase()
            ],
            ignore: true,
            permissions: ["all"],
            func: (msg) => {
                msg.roomContext.send(learn_object.output)
            }
        });
    }

    bot.addCommand({
        name: "unlearn",
        args: [""],
        description: "Unlearns a learned command command",
        shortcuts: [
            "unlearn"
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
