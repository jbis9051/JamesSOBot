import { PermissionType, PluginFunction } from '@chatbot/bot';

export const google: PluginFunction = (bot) => {
    bot.addCommand({
        name: 'Google Search',
        args: ['query'],
        description: 'Searches for query on Google',
        shortcuts: ['google', 'search'],
        examples: ['|| google increase swap on ubuntu'],
        ignore: false,
        permissions: [PermissionType.ALL],
        cb: (msg, client) => {
            if (msg.args.length < 1) {
                client.send('**Missing args**', msg);
                return;
            }
            bot.google_search(msg.args.join(' ')).then((data) => {
                if (data) {
                    if (
                        data.url.match(
                            /(stackoverflow|unix\.stackexchange)\.com\/questions/
                        )
                    ) {
                        client.send(data.url, msg);
                    } else {
                        client.send(client.link(data.title, data.url), msg);
                    }
                } else {
                    client.send('An error occurred with the request.', msg);
                }
            });
        },
    });
};
