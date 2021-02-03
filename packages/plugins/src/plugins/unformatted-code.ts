import { PermissionType, PluginFunction } from '@chatbot/bot';

const needsResponse: { [key: string]: NodeJS.Timeout } = {};

const format_message =
    "Please don't post unformatted code - hit Ctrl+K before sending, use up-arrow to edit messages, and see the [faq](https://chat.stackoverflow.com/faq). You have 25 seconds to edit and format your message properly before it will be removed. Please separate code blocks from your actual question. Put your question in 1 message and then your code in a 2nd and format it.";
const format_message_command =
    "Please don't post unformatted code - hit Ctrl+K before sending, use up-arrow to edit messages, and see the [faq](https://chat.stackoverflow.com/faq). Please separate code blocks from your actual question. Put your question in 1 message and then your code in a 2nd and format it.";

export const unformattedCode: PluginFunction = (bot, config) => {
    bot.addCommand({
        name: 'formatting',
        args: ['person'],
        description: 'Message about formatting to an optional person',
        shortcuts: ['formatting'],
        examples: ['|| formatting @JBis', '|| formatting'],
        ignore: false,
        permissions: [PermissionType.ALL],
        cb: (msg, client) => {
            if (msg.args.length < 1) {
                client.send(format_message_command, msg);
                return;
            }
            const person = msg.args[0];
            client.send(`@${person} ${format_message_command}`, msg);
        },
    });
    bot.RegisterHandler((msg, client) => {
        if (!config.plugin.code_check.includes(msg.info.contextId)) {
            removeTimeout(msg.info.id);
            return;
        }
        if (msg.info.rawContent.startsWith("<pre class='full'>")) {
            removeTimeout(msg.info.id);
            return;
        }
        if (
            !(
                msg.info.rawContent.startsWith("<div class='full'>") ||
                msg.info.rawContent.startsWith("<div class='partial'>")
            )
        ) {
            removeTimeout(msg.info.id);
            return;
        }
        if (msg.prefix && /^(\|\|>|>\|\||!!>)/.test(msg.prefix)) {
            removeTimeout(msg.info.id);
            return;
        }
        const text = bot.htmldecode(
            msg.info.rawContent.replace(/<br>/g, '\n').replace(/<.+>/g, '')
        );
        const lines = bot
            .htmldecode(text)
            .split('\n')
            .map((e) => e.trim());
        if (lines.length < 4) {
            removeTimeout(msg.info.id);
            return;
        }
        const responses: string[] = [];
        if (!lines.some((line) => /^}|^<\/|^]/.test(line))) {
            removeTimeout(msg.info.id);
            return;
        }
        responses.push(format_message);
        if (lines.length >= 10) {
            responses.push(
                'For posting large code blocks, use a paste site like like https://gist.github.com, http://hastebin.com, http://pastie.org or a demo site like https://jsbin.com/'
            );
        }
        needsResponse[msg.info.id] = setTimeout(() => {
            client.moveTo(msg, 23262);
        }, 25000);
        client.softReply(responses[0], msg).then((_) => {
            responses.slice(1).forEach((response) => {
                client.send(response, msg);
            });
        });
    });

    function removeTimeout(msgid: string) {
        if (needsResponse.hasOwnProperty(msgid)) {
            clearTimeout(needsResponse[msgid]);
            delete needsResponse[msgid];
        }
    }
};
export default unformattedCode;
