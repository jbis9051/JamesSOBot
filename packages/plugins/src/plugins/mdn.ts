import { Bot, Client, PermissionType, PluginFunction } from '@chatbot/bot';

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
            if (msg.args.length < 1) {
                client.send('**Missing args**', msg);
                return;
            }
            mdnSearch(bot, msg.args.join(' ')).then((data) => {
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
    /*
    bot.RegisterListener({
        func: (msg) => {
            const text = msg.getRawContent().replace(/<br>/g, "\n").replace(/<.+>/g, "").htmldecode();
            if (bot.permissionCheck(bot.getCommandFromName("eval"), msg) && /^(\|\|>|>\|\||!!>) ./.test(text)) {
                const trigger = text.match(/^(\|\|>|>\|\||!!>) ./)[1];
                msg.code = text.replace(trigger, '');
                if (/^\s*{/.test(msg.code) && /}\s*$/.test(msg.code)) {
                    msg.code = '(' + msg.code + ')';
                }
                return true;
            }
            return false;
        },
        callback: (msg) => _run(msg.code, msg)
    }); */
};
