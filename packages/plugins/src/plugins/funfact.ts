import { PermissionType, PluginFunction } from '@chatbot/bot';

export const funfact: PluginFunction = (bot) => {
    bot.addCommand({
        name: 'funfact',
        args: [],
        description: 'Sends a fun fact',
        shortcuts: ['funfact', 'ff'],
        examples: ['|| funfact'],
        ignore: false,
        permissions: [PermissionType.ALL],
        cb: (msg, client) => {
            fetch('https://uselessfacts.jsph.pl/random.json?language=en')
                .then((resp) => resp.json())
                .then((body: any) => {
                    client.send(body.text, msg);
                });
        },
    });
};
