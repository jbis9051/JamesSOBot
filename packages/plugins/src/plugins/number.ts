import { PermissionType, PluginFunction } from '@chatbot/bot';

export const choose: PluginFunction = (bot) => {
    bot.addCommand({
        name: 'number',
        description: 'Chooses a number between 1 and 2, or between a range of one or two numbers if specified.',
        examples: ['||number', '||number 38', '||number 5 60'],
        shortcuts: ['number'],
        permissions: [PermissionType.ALL],
        args: [],
        ignore: false,
        cb: (message, client) => {
            let options = message.args;
            let number = null;
            
            if (options.length === 0) {
                number = Math.floor(Math.random() * 2) + 1;
            } else if (options.length === 1) {
                number = Math.floor(Math.random() * options[0]) + 1;
            } else if (options.length === 2) {
                number = Math.floor(Math.random() * ((options[1] - 0) + (options[0] - 0)) + (options[0] - 0));
            }
            
            client.send(number.toString(), message);
        },
    });
};
