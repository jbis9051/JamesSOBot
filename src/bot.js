const lang = require('../config/lang.json');
const request = require('request');
const config = require('../config/config.json');
const cheerio = require('cheerio');

const bot = {
    client: null,

    shutdown_scripts: [],
    commands: {},
    listeners: [],
    validatorScripts: [],


    user_groups: config.users_groups,
    info: {
        start: Date.now(),
        name: "James",
    },

    log: (str) => {
        console.log((new Date()).toString() + " - " + str);
    },
    error: (str) => {
        console.error((new Date()).toString() + " - " + str);
    },
    addCommand: (cmd) => {
        if (!cmd.func || !cmd.name) {
            console.error("Invalid command");
            return;
        }
        bot.commands[cmd.name] = cmd;
    },
    getCommand: (cmdName) => {
        if(!cmdName){
            return false;
        }
        const cmdNamLower = cmdName.toLowerCase();
        for (const cmd of Object.keys(bot.commands)) {
            if (bot.commands[cmd].shortcuts.includes(cmdNamLower)) {
                return bot.commands[cmd];
            }
        }
        return false;
    },
    getCommandFromName: (cmdName) => {
        for (const cmd of Object.keys(bot.commands)) {
            if (bot.commands[cmd].name === cmdName) {
                return bot.commands[cmd];
            }
        }
        return false;
    },
    commandExists: (cmdName) => {
        return bot.commands.hasOwnProperty(cmdName);
    },
    shutdown: (msg) => {
        bot.shutdown_scripts.forEach(async e => await e(msg));
        process.exit();
    },
    isCommand: (str) => {
        return bot.isCommandPrefix(str.split(" ")[0].toLowerCase());
    },
    isCommandPrefix: (str) => {
        return lang.cmd.prefix.includes(str);
    },
    isCommandMsg: (msg) => {
        return bot.isCommand(msg.getContent())
    },
    permissionCheck: (command, msg) => {
        if (command.permissions[0] === "all") {
            return true;
        }
        for (let permissionsKey of command.permissions) {
            if (config.users_groups[permissionsKey].includes(msg.getVaribleUsername().toLowerCase())) {
                return true;
            }
        }
        return false;
    },
    format: (msg) => {
        const msgSplit = msg.getContent().split(" ");
        if (msgSplit[1] === "sudo") {
            const prefix = msgSplit.shift();
            msgSplit.shift();
            return {
                sudo: true,
                prefix: prefix,
                args: msgSplit,
            }
        } else {
            return {
                sudo: false,
                prefix: msgSplit.shift(),
                args: msgSplit,
            }
        }
    },
    isMyMsg(msg) {
      return msg.getStaticUserUID() === bot.client._id
    },
    validateMsg: (msg) => {
        return true;
    },
    validatorScriptRunner:(msg)=>{
       for(let script of bot.validatorScripts){
           if(!script.func(msg)){
               bot.log("Validator Failed: " + script.name);
               return false;
           }
       }
       return true;
    },
    ListenerCheck: (msg) => {
        bot.listeners.forEach((value, index) => {
            if (value.func(msg)) {
                value.callback(msg);
            }
        });
    },



    RegisterListener: (listener) => {
        if (!listener.func || !listener.callback) {
            console.error("Invalid Listener");
            return;
        }
        bot.listeners.push(listener);
    },
    RegisterClientListener: (on, callback) => {
        bot.client.on(on, callback);
    },
    addValidatorScript:(name,func) =>{
      bot.validatorScripts.push({name: name, func: func});
    },
    addShutdownScript: (script) => {
        bot.shutdown_scripts.push(script);
    },
    json_request: async (url, callback) => {
        await request(url, {json: true}, callback)
    },
    standard_request: async (url, callback) => {
        await request({url, headers: {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36'}}, callback);
    },
    google_search: async (query, site, selector,selectorMatch,callback) => {
        /* if anyone wants to pay for API keys, feel free */
        const url = 'https://www.google.com/search?q=' + encodeURIComponent(query) + ((site) ? "%20site:" + site : "");
        bot.standard_request(url, (err, res, body) => {
            try {
                const $ = cheerio.load(body);
                let selected;
                let title;
                if (selector){
                    selected = selector($);
                }  else {
                    selected = $('.r').find('a').attr('href').replace('/url?q=', '').replace(/&sa=.*/, '');
                    title = $('.r').find('.LC20lb').html();
                }
                if(!selected.match(selectorMatch)){
                    console.error('Invalid Selector ' + selected);
                    callback(false);
                }
                if(title){
                    callback({url: selected, title: title});
                } else {
                    callback(selected);
                }
            } catch (e) {
                console.error(e);
                callback(false);
            }
        });
    },
};
module.exports = bot;
