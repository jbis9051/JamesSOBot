const config = require('../../../config/config');

const {Bot} = require('../../bot.js');
const {Client} = require('./Client.js');

const bot = new Bot(config.plugins, "metadiscussion");

const aClient = new Client("bot", bot);

aClient.on('ready', async () => {
    // await aClient.send('I am alive!', aClient.mainRoom);
});

aClient.init();
