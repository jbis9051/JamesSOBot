import { Bot, Client, DataSaver, Message } from '@chatbot/bot';
import * as path from 'path';
import WebSocket from 'ws';
import * as cheerio from 'cheerio';
import nodefetch from 'node-fetch';
import cookiefetch from 'fetch-cookie/node-fetch';
import * as events from 'events';
import { CookieJar } from 'tough-cookie';
import { ChatEvent } from './enum/ChatEvent';
import formEncoder from './helpers/formEncoder';

export class SOClient extends Client {
    private siteURL: string;

    private chatURL: string;

    roomNums: number[];

    private bot: Bot;

    private mainRoomNum: number;

    private cookieJar: any;

    private id = 0;

    private api_site_param?: string;

    private dataStore: DataSaver;

    private fkey?: string;

    private wsurl?: string;

    private ws?: WebSocket;

    private events = new events.EventEmitter();

    private jar: CookieJar;

    private fetch: (
        input: RequestInfo,
        init?: RequestInit
    ) => Promise<Response>;

    constructor(
        siteURL: string,
        chatURL: string,
        roomNums: number[],
        bot: Bot
    ) {
        super();
        if (!process.env.DATA_FOLDER) {
            throw new Error('Data folder required');
        }
        this.siteURL = siteURL;
        this.chatURL = chatURL;
        this.roomNums = roomNums;
        this.bot = bot;
        this.mainRoomNum = this.roomNums[0];
        this.dataStore = new DataSaver(
            path.join(process.env.DATA_FOLDER, 'so', 'so.json'),
            {}
        );
        try {
            this.jar = CookieJar.deserializeSync(
                this.dataStore.getData('cookieJar')
            );
        } catch (e) {
            this.jar = new CookieJar();
        }
        this.fetch = cookiefetch(nodefetch, this.jar);
        this.events.on(ChatEvent.NEW_MESSAGE.toString(), (e) =>
            this.bot.processMessage(this.createMessage(e), this)
        );
        this.events.on(ChatEvent.EDIT.toString(), (e) =>
            this.bot.processMessage(this.createMessage(e), this)
        );
    }

    async init() {
        await this.connect();
        setInterval(
            () => this.roomNums.forEach(this.joinRoom.bind(this)),
            21600000
        );
    }

    async connect() {
        await this.mainSiteLogin();
        await this.setUpWS();
        this.roomNums.slice(1).forEach(this.joinRoom.bind(this));
        await this.setChatVars();
    }

