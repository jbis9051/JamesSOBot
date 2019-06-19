const {ChatEvent} = require("./ChatEvent");

require('../utils');

/**
 * @class Message
 * @classdesc Message Class used for all messages
 * @property {Object} this.data - the raw message data
 * @property {boolean} this.sudo - if this command was ran with sudo prefix
 * @property {String} this.prefix - the command prefix used to call this command
 * @property {String} this.commandCall - the command attempting to be called
 * @property {Object|boolean} this.command - the command object this message is calling or false if a command wasn't found
 */
class Message extends ChatEvent {
    /**
     *
     * @param {Object} data - raw message data
     * @param {Client} client - client that the message came from
     */
    constructor(data, client) {
        super(data, client);
        this.client = client;
        const msgSplit = this.getContent().split(" ");
        this.prefix = msgSplit.shift();
        if (msgSplit[0] === "sudo") {
            this.sudo = true;
            msgSplit.shift();
        } else {
            this.sudo = false;
        }
        this.commandCall = msgSplit.shift();
        this.args = msgSplit;
        this.command = this.client.bot.getCommand(this.commandCall);

        this.roomContext = {
            send: (...args) => this.client.send(...args, this.getContext()),
            activeUsernameSearch: (...args) => this.client.activeUsernameSearch(...args, this.getContext()),
            idToInfo: (...args) => this.client.idToInfo(...args, this.getContext()),
            getNumMessagesFromId: (...args) => this.client.getNumMessagesFromId(...args, this.getContext()),
            getRoomOwners: (...args) => this.client.getRoomOwners(...args, this.getContext()),
            isRoomOwnerUsername: (...args) => this.client.isRoomOwnerUsername(...args, this.getContext()),
            isRoomOwnerId: (...args) => this.client.isRoomOwnerId(...args, this.getContext()),
            getNumMessages: (...args) => this.client.getNumMessages(...args, this.getContext()),
            usernameToId: (...args) => this.client.usernameToId(...args, this.getContext()),
            usernameToInfo: (...args) => this.client.usernameToInfo(...args, this.getContext())
        };

    }


    /**
     * Reply's to `this` message with `content`
     *
     * @param {String} content
     */
    reply(content) {
        this.client.reply(this, content)
    }

    /**
     * Returns the message's content
     *
     * @return {String} - message content
     */
    getContent() {
        return this.data.content.htmldecode();
    }

    /* The below was stolen directly from https://github.com/Zirak/SO-ChatBot/blob/master/master.js. I made a couple edits*/

    /**
     *  Receives a url and text to display, returns a recognizable link
     *
     * @param {String} text
     * @param {String} url
     */
    static link(text, url) {
        return `[${this.escape(text)}](${url})`;
    }

    /**
     * Escape characters meaningful to the chat, such as parentheses full list of escaped characters: `*_()[]
     *
     * @param {String} content - content to escape
     * @return {String} - the escaped string
     */
    static escape(content) {
        return content.replace(/([`\*_\(\)\[\]])/g, '\\$1');
    }

    /**
     * Receives text and turns it into a codified version codified is ambiguous for a simple reason: it means nicely-aligned and mono-spaced. in SO chat, it handles it for us nicely; in others, more clever methods may need to be taken
     *
     * @param {String} content
     */
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
module.exports = {Message};
