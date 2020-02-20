const Events = require('events');
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const lang = require('../config/lang.json');
const config = require('../config/config.json');

const {Message} = require("./events/Message");
const {ChatEvent} = require('./events/ChatEvent.js');

class Bot extends Events.EventEmitter {
    constructor(plugins, saveFolderName) {
        super();
        this.saveFolder = path.join(__dirname, '..', 'data', saveFolderName);
        if (!fs.existsSync(this.saveFolder)) {
            fs.mkdirSync(this.saveFolder);
        }
        this.shutdown_scripts = [];
        this.commands = {};
        this.listeners = [];
        this.validatorScripts = [];
        this.customClientListners = [];
        this.info = {
            start: Date.now(),
            name: "James",
        };
        plugins.forEach(plugin => plugin(this));
    }

    async processMessage(msg) {
        console.log(msg.getContext() + " - " + msg.getVariableUsername() + " - " + msg.getContent());
        if (!this.validatorScriptRunner(msg)) {
            return;
        }
        this.ListenerCheck(msg);
        if (msg.isMyEvent()) {
            return;
        }
        if (!this.validateMsg(msg)) {
            this.emit("invalid-message", msg);
            return;
        }
        if (!this.isCommandMsg(msg)) { /* is a command */
            return;
        }
        if (!msg.command) {
            this.emit("no-command", msg);
            return;
        }
        if (!await this.permissionCheck(msg.command, msg)) {
            this.emit("not-authorized", msg);
            return;
        }
        try {
            msg.command.func(msg);
        } catch (e) {
            this.error(e);
        }
    }

    /**
     * Logs messages
     *
     * @param {String} str
     */
    log(str) {
        console.log((new Date()).toString() + " - " + str);
    }

    /**
     * Logs Errors
     *
     * @param {String} str
     */
    error(str) {
        console.error((new Date()).toString() + " - " + str);
    }

    /**
     * A function that is to be including in a command
     *
     * @param {Message} msg - The Message used to activate the command
     * @callback CommandFunction
     */
    /**
     *
     * @param {Object} cmd - Command to add
     * @param {String} cmd.name - The name of the command. NOT used to identify a command is being called from a Message (If the name is "test", that doesn't mean that a message calling the command "test" will actually activate this command. If you wan't "test" to call this command, add it to the `shortcuts` array.)
     * @param {String} cmd.description - A description of the command.
     * @param {Array} cmd.args - A description of the args this command accepts. Only used for descriptive purposes.
     * @param {Array<String|RegExp>} cmd.shortcuts - Keywords that activate this command. If the Message's commandCall matches any of these shortcuts, this command will be activated.
     * @param {Boolean} cmd.ignore - Should this command be hidden from the help menu?
     * @param {Array} cmd.permissions - Array of groups allowed to use this command. Each entry should line up to group in `config.json["users_groups"]`.
     * @param {Array} cmd.examples - Example commands. Only used for descriptive purposes.
     * @param {CommandFunction} cmd.func - The function to call when the command is activated
     */
    addCommand(cmd) {
        if (!cmd.func || !cmd.name) {
            console.error("Invalid command");
            return;
        }
        this.commands[cmd.name] = cmd;
    }

    deleteCommand(cmd) {
        delete this.commands[cmd.name];
    }

    /**
     * Searches for a command based on command shortcuts
     *
     * @param {String|RegExp} cmdShortcut - shortcut of the command to search for
     * @return {boolean|Object} - the command found, or false if none was found
     */
    getCommand(cmdShortcut) {
        if (!cmdShortcut) {
            return false;
        }
        const commandShortcutLowerCase = cmdShortcut.toLowerCase();
        for (const cmd of Object.keys(this.commands)) {
            if (this.commands[cmd].shortcuts.some(
                (shortcut) => {
                    if (typeof shortcut === "object" && shortcut instanceof RegExp) {
                        return shortcut.test(cmdShortcut);
                    }
                    return shortcut === commandShortcutLowerCase;
                }
            )
            ) {
                return this.commands[cmd];
            }
        }
        return false;
    }

    /**
     * Searches for a command based on command name
     *
     * @param cmdName - Name of the command to search for
     * @return {boolean|Object} - the command found, or false if none was found
     */
    getCommandFromName(cmdName) {
        for (const cmd of Object.keys(this.commands)) {
            if (this.commands[cmd].name === cmdName) {
                return this.commands[cmd];
            }
        }
        return false;
    }

