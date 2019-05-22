const bot = require("./bot");

module.exports =  class Message {
    constructor(data) {
        this.data = data;
        const msgSplit = this.getContent().split(" ");
        if (msgSplit[1] === "sudo") {
            this.sudo = true;
            this.prefix = msgSplit.shift();
            msgSplit.shift();
            this.commandCall = msgSplit.shift();
            this.args = msgSplit;
        } else {
            this.sudo = false;
            this.prefix = msgSplit.shift();
            this.commandCall = msgSplit.shift();
            this.args = msgSplit;
        }
        this.command = bot.getCommand(this.commandCall);
    }

    reply(content) {
        bot.client.reply(this, content)
    }

    getStaticUserUID() {
        return this.data.user_id;
    }

    getVaribleUsername() {
        return this.data.user_name
    }

    getContent() {
        return this.data.content
    }


    /* The below was stolen directly from https://github.com/Zirak/SO-ChatBot/blob/master/master.js. I made a couple edits*/

    // receives a url and text to display, returns a recognizable link
    static link(text, url) {
        return `[${this.escape(text)}](${url})`;
    }

    // escape characters meaningful to the chat, such as parentheses
    // full list of escaped characters: `*_()[]
    static escape(msg) {
        return msg.replace(/([`\*_\(\)\[\]])/g, '\\$1');
    }

    // receives text and turns it into a codified version
    // codified is ambiguous for a simple reason: it means nicely-aligned and
    // mono-spaced. in SO chat, it handles it for us nicely; in others, more
    // clever methods may need to be taken
    static codify(content) {
        let tab = '    ',
            spacified = content.replace('\t', tab),
            lines = spacified.split(/[\r\n]/g);

        if (lines.length === 1) {
            return '`' + lines[0] + '`';
        }

        return lines.map(function (line) {
            return tab + line;
        }).join('\n');
    }
}
