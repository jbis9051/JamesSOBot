const lang = require('../config/lang.json');
const request = require('request');
const config = require('../config/config.json');
const bot = {
    client: null,

    shutdown_scripts: [],
    commands: {},
    listeners: [],

    user_groups: config.users_groups,
    info: {
        start: new Date(),
        name: "James",
    },

    log: (str) => {
        console.log((new Date()).toString() + " - " + str);
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
    shutdown: (msg) => {
        bot.shutdown_scripts.forEach(async e => await e(msg));
        process.exit();
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
    channelSend: (chanName, str) => {
        if (!bot.client.channels.hasOwnProperty(chanName)) {
            console.error('Could not find channel named + ' + chanName);
            return;
        }
        bot.client.channels.find(chanName).send(str);
    },
    RegisterClientListener: (on, callback) => {
        bot.client.on(on, callback);
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
    }

};
module.exports = bot;
