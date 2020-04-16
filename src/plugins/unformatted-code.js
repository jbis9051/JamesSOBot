const config = require('../../config/config');

const needsResponse = {};

const format_message = "Please don't post unformatted code - hit Ctrl+K before sending, use up-arrow to edit messages, and see the [faq](https://chat.stackoverflow.com/faq). You have 25 seconds to edit and format your message properly before it will be removed. Please separate code blocks from your actual question. Put your question in 1 message and then your code in a 2nd and format it.";
const format_message_command = "Please don't post unformatted code - hit Ctrl+K before sending, use up-arrow to edit messages, and see the [faq](https://chat.stackoverflow.com/faq). Put your question in 1 message and then your code in a 2nd and format it.";

module.exports = function (bot) {
    bot.addCommand({
        name: "formatting",
        args: ["person"],
        description: "Message about formatting to an optional person",
        shortcuts: [
            "formatting",
        ],
        examples: ["|| formatting @JBis", "|| formatting"],
        ignore: false,
        permissions: ["all"],
        func: (msg) => {
            if (msg.args.length < 1) {
                msg.roomContext.send(format_message_command);
                return;
            }
            const person = msg.args[0];
            msg.roomContext.send(`@${person} ${format_message_command}`);
        }
    });
    bot.RegisterListener({
        func: (msg) => {
            if (!config.code_check.includes(msg.getContext())) {
                removeTimeout(msg.messageId);
                return false;
            }
            if (msg.getRawContent().startsWith("<pre class='full'>")) {
                removeTimeout(msg.messageId);
                return false;
            }
            if (!(msg.getRawContent().startsWith("<div class='full'>") || msg.getRawContent().startsWith("<div class='partial'>"))) {
                removeTimeout(msg.messageId);
                return false;
            }
            if (/^(\|\|>|>\|\||!!>)/.test(msg.prefix)) {
                removeTimeout(msg.messageId);
                return false;
            }
            return true;
        },
        callback: (msg) => {
            const text = msg.getRawContent().replace(/<br>/g, "\n").replace(/<.+>/g, "").htmldecode();
            const lines = text.htmldecode().split("\n").map(e => e.trim());
            if (lines.length < 4) {
                removeTimeout(msg.messageId);
                return false;
            }
            let responses = [];
            if (!lines.some(line => /^}|^<\/|^]/.test(line))) {
                removeTimeout(msg.messageId);
                return;
            }
            responses.push(format_message);
            if (lines.length >= 10) {
                responses.push("For posting large code blocks, use a paste site like like https://gist.github.com, http://hastebin.com, http://pastie.org or a demo site like https://jsbin.com/");
            }
            needsResponse[msg.messageId] = setTimeout(() => {
                msg.moveTo(23262);
            }, 25000);
            msg.softReply(responses[0]).then(_ => {
                responses.slice(1).forEach(response => {
                    msg.roomContext.send(response);
                })
            });

        }
    });

    function removeTimeout(msgid) {
        if (needsResponse.hasOwnProperty(msgid)) {
            clearTimeout(needsResponse[msgid]);
            delete needsResponse[msgid];
        }
    }
};
