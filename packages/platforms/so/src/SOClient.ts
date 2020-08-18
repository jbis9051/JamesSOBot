import {Bot, Client, Message} from '@chatbot/bot';
import * as path from 'path';
import * as fs from 'fs-extra';
import * as WebSocket from 'ws';
import * as cheerio from 'cheerio';
import * as request from 'request-promise';
import * as FileCookieStore from 'tough-cookie-filestore';

enum ChatEvent {
    NEW_MESSAGE = 1,
    EDIT = 2,
    USER_JOIN = 3,
    USER_LEAVE = 4,
    ROOM_INFO_CHANGE = 5,
    STAR_CHANGE = 6,
    DEBUG = 7,
    MENTIONED = 8,
    FLAGGED = 9,
    MESSAGE_DELETED = 10,
    FILE_ADDED = 11,
    MOD_FLAG = 12,
    USER_IGNORE_CHANGE = 13,
    NOTIFICATION = 14,
    USER_ACCESS_CHANGE = 15,
    USER_NOTIFICATION = 16,
    ROOM_INVITE = 17,
    DIRECT_REPLY = 18,
    MESSAGE_MOVED_OUT = 19,
    MESSAGE_MOVED_IN = 20,
    TIME_BREAK = 21,
    NEW_FEED_ITEM = 22,
    USER_SUSPENDED = 29,
    MERGE = 30,
    USER_INFO_CHANGE = 34,
}


export class SOClient extends Client {
    private siteURL: string;
    private chatURL: string;
    roomNums: number[];
    private bot: Bot;
    private mainRoomNum: number;
    private cookieJar: any;
    private _id: number = 0;
    private api_site_param: any;

    constructor(siteURL: string, chatURL: string, roomNums: number[], bot: Bot) {
        super();
        this.siteURL = siteURL;
        this.chatURL = chatURL;
        this.roomNums = roomNums;
        this.bot = bot;
        this.mainRoomNum = this.roomNums[0];
        this.bot.processMessage = this.bot.processMessage.bind(this.bot);
        this.on(ChatEvent.NEW_MESSAGE.toString(), e => this.bot.processMessage(this.createMessage(e), this));
        this.on(ChatEvent.EDIT.toString(), e => this.bot.processMessage(this.createMessage(e), this));
    }

    init() {
        if (!fs.existsSync(path.join(__dirname, '..', 'data'))) {
            fs.mkdirSync(path.join(__dirname, '..', 'data'));
        }
        this.browserSetup().then(() => this.connect()).catch(reason => {
            console.error(reason);
            throw reason;
        }).then(() => setInterval(async () => this.roomNums.forEach(await this.joinRoom.bind(this)), 21600000));
        return this;
    }

    async browserSetup() {
        /* The following is quite possibly the worst code in the repository, but I have to do this because FileCookieStore has shitty code and will save invalid JSON files, crashing the app next time you run it. */
        const cookies_path = path.join(__dirname, '..', 'data', this.bot.saveFolder, 'cookies.json');
        fs.mkdirSync(path.join(__dirname, '..', 'data', this.bot.saveFolder), {recursive: true});
        if (!fs.existsSync(cookies_path)) {
            fs.writeFileSync(cookies_path, '{}');
        } else {
            let data = fs.readFileSync(cookies_path).toString();
            /* Attempt to fix the file */
            /*for (let i = 1; i < 6; i++) {
                if(!data.isJSON()){
                    data = data.substring(0,data.length-i);
                    continue;
                }
                fs.writeFileSync(cookies_path, data);
            }*/

            /* Or just clear out the file */
            if (!this.bot.isJSON(data)) {
                fs.writeFileSync(cookies_path, '{}');
            }
        }
        this.cookieJar = request.jar(new FileCookieStore(cookies_path));
        return this;
    }

    async connect() {
        await this.mainSiteLogin();
        await this.setUpWS();
        this.roomNums.slice(1).forEach(await this.joinRoom.bind(this));
        await this.setChatVars();
    }

    async setChatVars() {
        //this._id = data.my_id;
        const resp = await request({
            method: 'GET',
            uri: this.siteURL + '/users/current',
            jar: this.cookieJar,
            resolveWithFullResponse: true
        });
        this._id = parseInt(resp.request.path.match(/(?<=\/users\/)[0-9]+(?=\/)/)[0]);
        let sites = this.bot.loadGlobalData('sites');
        if (!sites) {
            const resp = await request({
                method: 'GET',
                uri: 'https://api.stackexchange.com/2.2/sites',
                qs: {
                    pagesize: 999999999
                },
                gzip: true,
                jar: this.cookieJar,
            });
            sites = JSON.parse(resp);
            this.bot.saveGlobalData('sites', sites);
        }
        const siteURLRegex = this.siteURL.replace(/http(s)?:\/\/(www\.)?/, '');
        this.api_site_param = sites.items.find(
            site => {
                return (site.aliases && site.aliases.map(
                    siteURL => {
                        return siteURL.replace(/http(s)?:\/\/(www\.)?/, '');
                    }).includes(siteURLRegex))
                    || site.site_url.replace(/http(s)?:\/\/(www\.)?/, '') === siteURLRegex;
            }
        ).api_site_parameter;
    }

