const config = require('../../config/config');

module.exports = function (bot) {
    bot.RegisterListener({
        func: (msg) => {
            if (!config.code_check.includes(msg.getContext())) {
                return false;
            }
            if (msg.getRawContent().startsWith("<pre class='full'>")) {
                return false;
            }
            if (!(msg.getRawContent().startsWith("<div class='full'>") || msg.getRawContent().startsWith("<div class='partial'>"))) {
                return false;
            }
            return true;
        },
        callback: (msg) => {
            const text = msg.getRawContent().replace(/<br>/g, "\n").replace(/<.+>/g, "").htmldecode();
            const lines = text.htmldecode().split("\n").map(e => e.trim());
            if (lines.length < 4) {
                return false;
            }
            let response = "";
            if (lines.some(line => /^\}|^<\//.test(line))) {
                response += "Please don't post unformatted code - hit Ctrl+K before sending, use up-arrow to edit messages, and see the [faq](https://chat.stackoverflow.com/faq).";
            }
            if (lines.length >= 10) {
                response += " For posting large code blocks, use a paste site like like https://gist.github.com, http://hastebin.com, http://pastie.org or a demo site like https://jsbin.com/";
            }
            if (response) {
                msg.replyDirect(response);
            }
        }
    });
};
