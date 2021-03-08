import * as events from 'events';
import * as path from 'path';
import * as cheerio from 'cheerio';
import fetch from 'node-fetch';
import * as process from 'process';
import { Command } from './interfaces/Command';
import { PluginFunction } from './interfaces/PluginFunction';
import { MessageHandler } from './types/CallbackTypes';
import { Message } from './models/Message';
import { Client } from './Client';
import { Config } from './interfaces/Config';
import { PermissionType } from './interfaces/Permission';
import { DataSaver } from './DataSaver';
import { ClientFunction } from './interfaces/ClientFunction';

export class Bot extends events.EventEmitter {
    readonly saveFolder: string;

    private shutdown_scripts: Array<MessageHandler> = [];

    commands: { [key: string]: Command } = {};

    private messageHandlers: MessageHandler[] = [];

    private validatorScripts: Array<{
        name: string;
        handler: MessageHandler<boolean>;
    }> = [];

    public info = {
        start: Date.now(),
        name: 'James',
    };

    private config: Config;

    public readonly dataStore: DataSaver;

    private readonly saveFile: string;

    public readonly clientFunctions: ClientFunction<any>[] = [];

    constructor(saveFolderName: string, config: Config) {
        super();
        if (!process.env.DATA_FOLDER) {
            throw new Error('Data folder required');
        }
        this.saveFolder = path.join(process.env.DATA_FOLDER, saveFolderName);
        this.saveFile = path.join(this.saveFolder, 'data.json');
        this.config = config;
        this.dataStore = new DataSaver(this.saveFile, {});
    }

    addPlugin(...plugins: PluginFunction[]) {
        plugins.forEach((plugin) => plugin(this, this.config));
    }

    RegisterHandler(handler: MessageHandler) {
        this.messageHandlers.push(handler);
    }

    /**
     *  Adds a validator script to check
     */
    RegisterValidator(name: string, handler: MessageHandler<boolean>) {
        this.validatorScripts.push({ name, handler });
    }

    /**
     *  Adds a script to be ran when the bot is shutdown
     */
    RegisterShutdownScript(handler: MessageHandler) {
        this.shutdown_scripts.push(handler);
    }

    async processMessage(msg: Message, client: Client) {
        if (process.env.NODE_ENV === 'development') {
            // eslint-disable-next-line no-console
            console.log(`${msg.info.fromName}: ${msg.info.rawContent}`);
        }
        if (
            !this.validatorScripts.every((validatorScript) =>
                validatorScript.handler(msg, client)
            )
        ) {
            return;
        }
        this.messageHandlers.forEach((cb) => cb(msg, client));
        if (client.isMyMessage(msg)) {
            return;
        }
        if (!this.isCommandMessage(msg)) {
            return;
        }
        const command = this.getCommand(msg);
        if (!command) {
            this.emit('no-command', msg, client);
            return;
        }
        if (!(await this.permissionCheck(client, command, msg))) {
            this.emit('not-authorized', msg, client);
            return;
        }
        try {
            command.cb(msg, client);
        } catch (e) {
            console.error(e);
        }
    }

    isCommandMessage(msg: Message) {
        return (
            msg.prefix && msg.commandCall && ['||', '!!'].includes(msg.prefix)
        );
    }

    getCommand(msg: Message) {
        if (!msg.commandCall) {
            return undefined;
        }
        const commandShortcutLowerCase = msg.commandCall.toLowerCase();
        return Object.values(this.commands).find((command) =>
            command.shortcuts.some((shortcut) => {
                if (
                    typeof shortcut === 'object' &&
                    shortcut instanceof RegExp
                ) {
                    return shortcut.test(msg.commandCall!);
                }
                return shortcut === commandShortcutLowerCase;
            })
        );
    }

    getCommandFromText(text: string) {
        return Object.values(this.commands).find((command) =>
            command.shortcuts.some((shortcut) => {
                if (
                    typeof shortcut === 'object' &&
                    shortcut instanceof RegExp
                ) {
                    return shortcut.test(text);
                }
                return shortcut === text;
            })
        );
    }

    RegisterClientFunction<T extends Client>(func: ClientFunction<T>) {
        this.clientFunctions.push(func);
    }