    async mainSiteLogin() {
        const resp = await request({
            method: 'GET',
            uri: this.siteURL + '/users/login',
            jar: this.cookieJar,
            resolveWithFullResponse: true
        });
        if (resp.request.path === "/") {
            console.log("Already Logged in Yey!");
            return;
        }
        const $ = cheerio.load(resp.body);
        const fkey = $('input[name="fkey"]').val();
        const body = await request({
            method: 'POST',
            uri: this.siteURL + '/users/login',
            jar: this.cookieJar,
            followAllRedirects: true,
            form: {
                fkey: fkey,
                email: config.email,
                password: config.password
            },
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1.1 Safari/605.1.15'
            }
        });
        this.emit('main-site-login');
    }

    async setUpWS() {
        this.fkey = await this.getFKEY(this.mainRoomNum);
        this.wsurl = await this.getWSURL(this.mainRoomNum);
        const ws = new WebSocket(this.wsurl + "?l=99999999999", null, {
            headers: {
                "Origin": this.chatURL
            }
        });
        ws.on('open', () => {
            this.emit('ws-open');
            this.emit('ready');
        });
        ws.on('message', (data) => {
            this.emit('ws-message', data);
            this._handleMessage(data);
        });
        ws.on('close', (code) => {
            this.emit('ws-close', code);
            this.bot.log("Close: " + code);
            this.setUpWS();
        });
        ws.on('error', (err) => {
            this.bot.error("Error: " + err);
            this.emit('ws-error', err);
        });
        this.ws = ws;
    }

    _handleMessage(data) {
        data = JSON.parse(data);
        Object.keys(data).forEach(room => {
            room = parseInt(room.substring(1));
            if (!data["r" + room].e) {
                return false;
            }
            if (!this.roomNums.includes(room)) {
                return false;
            }
            for (const event of data["r" + room].e) {
                this.emit(event.event_type, event);
                this.bot.customClientListners.forEach(l => {
                    if (l.on === event.event_type) {
                        l.callback(event, this);
                    }
                })
            }
        });
    }

    async getFKEY(roomNum) {
        const body = await request({
            method: 'GET',
            uri: `${this.chatURL}/rooms/${roomNum}`,
            jar: this.cookieJar,
        });
        const $ = cheerio.load(body);
        return $('#fkey').val();
    }

    async joinRoom(roomNum) {
        const wsurl = await this.getWSURL(roomNum);
        const ws = new WebSocket(wsurl + "?l=99999999999", null, {
            headers: {
                "Origin": this.chatURL
            }
        });
        ws.on('open', () => {
            this.emit('joined', roomNum);
            ws.close();
        });
    }

    async getWSURL(roomNum) {
        const json = await request({
            method: 'POST',
            uri: this.chatURL + '/ws-auth',
            jar: this.cookieJar,
            form: {
                roomid: roomNum,
                fkey: this.fkey,
            },
        });
        return JSON.parse(json).url;
    }

    async getLPARAM(roomNum) {
        const json = await request({
            method: 'POST',
            uri: `${this.chatURL}/chats/${roomNum}/events`,
            jar: this.cookieJar,
            body: {
                fkey: this.fkey,
            },
            json: true
        });
        return JSON.parse(json).time;
    }

    /**
     * @deprecated
     *
     * @return {boolean|Object}
     */
    static getCookies() {
        if (fs.existsSync('./data/cookies')) {
            return JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'cookies')).toString());
        }
        return false;
    }

    static cookiesToString(cookies) {
        return cookies.reduce((acc, cookie) => acc + cookie.name + "=" + cookie.value + "; ", []);
    }


    isMyMessage(msg: Message): boolean {
        throw new Error("Method not implemented.");
    }

    isRoomOwnerId(staticUID: string, context: Message): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    send(content: string, context: string | Message): Promise<void> {
        throw new Error("Method not implemented.");
    }

    hardReply(content: string, context: string | Message): Promise<void> {
        throw new Error("Method not implemented.");
    }

    softReply(content: string, context: string | Message): Promise<void> {
        throw new Error("Method not implemented.");
    }

    delete(msg: Message): Promise<void> {
        throw new Error("Method not implemented.");
    }

    edit(content: string, context: Message): Promise<void> {
        throw new Error("Method not implemented.");
    }

    moveTo(message: Message, to: any): Promise<void> {
        throw new Error("Method not implemented.");
    }

    usernameToId(username: string, context: Message): Promise<string | undefined> {
        throw new Error("Method not implemented.");
    }

    getPingString(msg: Message): string {
        throw new Error("Method not implemented.");
    }

    link(text: string, url: string): string {
        throw new Error("Method not implemented.");
    }

    codify(text: string): string {
        throw new Error("Method not implemented.");
    }
}
