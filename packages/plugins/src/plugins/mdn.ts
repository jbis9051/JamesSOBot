import { Bot, PermissionType, PluginFunction } from '@chatbot/bot';

export function mdnSearch(bot: Bot, term: string) {
    return bot.google_search(
        term,
        'developer.mozilla.org',
        undefined,
        /^https:\/\/developer\.mozilla\.org\/.*$/
    );
}

export const mdn: PluginFunction = (bot) => {
    bot.addCommand({
        name: 'mdn',
        args: ['query'],
        description: 'Searches for query on MDN',
        shortcuts: ['mdn', 'rtfm'],
        examples: ['|| mdn array sort'],
        ignore: false,
        permissions: [PermissionType.ALL],
        cb: (msg, client) => {
            let searchArgs = msg.args.join(' ');
            if (msg.args.length < 1) {
                searchArgs = 'mdn'; // || mdn --> || mdn mdn
            }
            mdnSearch(bot, searchArgs).then((data) => {
                if (data) {
                    client.send(
                        bot.htmldecode(client.link(data.title, data.url)),
                        msg
                    );
                } else {
                    client.send('An error occurred with the request.', msg);
                }
            });
        },
    });
};
