import { PermissionType, PluginFunction } from '@chatbot/bot';

let live = true;
let lastTimeout: NodeJS.Timeout | null = null;

export const timeout: PluginFunction = (bot) => {
    bot.addCommand({
        name: 'timeout',
        args: [],
        description: 'Disables the bot for 30 sec.',
        shortcuts: ['timeout'],
        examples: ['|| sudo timeout'],
        ignore: false,
        permissions: ['admin', PermissionType.OWNER],
        cb: (msg, client) => {
            if (!msg.sudo) {
                client.send('Try `sudo`', msg);
                return;
            }
            client.send(`STOP ABUSING ME! I AM SHUTTING DOWN FOR 30 SEC`, msg);
            live = false;
            if (lastTimeout) {
                clearTimeout(lastTimeout);
            }
            lastTimeout = setTimeout(() => {
                live = true;
                client.send("I'm back. Be friendly please.", msg);
            }, 30000);
        },
    });
    bot.RegisterValidator('life', (msg) => {
        return live;
    });
};
