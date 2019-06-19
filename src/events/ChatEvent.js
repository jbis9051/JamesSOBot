class ChatEvent {
    constructor(data, client) {
        this.client = client;
        this.data = data;
        this.id = data.id;
        this.type = data["event_type"];
    }

    /**
     * Checks whether a Message object author is the bot
     *
     * @return {boolean}
     */
    isMyEvent() {
        return this.getStaticUserUID() === this.client._id
    }

    /**
     * @return {int} - the room context
     */
    getContext() {
        return this.data["room_id"];
    }

    /**
     * @return {int} - the room context
     */
    getContextName() {
        return this.data["room_name"];
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
}

ChatEvent.NEW_MESSAGE = 1;
ChatEvent.EDIT = 2;
ChatEvent.USER_JOIN = 3;
ChatEvent.USER_LEAVE = 4;
ChatEvent.ROOM_INFO_CHANGE = 5;
ChatEvent.STAR_CHANGE = 6;
ChatEvent.DEBUG = 7;
ChatEvent.MENTIONED = 8;
ChatEvent.FLAGGED = 9;
ChatEvent.MESSAGE_DELETED = 10;
ChatEvent.FILE_ADDED = 11;
ChatEvent.MOD_FLAG = 12;
ChatEvent.USER_IGNORE_CHANGE = 13;
ChatEvent.NOTIFICATION = 14;
ChatEvent.USER_ACCESS_CHANGE = 15;
ChatEvent.USER_NOTIFICATION = 16;
ChatEvent.ROOM_INVITE = 17;
ChatEvent.DIRECT_REPLY = 18;
ChatEvent.MESSAGE_MOVED_OUT = 19;
ChatEvent.MESSAGE_MOVED_IN = 20;
ChatEvent.TIME_BREAK = 21;
ChatEvent.NEW_FEED_ITEM = 22;
ChatEvent.USER_SUSPENDED = 29;
ChatEvent.MERGE = 30;
ChatEvent.USER_INFO_CHANGE = 34;


module.exports = {ChatEvent};
