const {Message} = require("./src/Message");
const bot = require('./src/bot.js');
const {Client} = require('./src/Client.js');
const {ClientDebug} = require('./src/ClientDebug.js');

/*
bot.client = new ClientDebug(1,{
    login: false,
});
 */
bot.client = new Client(1);

bot.client.on('ready', async () => {
     bot.client.send('I am alive!');
});
bot.client.on('new-message', async msg => {
    msg = new Message(msg);
    if (!bot.validatorScriptRunner(msg)) {
        return;
    }
    bot.ListenerCheck(msg);
    if (bot.isMyMsg(msg)) {
        return;
    }
    if (!bot.validateMsg(msg)) {
        bot.client.send('This command conflicts with law #3');
        return;
    }
    if (!bot.isCommandMsg(msg)) { /* is a command */
        return;
    }
    if (!msg.command) {
        msg.reply('Invalid command! Try `help` for a list of available commands.' + ('‍'.repeat(Math.random() * 10))); /* there is probably a better way of doing this */
        return;
    }
    if (!await bot.permissionCheck(msg.command, msg)) {
        bot.client.send("Your are not authorized to administer this command");
        return;
    }
    try {
        await msg.command.func(msg);
    } catch (e) {
        console.error(e);
    }
});
require('./src/plugins/ban.js')(bot);

require('./src/plugins/default/help.js')(bot);
require('./src/plugins/default/selfDestruct.js')(bot);
require('./src/plugins/default/status.js')(bot);
require('./src/plugins/default/info.js')(bot);
require('./src/plugins/default/life.js')(bot);
require('./src/plugins/default/welcome.js')(bot);

require('./src/plugins/joke.js')(bot);
require('./src/plugins/mdn.js')(bot);
require('./src/plugins/wiki.js')(bot);
require('./src/plugins/funfact.js')(bot);
require('./src/plugins/kill.js')(bot);
require('./src/plugins/timer.js')(bot);
require('./src/plugins/rules.js')(bot);
require('./src/plugins/goodbye.js')(bot);
require('./src/plugins/random.js')(bot);
require('./src/plugins/youmessedup.js')(bot);
require('./src/plugins/applesupport.js')(bot);
require('./src/plugins/learn.js')(bot);

bot.client.init();
