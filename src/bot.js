const lang = require('../config/lang.json');
const request = require('request');
const config = require('../config/config.json');
const cheerio = require('cheerio');

const bot = {
    client: null,

    shutdown_scripts: [],
    commands: {},
    listeners: [],

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
        const cmdNamLower = cmdName.toLowerCase();
        for (const cmd of Object.keys(bot.commands)) {
            if (bot.commands[cmd].shortcuts.includes(cmdNamLower)) {
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
        return bot.isCommand(msg.content)
    },
    permissionCheck: (commandName, msg) => {
        if (bot.getCommand(commandName).permissions[0] === "all") {
            return true
        }
        for (let permissionsKey of bot.getCommand(commandName).permissions) {
            if (config.users_groups[permissionsKey].includes(msg.user_name.toLowerCase())) {
                return true;
            }
        }
        return false;
    },
    format: (msg) => {
        const msgSplit = msg.content.split(" ");
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
    validateMsg: (str) => {
        return true;
    },



    RegisterListener: (listener) => {
        if (!listener.func || !listener.callback) {
            console.error("Invalid Listener");
            return;
        }
        bot.listeners.push(listener);
    },
    ListenerCheck: (msg) => {
        bot.listeners.forEach((value, index) => {
            if (value.func(msg)) {
                value.callback(msg);
            }
        });
    },
    RegisterClientListener: (on, callback) => {
        bot.client.on(on, callback);
    },
    addShutdownScript: (script) => {
        bot.shutdown_scripts.push(script);
    },
    json_request: async (url, callback) => {
        await request(url, {json: true}, callback)
    },
    standard_request: async (url, callback) => {
        await request(url, callback);
    },
    google_search: async (query, site, selector,selectorMatch,callback) => {
        /* if anyone wants to pay for API keys, feel free */
        const url = 'https://www.google.com/search?q=' + encodeURIComponent(query) + ((site) ? "%20site:" + site : "");
        bot.standard_request(url, (err, res, body) => {
            try {
                const $ = cheerio.load(body);
                let selected;
                if (selector){
                    selected = selector($);
                }  else {
                    selected = $('.r').find('a').attr('href').replace('/url?q=', '').replace(/&sa=.*/, '');
                }
                if(!selected.match(selectorMatch)){
                    console.error('Invalid Selector ' + selected);
                    callback(false);
                }
                callback(selected);
            } catch (e) {
                console.error(e);
                callback(false);
            }
        });
    }

};
module.exports = bot;
