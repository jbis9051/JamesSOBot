import { PluginFunction } from '@chatbot/bot';

export const selfDestruct: PluginFunction = (bot) => {
    bot.addCommand({
        name: 'suicide',
        args: [],
        description: "Ends the bot's node process.",
        shortcuts: [
            'die',
            'destroy',
            'selfdestruct',
            'suicide',
            'reboot',
            'restart',
            'just_do_it',
            'shutdown',
        ],
        examples: ['|| sudo restart'],
        ignore: false,
        permissions: ['admin'],
        cb: (msg, client) => {
            if (!msg.sudo) {
                client.send('Try `sudo`', msg);
                return;
            }
            client
                .send(
                    'My life has come to end. I hope to be revived soon.',
                    msg
                )
                .then(() => {
                    bot.shutdown(msg, client);
                });
        },
    });
};
