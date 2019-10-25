const config = require('../../../config/config');
const fs = require('fs');
const Discord = require('discord.js');
const EventEmitter = require('events');
const cheerio = require('cheerio');
const path = require('path');
const request = require("request-promise");
const {Message} = require("../../events/Message");
const {ChatEvent} = require("../../events/ChatEvent");

/**
 * @class Client
 * @classdesc The Client. Handles everything from logging in to sending & receiving messages.
 * @property {Array} this.roomNum - The StackExchange rooms the Bot should connect to
 * @property {int} this._id
 * @property {String} this.fkey
 * @property {String} this.wsurl
 * @property {WebSocket} this.ws
 */
class Client extends EventEmitter {
    /**
     *
     * @param mainRoom
     * @param {Bot} bot
     */
    constructor(mainRoom, bot) {
        super();
        this.discordClient = new Discord.Client();
        this.bot = bot;
        this.mainRoomName = mainRoom;
        this.bot.processMessage = this.bot.processMessage.bind(this.bot);

        this.discordClient.on('ready', () => this._ready());
        this.discordClient.on('message', msg => this.emit(ChatEvent.NEW_MESSAGE, msg));

        this.on(ChatEvent.NEW_MESSAGE, e => this.bot.processMessage(new Message(this._toMsgObject(e), this)));
        this.on(ChatEvent.EDIT, e => this.bot.processMessage(new Message(this._toMsgObject(e), this)));
    }

    async init() {
        if (!fs.existsSync(path.join(__dirname, '..', 'data'))) {
            fs.mkdirSync(path.join(__dirname, '..', 'data'));
        }
        await this.discordClient.login(config.token);
    }

    _ready() {
        this._id = this.discordClient.user.id;
        this.mainRoom = this.discordClient.channels.find("name", this.mainRoomName);
        this.discordClient.user.setPresence({
            game: {
                name: `Selling Your Data`,
                type: 'Streaming',
                url: 'https://facebook.com'
            }
        });
        this.discordClient.user.setUsername("JamesBot");
        this.emit("ready")
    }

    _toMsgObject(msg) {
        return {
            "time_stamp": new Date(),
            "content": msg.content,
            "id": msg.id,
            "user_id": msg.author.id,
            "user_name": msg.author.username,
            "room_id": msg.channel,
            "room_name": msg.channel.name,
            "message_id": msg.id,
            raw: msg
        }
    }

    async send(msg, channel) {
        console.log("Sending: " + msg);
        if (typeof msg !== "string") {
            msg = JSON.stringify(msg);
        }
        channel.send(msg);
        this.emit('send', msg);
    }

    async reply(msg, content) {
        await this.send(content, msg.getContext())
    }

    async activeUsernameSearch(username, roomNum) {

    }

    async usernameSearch(query, limit = 50) {

    }

    async usernameToId(username, roomNum) {

    }

    async idToInfo(id, roomNum) {

    }

    async usernameToInfo(username, roomNum) {

    }

    getNumMessagesFromId(id, roomNum) {

    }

    async getNumMessages(username_or_id, roomNum) {
        if (typeof username_or_id === "number") {
            return await this.getNumMessagesFromId(username_or_id, roomNum);
        }
        return await this.getNumMessagesFromId(await this.usernameToId(username_or_id, roomNum), roomNum);

    }

    /**
     *
     * @param roomNum
     * @return {Promise<Array>}
     */
    getRoomOwners(roomNum) {

    }

    async isRoomOwnerUsername(username, roomNum) {

    }

    async isRoomOwnerId(id, roomNum) {

    }
}

module.exports = {Client};