    /**
     * Returns whether a command under a name exists
     *
     * @param cmdName - command name to search for
     * @return {boolean} - if the command exists
     */
    commandExists(cmdName) {
        return this.commands.hasOwnProperty(cmdName);
    }

    /**
     * Shuts down the command after attempting to call shutdown scripts
     *
     * @param {Message} msg
     */
    async shutdown(msg) {
        try {
            await Promise.all(this.shutdown_scripts.map(async e => await e(msg)));
        } catch (e) {
            console.error(e);
            process.exit();
        }
        process.exit();
    }

    /**
     * Returns whether a space delimited string contains a command prefix
     *
     * @param {String} str - string to check
     * @return {Boolean}
     */
    isCommand(str) {
        return this.isCommandPrefix(str.split(" ")[0].toLowerCase());
    }

    /**
     * Returns whether a string is a command prefix defined in `lang.json.prefix` array
     *
     * @param {String} str - string to check
     * @return {Boolean}
     */
    isCommandPrefix(str) {
        return lang.cmd.prefix.includes(str);
    }

    /**
     * Returns whether a message contains a command prefix
     *
     * @param {Message} msg - Message to check
     * @return {Boolean}
     */
    isCommandMsg(msg) {
        return this.isCommand(msg.getContent())
    }

    /**
     * Returns whether a Message object's sender has sufficient privileges to activate the `command`
     *
     * @param command
     * @param {Message} msg
     * @return {boolean}
     */
    async permissionCheck(command, msg) {
        return (
            command.permissions.some(permissionsKey => {
                switch (permissionsKey) {
                    case "all": {
                        return true;
                    }
                    case "OWNER": {
                        return false;
                    }
                    default: {
                        return config.users_groups[permissionsKey].includes(msg.getStaticUserUID());
                    }
                }
            })
            || (command.permissions.includes("OWNER") && await msg.roomContext.isRoomOwnerId(msg.getStaticUserUID()))
        )
    }

    isAdmin(id) {
        return config.users_groups["admin"].includes(id);
    }

    /**
     * @deprecated
     *
     * @param msg
     * @return {{args: string[], prefix: string, sudo: boolean}}
     */
    format(msg) {
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
    }

    validateMsg(msg) {
        return true;
    }

    /**
     * Runs validator scripts and returns true if all return true, other wise false
     *
     * @param {Message} msg - Message to pass to validation scripts
     * @return {boolean} - If the Message is valid
     */
    validatorScriptRunner(msg) {
        for (let script of this.validatorScripts) {
            if (!script.func(msg)) {
                this.log("Validator Failed: " + script.name);
                return false;
            }
        }
        return true;
    }

    /**
     * Checks if listeners need to be ran and runs them if so
     *
     * @param {Message} msg - Message to pass to listeners
     */
    ListenerCheck(msg) {
        this.listeners.forEach((value, index) => {
            if (value.func(msg)) {
                value.callback(msg);
            }
        });
    }

    /**
     * Callback for ListenerFunction to check if callback needs to be run
     *
     * @callback shouldRun
     * @param {Message} msg - the msg to check
     * @return boolean
     */

    /**
     * Callback for ListenerFunction that will be ran if shouldRun is true
     *
     * @callback listenerFunction
     * @param {Message} msg - the msg to check
     */

    /**
     * Register a msg listener. This bypasses the command checks and allows direct access to the `new-message` event. The only check ran are the validator scripts. This means it is your job to make sure the message is not from the bot itself.
     *
     * @param {Object} listener
     * @param {shouldRun} listener.func
     * @param {listenerFunction} listener.callback
     */
    RegisterListener(listener) {
        if (!listener.func || !listener.callback) {
            console.error("Invalid Listener");
            return;
        }
        this.listeners.push(listener);
    }

    /**
     * Gives direct access to Client events. This is very low-level and is not needed in most cases.
     *
     * @borrows NodeJS#EventEmitter#on
     */
    RegisterClientListener(on, callback) {
        this.customClientListners.push({
            on: on,
            callback: callback,
        });
    }

