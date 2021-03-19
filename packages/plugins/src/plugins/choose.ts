import { PermissionType, PluginFunction } from '@chatbot/bot';

export function chooseFunction(list: string[]) {
    const options = list.filter((arg) => arg !== 'or');
    if (options.length === 0) {
        return false;
    }
    return options[Math.floor(Math.random() * options.length)];
}

export const choose: PluginFunction = (bot) => {
    bot.addCommand({
        name: 'choose',
        description:
            "Chooses an option from a space delimited string of options. Strips 'or's .",
        examples: ['|| choose heads tails', '|| choose 1 2 3 or 4'],
        shortcuts: ['choose', 'pick', 'choice'],
        permissions: [PermissionType.ALL],
        args: ['...options'],
        ignore: false,
        cb: (message, client) => {
            const options = message.quotedArgsList.filter(
                (arg) => arg !== 'or'
            );
            if (options.length === 0) {
                client.send(
                    "I can't read your mind. Please provide an arg or two.",
                    message
                );
            }
            client.send(
                options[Math.floor(Math.random() * options.length)],
                message
            );
        },
    });
};