    async mainSiteLogin() {
        const resp = await this.fetch(`${this.siteURL}/users/login`, {
            method: 'GET',
        });
        if (new URL(resp.url).pathname === '/') {
            console.log('Already Logged in Yey!');
            return;
        }
        const body = await resp.text();
        const $ = cheerio.load(body);
        const fkey = $('input[name="fkey"]').val();
        await this.fetch(`${this.siteURL}/users/login`, {
            method: 'POST',
            body: formEncoder({
                fkey,
                email: process.env.SOEMAIL!,
                password: process.env.SOPASSWORD!,
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent':
                    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1.1 Safari/605.1.15',
            },
        });
        this.dataStore.setData('cookieJar', this.jar.serializeSync());
    }

    async setUpWS() {
        this.fkey = await this.getFKEY(this.mainRoomNum);
        this.wsurl = await this.getWSURL(this.mainRoomNum);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const ws = new WebSocket(`${this.wsurl}?l=99999999999`, null, {
            headers: {
                Origin: this.chatURL,
            },
        });
        ws.on('open', () => {
            console.log('WS open');
        });
        ws.on('message', (data: any) => {
            const json = JSON.parse(data);
            Object.keys(json).forEach((room) => {
                const roomInt = parseInt(room.substring(1), 10);
                if (!json[`r${roomInt}`].e) {
                    return;
                }
                if (!this.roomNums.includes(roomInt)) {
                    return;
                }
                json[`r${roomInt}`].e.forEach((event: any) => {
                    this.events.emit(event.event_type.toString(), event);
                });
            });
        });
        ws.on('close', () => {
            this.setUpWS();
        });
        ws.on('error', (err: string) => {
            console.error(err);
        });
        this.ws = ws;
    }

    async setChatVars() {
        // this.id = data.my_id;
        const resp = await this.fetch(`${this.siteURL}/users/current`, {
            method: 'GET',
        });
        const url = new URL(resp.url);
        this.id = parseInt(
            url.pathname.match(/(?<=\/users\/)[0-9]+(?=\/)/)![0],
            10
        );
        let sites = this.dataStore.getData('sites');
        if (!sites) {
            const resp2 = await this.fetch(
                'https://api.stackexchange.com/2.2/sites?pagesize=999999999',
                {
                    method: 'GET',
                    // gzip: true,
                }
            );
            sites = JSON.parse(await resp2.text());
            this.dataStore.setData('sites', sites);
        }
        const siteURLRegex = this.siteURL.replace(/http(s)?:\/\/(www\.)?/, '');
        this.api_site_param = sites.items.find(
            (site: { aliases?: string[]; site_url: string }) =>
                (site.aliases &&
                    site.aliases
                        .map((siteURL) =>
                            siteURL.replace(/http(s)?:\/\/(www\.)?/, '')
                        )
                        .includes(siteURLRegex)) ||
                site.site_url.replace(/http(s)?:\/\/(www\.)?/, '') ===
                    siteURLRegex
        ).api_site_parameter;
    }

    async getFKEY(roomNum: number) {
        const body = await this.fetch(
            `${this.chatURL}/rooms/${roomNum}`
        ).then((resp) => resp.text());
        const $ = cheerio.load(body);
        return $('#fkey').val();
    }

    async getWSURL(roomNum: number) {
        const resp = await this.fetch(`${this.chatURL}/ws-auth`, {
            method: 'POST',
            body: formEncoder({
                roomid: roomNum,
                fkey: this.fkey!,
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        const json = await resp.text();
        return JSON.parse(json).url;
    }

    async joinRoom(roomNum: number) {
        const wsurl = await this.getWSURL(roomNum);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const ws = new WebSocket(`${wsurl}?l=99999999999`, null, {
            headers: {
                Origin: this.chatURL,
            },
        });
        ws.on('open', () => {
            ws.close();
        });
    }

    private createMessage(e: any): Message {
        return new Message(
            {
                id: e.message_id,
                rawContent: e.content,
                content: this.bot.htmldecode(
                    this.bot.htmlToMarkdown(e.content)
                ),
                contextId: e.room_id.toString(),
                fromId: e.user_id.toString(),
                fromName: e.user_name,
                appData: e,
            },
            this,
            this.bot
        );
    }

    isMyMessage(msg: Message): boolean {
        return msg.info.fromId === this.id.toString();
    }

    async isRoomOwnerId(staticUID: string, context: Message): Promise<boolean> {
        return (await this.getRoomOwners(context.info.contextId)).some(
            (owner) => owner.id === staticUID
        );
    }

    send(content: string, context: string | Message): Promise<void> {
        const roomNum =
            typeof context === 'string' ? context : context.info.contextId;
        return new Promise((resolve) => {
            console.log(`Sending: ${content}`);
            this.fetch(`${this.chatURL}/chats/${roomNum}/messages/new`, {
                method: 'POST',
                body: formEncoder({
                    text: content,
                    fkey: this.fkey!,
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }).then(async (resp) => {
                const body = await resp.text();
                if (resp.status === 200) {
                    resolve(JSON.parse(body).id);
                }
                const delay = body.match(
                    /You can perform this action again in (\d+) seconds\./
                );
                if (delay) {
                    setTimeout(async () => {
                        resolve(await this.send(content, roomNum));
                    }, parseInt(delay[1], 10) * 1000 + 0.25);
                } else {
                    resolve();
                }
            });
        });
    }

    hardReply(content: string, context: string | Message): Promise<void> {
        const messageNum =
            typeof context === 'string'
                ? context
                : context.info.appData.message_id;
        return this.send(`:${messageNum} ${content}`, context);
    }

    softReply(content: string, context: string | Message): Promise<void> {
        const pingString =
            typeof context === 'string' ? context : this.getPingString(context);
        return this.send(`${pingString} ${content}`, context);
    }

    delete(msg: Message): Promise<void> {
        throw new Error('Method not implemented.');
    }

    edit(content: string, context: Message | string): Promise<void> {
        return new Promise((resolve) => {
            const messageNum =
                typeof context === 'string'
                    ? context
                    : context.info.appData.message_id;
            console.log(`Sending: ${content}`);
            this.fetch(`${this.chatURL}/messages/${messageNum}`, {
                method: 'POST',
                headers: {
                    //    referer: `${this.chatURL}/rooms/${context.info.contextId}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formEncoder({
                    text: content,
                    fkey: this.fkey!,
                }),
            }).then(async (resp) => {
                if (resp.status === 200) {
                    return;
                }
                const error = await resp.json();
                const delay = error.error.match(
                    /(?!You can perform this action again in )[0-9]+(?= second(s*)\.)/
                );
                if (delay) {
                    setTimeout(async () => {
                        resolve(await this.edit(content, context));
                    }, parseInt(delay, 10) * 1000 + 0.25);
                } else {
                    resolve();
                }
            });
        });
    }

    moveTo(message: Message, to: any): Promise<void> {
        return new Promise((resolve) => {
            this.fetch(
                `${this.chatURL}/admin/movePosts/${message.info.contextId}`,
                {
                    method: 'POST',
                    body: formEncoder({
                        ids: message.info.id,
                        to,
                        fkey: this.fkey!,
                    }),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            ).then(async (resp) => {
                if (resp.status === 200) {
                    return;
                }
                const body = await resp.json();
                const delay = body.error.match(
                    /(?!You can perform this action again in )[0-9]+(?= second(s*)\.)/
                );
                if (delay) {
                    setTimeout(async () => {
                        resolve(await this.moveTo(message, to));
                    }, parseInt(delay, 10) * 1000 + 0.25);
                } else {
                    resolve();
                }
            });
        });
    }

    async usernameToId(
        username: string,
        context: Message
    ): Promise<string | undefined> {
        const body = await this.fetch(
            `${this.chatURL}/rooms/pingable/${context.info.contextId}`
        ).then((resp) => resp.json());
        const array = body.filter(
            (a: string[]) =>
                a[1].toUpperCase() === username.replace('@', '').toUpperCase()
        );
        if (array.length === 0) {
            return undefined;
        }
        return array[0][0];
    }

    getPingString(msg: Message): string {
        return `@${msg.info.fromName.replace(/\s/g, '')}`;
    }

    /* Client Specific Methods */

    async stats(id: string, api_site_param = this.api_site_param!) {
        const resp = await this.fetch(
            `https://api.stackexchange.com/2.2/users/${id}?site=${api_site_param.trim()}`
        );
        const body = await resp.json();
        if (resp.status !== 200 || !body.items) {
            return false;
        }
        return body.items[0];
    }

    async chatIDToSiteID(id: number) {
        const body = await this.fetch(
            `${this.chatURL}/users/thumbs/${id}`
        ).then((resp) => resp.json());
        return body.profileUrl.match(/\d+/)[0];
    }

    async getNumMessagesFromId(id: string, roomNum: string) {
        const body = await this.fetch(
            `${this.chatURL}/users/${id}`
        ).then((resp) => resp.text());
        try {
            const $ = cheerio.load(body);
            return parseInt(
                $(`#room-${roomNum} .room-message-count`)
                    .attr('title')!
                    .match(/^\d+/)![0],
                10
            );
        } catch (e) {
            return false;
        }
    }

    async getRoomOwners(roomNum: string) {
        const body = await this.fetch(
            `${this.chatURL}/rooms/info/${roomNum}`
        ).then((resp) => resp.text());
        try {
            const $ = cheerio.load(body);
            return $('#room-ownercards')
                .find('div.usercard')
                .map((i, e) => ({
                    username: $(e).find('.user-header').attr('title'),
                    id: parseInt(
                        $(e).attr('id')!.replace('owner-user-', ''),
                        10
                    ),
                }))
                .get();
        } catch (e) {
            console.error(e);
            throw new Error('Error finding owners');
        }
    }
}
