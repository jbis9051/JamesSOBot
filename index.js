module.exports = {
    Client: require('./src/Client.js'),
    Bot: require('./src/bot.js'),
    StackExchangeClient: require('./src/platform/StackExchange/StackExchangeClient.js'),
    DiscordClient: require('./src/platform/Discord/DiscordClient.js'),
    ChatEvent: require('./src/events/ChatEvent.js'),
    Message: require('./src/events/Message.js')
};
