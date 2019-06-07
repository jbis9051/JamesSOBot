const bot = require("./bot");

/**
 * @class Message
 * @classdesc Message Class used for all messages
 * @property {Object} this.data - the raw message data
 * @property {boolean} this.sudo - if this command was ran with sudo prefix
 * @property {String} this.prefix - the command prefix used to call this command
 * @property {String} this.commandCall - the command attempting to be called
 * @property {Object|boolean} this.command - the command object this message is calling or false if a command wasn't found
 */
class Message {
    /**
     *
     * @param {Object} data - raw message data
     */
    constructor(data) {
        this.data = data;
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
        this.command = bot.getCommand(this.commandCall);

        this.roomContext = {
            send: (...args) => bot.client.send(...args, this.getContext()),
            activeUsernameSearch: (...args) => bot.client.activeUsernameSearch(...args, this.getContext()),
            idToInfo: (...args) => bot.client.idToInfo(...args, this.getContext()),
            getNumMessagesFromId: (...args) => bot.client.getNumMessagesFromId(...args, this.getContext()),
            getRoomOwners: (...args) => bot.client.getRoomOwners(...args, this.getContext()),
            isRoomOwnerUsername: (...args) => bot.client.isRoomOwnerUsername(...args, this.getContext()),
            isRoomOwnerId: (...args) => bot.client.isRoomOwnerId(...args, this.getContext()),
            getNumMessages: (...args) => bot.client.getNumMessages(...args, this.getContext()),
            usernameToId: (...args) => bot.client.usernameToId(...args, this.getContext()),
            usernameToInfo: (...args) => bot.client.usernameToInfo(...args, this.getContext())
        }
    }

    /**
     * Reply's to `this` message with `content`
     *
     * @param {String} content
     */
    reply(content) {
        bot.client.reply(this, content)
    }

    /**
     * Returns a unique identifier for the user that sent this message. Usually a numerical string.
     *
     * @return {String} - The unique identifier
     */
    getStaticUserUID() {
        return this.data.user_id;
    }

    /**
     * Returns a possibly variable friendly username. This may change so DO NOT rely on it for authorization/authentication.
     *
     * @return {String} - The friendly username
     */
    getVariableUsername() {
        return this.data.user_name
    }

    /**
     * Returns the message's content
     *
     * @return {String} - message content
     */
    getContent() {
        return this.data.content.htmldecode();
    }

    /**
     * @return {int} - the room context
     */
    getContext() {
        return this.data["room_id"];
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
