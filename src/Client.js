const EventEmitter = require('events');

class Client extends EventEmitter {
    async send(msg, context) {
    }

    async replyDirect(msg, content) {
    }

    async reply(msg, content) {
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
    }

    getRoomOwners(roomNum) {
    }

    async isRoomOwnerUsername(username, roomNum) {
    }

    async isRoomOwnerId(id, roomNum) {
    }
}

module.exports = Client;
