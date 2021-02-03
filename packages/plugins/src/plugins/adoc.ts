import { PermissionType, PluginFunction } from '@chatbot/bot';

export const adoc: PluginFunction = (bot) => {
    bot.addCommand({
        name: 'Android Docs',
        args: ['query'],
        description: 'Searches for query on Android Developer Docs',
        shortcuts: ['adocs', 'adoc', 'androiddocs', 'droiddocs'],
        examples: ['|| adoc bluetooth'],
        ignore: false,
        permissions: [PermissionType.ALL],
        cb: (msg, client) => {
            if (msg.args.length < 1) {
                client.send('**Missing args**', msg);
                return;
            }
            bot.google_search(
                msg.args.join(' '),
                'developer.android.com/reference',
                undefined,
                /^https:\/\/developer\.android\.com\/reference\/.*$/
            ).then((data) => {
                if (data) {
                    client.send(client.link(data.title, data.url), msg);
                } else {
                    client.send('An error occurred with the request.', msg);
                }
            });
        },
    });
};
