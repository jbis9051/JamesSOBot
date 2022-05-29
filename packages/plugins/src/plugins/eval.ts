import { PermissionType, PluginFunction } from '@chatbot/bot';
import eval from './eval/index';

function truncate(str: string | any) {
    if (typeof str === 'string' && str.length > 400) {
        return str.slice(0, 400);
    }
    return str;
}

export async function RunEval(code: string) {
    if (/^\s*{/.test(code) && /}\s*$/.test(code)) {
        // eslint-disable-next-line no-param-reassign
        code = `(${code})`;
    }
    // eslint-disable-next-line no-eval
    const val = await eval(code);
    val.result = truncate(val.result);
    if (val.error) {
        return `Error running script: \`${val.error}\``;
    }
    const logged = truncate(val.logged);
    return `\`${val.result}\` Logged: \`${logged}\` Took: \`${val.time}ms\``;
}

export const evalPlugin: PluginFunction = (bot) => {
    bot.addCommand({
        name: 'eval',
        args: ['code'],
        description: 'Evaluates JS',
        shortcuts: ['eval'],
        examples: [
            "|| eval console.log('Hello World!');",
            "||> console.log('Hello World!');",
            "!!> console.log('Hello World!');",
        ],
        ignore: false,
        permissions: [PermissionType.ALL],
        cb: (msg, client) => {
            RunEval(msg.args.join(' ')).then((response) =>
                client.hardReply(response, msg)
            );
        },
    });

    bot.RegisterHandler((msg, client) => {
        const text = bot.htmldecode(
            msg.info.rawContent.replace(/<br>/g, '\n').replace(/<.+>/g, '')
        );
        if (
            // @ts-ignore FIXME: can RegisterHandler accept async callbacks?
            bot.permissionCheck(client, bot.commands.eval, msg) &&
            /^(\|\|>|>\|\||!!>) ./.test(text)
        ) {
            const trigger = text.match(/^(\|\|>|>\|\||!!>) ./)![1];
            RunEval(text.replace(trigger, '')).then((response) =>
                client.hardReply(response, msg)
            );
        }
    });
};
