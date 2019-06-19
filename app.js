const config = require('./config/config');

const {Bot} = require('./src/bot.js');
const {Client} = require('./src/Client.js');


const bot = new Bot(config.plugins, "stackoverflow");

const SOClient = new Client("https://stackoverflow.com", "https://chat.stackoverflow.com", [1], bot);

SOClient.on('ready', async () => {
    await SOClient.send('I am alive!', 193540);
});

SOClient.init();
