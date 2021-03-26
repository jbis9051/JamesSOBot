import { Bot, Message, PermissionType, PluginFunction } from '@chatbot/bot';

interface LearnItem {
    name: string;
    output: string;
    description: string;
    creatorID: string;
    creator: string;
    date_created: string;
}

export const learn: PluginFunction = (bot: Bot) => {
    const learn_list: { [key: string]: LearnItem } =
        bot.dataStore.getData('learn_list') || {};
    Object.values(learn_list).forEach(addLearnCommand);
    bot.addCommand({
        name: 'learn',
        args: ['shortcut', 'output'],
        description:
            'Teaches a bot a command. Will output the `output` when `|| shortcut` is called. You can also add args by wrapping the arg number (starting with 1) in curly brackets. If you would like to escape spaces (like for a link) wrap the index in regular brackets. You can also use `{a}` to include all the arguments and `[a]` to encode them all.',
        shortcuts: ['learn'],
        examples: [
            '|| learn shortcut output',
            '|| learn tbh to be honest',
            '|| learn hbd Happy Birthday {1}!',
            '|| learn vampire_redirect https://lmgtfy.com/?q=[1]',
        ],
        ignore: false,
        permissions: [PermissionType.ALL],
        cb: async (msg, client) => {
            if (
                bot.getCommandFromText(
                    msg.args[0]
                ) /* if its already registered a command */ &&
                !(
                    learn_list.hasOwnProperty(msg.args[0]) &&
                    learn_list[msg.args[0]].creatorID === msg.info.fromId
                ) /* unless its a learned command and you have permission to overwrite it */
            ) {
                client.hardReply(
                    'Command with that shortcut already exists',
                    msg
                );
                return;
            }
            if (msg.args.length < 2) {
                client.send('Invalid Number of args', msg);
                return;
            }

            const name = msg.args.shift() as string;
            const output = bot.htmlToMarkdown(msg.args.join(' '));
            const description = `User-taught Command: \`${output}\``;
            // let description = msgString.match(/(?<=\[).+(?=])/);

            learn_list[name] = {
                name,
                output,
                description,
                creatorID: msg.info.fromId,
                creator: msg.info.fromName,
                date_created: new Date().toString(),
            };
            addLearnCommand(learn_list[name]);
            bot.dataStore.setData('learn_list', learn_list);
            client.send(`${name} has been added`, msg);
        },
    });

    function addLearnCommand(learn_object: LearnItem) {
        bot.addCommand({
            name: learn_object.name,
            args: [],
            description: learn_object.description,
            creator: learn_object.creator,
            shortcuts: [learn_object.name.toLowerCase()],
            examples: [],
            ignore: true,
            permissions: [PermissionType.ALL],
            cb: (msg, client) => {
                let { output } = learn_object;
                msg.quotedArgsList.forEach((arg, index) => {
                    output = output
                        .replace(new RegExp(`\\{${index + 1}\\}`, 'g'), arg)
                        .replace(
                            new RegExp(`\\[${index + 1}\\]`, 'g'),
                            encodeURIComponent(arg)
                        );
                });
                output = output
                    .replace(/{a}/g, msg.args.join(' '))
                    .replace(/\[a]/g, encodeURIComponent(msg.args.join(' ')))
                    .replace(/<user>/g, client.getPingString(msg));

                let promise;
                if (output.match(/^<msg>/)) {
                    promise = client.hardReply(
                        output.replace(/^<msg>/, ''),
                        msg
                    );
                } else {
                    promise = client.send(output, msg);
                }
                promise.then((data) => {
                    const imageExtensions = ['png', 'jpg', 'jpeg', 'gif'];
                    if (
                        imageExtensions.includes(
                            output.substring(output.lastIndexOf('.') + 1)
                        )
                    ) {
                        setTimeout(() => {
                            client.edit(`> ${output}`, data.toString()); // get the annoying images away after a timeout
                        }, 60000);
                    }
                });
            },
        });
    }

    bot.addCommand({
        name: 'unlearn',
        args: [''],
        description:
            'Unlearns a learned command command. Must be admin, RO, or command creator.',
        shortcuts: ['unlearn', 'forget'],
        examples: ['|| unlearn tbh'],
        ignore: false,
        permissions: [PermissionType.ALL],
        cb: async (msg, client) => {
            if (!learn_list.hasOwnProperty(msg.args[0])) {
                client.send("That command doesn't exist", msg);
                return;
            }
            if (
                !(
                    bot.inGroup(msg.info.fromId, 'admin') ||
                    (await client.isRoomOwnerId(msg.info.fromId, msg)) ||
                    learn_list[msg.args[0]].creatorID === msg.info.fromId
                )
            ) {
                /* if the user is not an admin or a room owner or they created the command */
                client.send(
                    'You do not have permission to remove this command.',
                    msg
                );
                return;
            }
            delete learn_list[msg.args[0]];
            bot.deleteCommand(bot.commands[msg.args[0]]);
            bot.dataStore.setData('learn_list', learn_list);
            client.send(`${msg.args[0]} has been unlearned`, msg);
        },
    });
};
