const bot = require('./src/bot.js');
const Client = require('./src/Client.js');

(async ()=>{
    bot.client = await new Client(1).init();

    bot.client.on('ready', async () => {
        bot.client.send('I am alive!');
    });
    bot.client.on('new-message', msg => {
        msg.reply = (content) => bot.client.reply(msg,content);
        if(!bot.validatorScriptRunner(msg)){
            return;
        }
        bot.ListenerCheck(msg);
        if(bot.isMyMsg(msg)){
            return;
        }
        if(!bot.validateMsg(msg)){
            bot.client.send('This command conflicts with law #3');
            return;
        }
        if(!bot.isCommandMsg(msg)){ /* is a command */
            return;
        }
        const command = bot.format(msg);
        const actualCommand = bot.getCommand(command.args[0]);
        if(!actualCommand){
            bot.client.send('Invalid command! Try ` help` for a list of available commands.');
            return;
        }
        if(!bot.permissionCheck(actualCommand.name,msg)){
            bot.client.send("Your are not authorized to administer this command");
            return;
        }
        try {
            actualCommand.func(msg,command.args.slice(1),command.sudo);
        } catch (e) {
            console.error(e);
        }
    });

    require('./src/plugins/help.js')(bot);
    require('./src/plugins/joke.js')(bot);
    require('./src/plugins/mdn.js')(bot);
    require('./src/plugins/selfDestruct.js')(bot);
    require('./src/plugins/status.js')(bot);
    require('./src/plugins/wiki.js')(bot);
    require('./src/plugins/funfact.js')(bot);
    require('./src/plugins/kill.js')(bot);
    require('./src/plugins/timer.js')(bot);
    require('./src/plugins/rules.js')(bot);
    require('./src/plugins/goodbye.js')(bot);
    require('./src/plugins/random.js')(bot);
    require('./src/plugins/youmessedup.js')(bot);
    require('./src/plugins/life.js')(bot);

    await bot.client.connect();
})();
