const config = require('../../../config/config');

const {Bot} = require('../../bot.js');
const {Client} = require('./StackExchangeClient.js');

const plugins = config.plugins.map(plugin => require('../../plugins/' + plugin));

const bot = new Bot(plugins, "stackoverflow");

const SOClient = new Client("https://stackoverflow.com", "https://chat.stackoverflow.com", [193540, /*1, 169987, 15, 17, 7*/], bot);

SOClient.on('ready', async () => {
    await SOClient.send('I am alive!', 193540);
});

SOClient.init();
