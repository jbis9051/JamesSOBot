const config = require('../../../config/config');

const {Bot} = require('../../bot.js');
const {Client} = require('./DiscordClient.js');

const plugins = config.plugins.map(plugin => require('../../plugins/' + plugin));


const bot = new Bot(plugins, "r15");

const aClient = new Client("general", bot);

aClient.on('ready', async () => {
     await aClient.send('I am alive!', aClient.mainRoom);
});

aClient.init();