    addCommand(cmd: Command) {
        this.commands[cmd.name] = cmd;
    }

    deleteCommand(cmd: Command) {
        delete this.commands[cmd.name];
    }

    async permissionCheck(client: Client, command: Command, msg: Message) {
        return (
            command.permissions.some((permissionsKey) => {
                switch (permissionsKey) {
                    case PermissionType.ALL: {
                        return true;
                    }
                    case PermissionType.OWNER: {
                        return false;
                    }
                    default: {
                        return this.inGroup(msg.info.fromId, permissionsKey);
                    }
                }
            }) ||
            (command.permissions.includes(PermissionType.OWNER) &&
                client.isRoomOwnerId(msg.info.fromId, msg))
        );
    }

    inGroup(id: string, group: string) {
        return this.config.users_groups[group].includes(id);
    }

    async shutdown(msg: Message, client: Client) {
        try {
            await Promise.all(this.shutdown_scripts.map((e) => e(msg, client)));
        } catch (e) {
            console.error(e);
            process.exit();
        }
        process.exit();
    }

    /**
     * Allows you to retrieve data from Google Search
     */
    async google_search(
        query: string,
        site: string | undefined,
        selector: (($: cheerio.Root) => string) | undefined,
        selectorMatch: RegExp
    ) {
        /* if anyone wants to pay for API keys, feel free */
        const url = `https://www.google.com/search?q=${encodeURIComponent(
            query
        )}${site ? `%20site:${site}` : ''}`;
        const body = await fetch(url, {
            headers: {
                'User-Agent':
                    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.16; rv:85.0) Gecko/20100101 Firefox/85.0',
            },
        }).then((resp) => resp.text());

        try {
            const $ = cheerio.load(body);
            let selected;
            let title;
            if (selector) {
                selected = selector($);
            } else {
                selected =
                    $('.yuRUbf a').attr('href') &&
                    $('.yuRUbf a')
                        .attr('href')!
                        .replace(/\/url?.*&url=/, '');
                title = $('.yuRUbf').find('.LC20lb span').html();
            }
            if (!(selected && selected.match(selectorMatch))) {
                console.error(`Invalid Selector ${selected}`);
                return false;
            }
            return {
                url: selected as string,
                title: title || (selected as string),
            };
        } catch (e) {
            console.error(e);
            return false;
        }
    }

    isJSON(str: string) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    htmldecode(str: string) {
        const translate_re = /&(nbsp|amp|quot|lt|gt);/g;
        const translate = {
            nbsp: ' ',
            amp: '&',
            quot: '"',
            lt: '<',
            gt: '>',
        };
        return str
            .replace(
                translate_re,
                (match, entity) => translate[entity as keyof typeof translate]
            )
            .replace(/&#(\d+);/gi, (match, numStr) => {
                const num = parseInt(numStr, 10);
                return String.fromCharCode(num);
            });
    }

    /* adapted from https://github.com/Zirak/SO-ChatBot/blob/d1fa258912a03931bd069406242fcd18721810dd/source/IO.js#L110 */
    htmlToMarkdown(str: string) {
        const htmlRe = /<(\S+)[^>]*>([^<]+)<\/\1>/g;
        const tags_to_markdown = {
            i: '*',
            b: '**',
            strike: '---',
            code: '`',
            a(entire_string: string, tag: string, innerText: string) {
                const href = /href="([^"]+?)"/.exec(entire_string);
                if (!href) {
                    return entire_string;
                }
                return `[${innerText}](${href[1]})`;
            },
        };

        // A string value is the delimiter (what replaces the tag)
        let delim;
        return str.replace(
            htmlRe,
            (entire_string: string, tag: string, innerText: string) => {
                if (!tags_to_markdown.hasOwnProperty(tag)) {
                    return entire_string;
                }
                delim = tags_to_markdown[tag as keyof typeof tags_to_markdown];
                if (typeof delim === 'function') {
                    return delim.apply(tags_to_markdown, [
                        entire_string,
                        tag,
                        innerText,
                    ]);
                }
                return delim + innerText + delim;
            }
        );
    }
}