    /**
     * Callback for validator function.
     *
     * @callback validatorCallback
     * @param {Message} msg - msg to validate
     * @return boolean - if the `msg` was valid. The `msg` will not be processed by anything if this is false
     */
    /**
     * Adds a validator script to check
     *
     * @param {String} name - Name of your validator script for logging purposes
     * @param {validatorCallback} func
     */
    addValidatorScript(name, func) {
        this.validatorScripts.push({name: name, func: func});
    }

    /**
     * Callback for shutdown script.
     *
     * @callback shutdownScript
     * @param {Message} msg - msg that caused the bot to shut down
     */
    /**
     * Adds a script to be ran when the bot is shutdown
     *
     * @param {shutdownScript} script - script to run
     */
    addShutdownScript(script) {
        this.shutdown_scripts.push(script);
    }

    /**
     * @callback RequestCallback
     * @borrows request
     */
    /**
     * Retrieve JSON data from `url` and passes it to the `callback`
     *
     * @param {String} url - URL to request
     * @param {RequestCallback} callback - callback to pass
     * @return {Promise<void>}
     */
    async json_request(url, callback) {
        await request(url, {json: true,}, callback)
    }

    /**
     * Retrieves data from URL and passes it to the `callback`. If you need JSON than use the `json_request` function
     *
     * @param {String} url - URL to request
     * @param {RequestCallback} callback
     * @return {Promise<void>}
     */
    async standard_request(url, callback) {
        await request({
            url,
            headers: {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:10.0) Gecko/20100101 Firefox/12.0'}
        }, callback);
    }

    /**
     * Selects data from HTML using the cheerio API
     *
     * @param {cheerio} body - Cheerio selector
     * @callback SelectorFunction
     */

    /**
     * Callback for selected Google Search content
     *
     * @param {String|boolean|Object} selected - Your chosen selection or false if an error occurred
     * @param {String} selected.url - URL returned from default selection
     * @param {String} selected.title - Page `<title>` returned from default selection
     * @callback GoogleCallback
     */
    /**
     * Allows you to retrieve data from Google Search
     *
     * @param {String} query - Google Search Query
     * @param {String} [site] - domain (`example.com`) of site you would like to limit Google Search to
     * @param {SelectorFunction} [selector]
     * @param {RegExp} selectorMatch - Sometimes limiting to a site using Google Search Hacks, so we provide a way to check if the selected content matches what you really want. This is most useful for URL checking.
     * @param {GoogleCallback} callback
     * @return {Promise<void>}
     */
    async google_search(query, site, selector, selectorMatch, callback) {
        /* if anyone wants to pay for API keys, feel free */
        const url = 'https://www.google.com/search?q=' + encodeURIComponent(query) + ((site) ? "%20site:" + site : "");
        this.standard_request(url, (err, res, body) => {
            try {
                const $ = cheerio.load(body);
                let selected;
                let title;
                if (selector) {
                    selected = selector($);
                } else {
                    selected = $('.r > a').attr('href').replace(/\/url?.*&url=/, '');
                    title = $('.r').find('.LC20lb').html();
                }
                if (!selected.match(selectorMatch)) {
                    console.error('Invalid Selector ' + selected);
                    callback(false);
                    return;
                }
                if (title) {
                    callback({url: selected, title: title});
                } else {
                    callback(selected);
                }
            } catch (e) {
                console.error(e);
                callback(false);
            }
        });
    }

    saveData(name, data) {
        if (typeof data !== "string") {
            data = JSON.stringify(data);
        }
        fs.writeFileSync(path.join(this.saveFolder, name), data);
    }

    loadData(name) {
        if (!fs.existsSync(path.join(this.saveFolder, name))) {
            return false;
        }
        const data = fs.readFileSync(path.join(this.saveFolder, name)).toString();
        return data.isJSON() ? JSON.parse(data) : data;
    }

    saveGlobalData(name, data) {
        if (typeof data !== "string") {
            data = JSON.stringify(data);
        }
        fs.writeFileSync(path.join(__dirname, '..', 'data', name), data);
    }

    loadGlobalData(name) {
        if (!fs.existsSync(path.join(__dirname, '..', 'data', name))) {
            return false;
        }
        const data = fs.readFileSync(path.join(__dirname, '..', 'data', name)).toString();
        return data.isJSON() ? JSON.parse(data) : data;
    }
}

module.exports = {Bot};
