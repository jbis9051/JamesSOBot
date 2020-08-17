import * as events from 'events';
import * as path from 'path';
import * as cheerio from 'cheerio';
import * as fse from 'fs-extra';
import {Command} from "./interfaces/Command";
import {PluginFunction} from "./interfaces/PluginFunction";
import {MessageHandler} from "./types/CallbackTypes";
import {Message} from "./models/Message";
import {Client} from './Client';
import {Config} from "./interfaces/Config";
import {PermissionType} from "./interfaces/Permission";

export class Bot extends events.EventEmitter {
    private readonly saveFolder: string;
    private shutdown_scripts: Array<MessageHandler> = [];
    commands: { [key: string]: Command } = {};
    private messageHandlers: MessageHandler[] = []
    private validatorScripts: Array<{ name: string, handler: MessageHandler<boolean> }> = []
    public info = {
        start: Date.now(),
        name: "James",
    };
    private config: Config;
    private readonly data: { [key: string]: any };
    private readonly saveFile: string;

    constructor(saveFolderName: string, config: Config) {
        super();
        this.saveFolder = path.join(__dirname, '..', '..', 'data', saveFolderName);
        this.saveFile = path.join(this.saveFolder, 'data.json');
        this.config = config;
        if (!fse.existsSync(this.saveFile)) {
            fse.writeFileSync(this.saveFile, "{}")
        }
        this.data = JSON.parse(fse.readFileSync(this.saveFile).toString());
    }

    addPlugin(plugin: PluginFunction) {
        plugin(this, this.config);
    }

    RegisterHandler(handler: MessageHandler) {
        this.messageHandlers.push(handler);
    }

    /**
     *  Adds a validator script to check
     */
    RegisterValidator(name: string, handler: MessageHandler<boolean>) {
        this.validatorScripts.push({name, handler});
    }

    /**
     *  Adds a script to be ran when the bot is shutdown
     */
    RegisterShutdownScript(handler: MessageHandler) {
        this.shutdown_scripts.push(handler);
    }

    getData(key: string) {
        return this.data[key];
    }

    setData(key: string, data: string | any) {
        this.data[key] = data;
        this.saveData();
    }

    saveData() {
        fse.writeFileSync(this.saveFile, JSON.stringify(this.data));
    }

    async processMessage(msg: Message, client: Client) {
        if (!this.validatorScripts.every(validatorScript => validatorScript.handler(msg, client))) {
            return;
        }
        this.messageHandlers.forEach(cb => cb(msg, client));
        if (client.isMyMessage(msg)) {
            return;
        }
        const command = this.getCommand(msg);
        if (!command) {
            this.emit("no-command", msg, client);
            return;
        }
        if (!await this.permissionCheck(client, command, msg)) {
            this.emit("not-authorized", msg, client);
            return;
        }
        try {
            command.cb(msg, client);
        } catch (e) {
            console.error(e);
        }
    }

    getCommand(msg: Message): Command | undefined {
        if (!msg.commandCall) {
            return;
        }
        const commandShortcutLowerCase = msg.commandCall.toLowerCase();
        return Object.values(this.commands).find((command) => command.shortcuts.some(shortcut => {
                if (typeof shortcut === "object" && shortcut instanceof RegExp) {
                    return shortcut.test(msg.commandCall!);
                }
                return shortcut === commandShortcutLowerCase;
            })
        );
    }


    addCommand(cmd: Command) {
        this.commands[cmd.name] = cmd;
    }

    deleteCommand(cmd: Command) {
        delete this.commands[cmd.name];
    }

    private async permissionCheck(client: Client, command: Command, msg: Message) {
        return (
            command.permissions.some(permissionsKey => {
                switch (permissionsKey) {
                    case PermissionType.ALL: {
                        return true;
                    }
                    case PermissionType.OWNER: {
                        return false;
                    }
                    default: {
                        return this.config.users_groups[permissionsKey].includes(msg.info.fromId);
                    }
                }
            })
            || (command.permissions.includes(PermissionType.OWNER) && await client.isRoomOwnerId(msg.info.fromId))
        )
    }

    async shutdown(msg: Message, client: Client) {
        try {
            await Promise.all(this.shutdown_scripts.map(e => e(msg, client)));
        } catch (e) {
            console.error(e);
            process.exit();
        }
        process.exit();
    }


    /**
     * Allows you to retrieve data from Google Search
     */
    async google_search(query: string, site: string | undefined, selector: ($: CheerioStatic) => string | undefined, selectorMatch: RegExp) {
        /* if anyone wants to pay for API keys, feel free */
        const url = 'https://www.google.com/search?q=' + encodeURIComponent(query) + ((site) ? "%20site:" + site : "");
        const body = await fetch(url, {
            headers: {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:10.0) Gecko/20100101 Firefox/12.0'}
        }).then(resp => resp.text());

        try {
            const $ = cheerio.load(body);
            let selected;
            let title;
            if (selector) {
                selected = selector($);
            } else {
                selected = $('.r > a').attr('href')?.replace(/\/url?.*&url=/, '');
                title = $('.r').find('.LC20lb').html();
            }
            if (!selected!.match(selectorMatch)) {
                console.error('Invalid Selector ' + selected);
                return false;
            }
            if (title) {
                return {url: selected, title: title};
            } else {
                return (selected);
            }
        } catch (e) {
            console.error(e);
            return false;
        }
    }
}
