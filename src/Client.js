const bot = require('./bot');
const config = require('../config/config');
const FileCookieStore = require('tough-cookie-filestore');
const fs = require('fs');
const WebSocket = require('ws');
const EventEmitter = require('events');
const cheerio = require('cheerio');
const path = require('path');
const request = require("request-promise");

/**
 * @class Client
 * @classdesc The Client. Handles everything from logging in to sending & receiving messages. It is environment specific and should be one of the few things needing to be changed, environment to environment.
 * @property {String} this.roomNum - The StackExchange room the bot should connect to
 * @property {puppeteer} this.browser
 * @property {puppeteer#page} this.mainPage
 * @property {puppeteer#page} this.chatPage
 * @property {int} this._id
 * @property {String} this.fkey
 * @property {String} this.wsurl
 * @property {WebSocket} this.ws
 */
class Client extends EventEmitter {
    constructor(roomNum) {
        super(roomNum);
        this.roomNum = roomNum;
        this._handleMessage = this._handleMessage.bind(this);
    }

    init() {
        this.browserSetup().then(() => this.connect()).catch(reason => {
            console.error(reason);
            throw reason;
        });
    }

    async browserSetup() {
        this.cookieJar = request.jar(new FileCookieStore('./data/cookies.json'));
        return this;
    }

    async connect() {
        await this.mainSiteLogin();
        await this.setUpWS();
        await this.setChatVars()
    }

    async setChatVars() {
        //this._id = data.my_id;
    }

    async mainSiteLogin() {
        const resp = await request({
            method: 'GET',
            uri: config.siteUrl + '/users/login',
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
            uri: config.siteUrl + '/users/login',
            jar: this.cookieJar,
            followAllRedirects: true,
            form: {
                fkey: fkey,
                email: config.email,
                password: config.password
            },
            headers: {
                'User-Agent': 'Mozilla/qewrw5.0 (Macintosh; sfwerwqwerqwerqqwr Mac OS X 10.14; rv:63.0) Gecko/20100101 Firefox/63.0'
            }
        });
        this.emit('main-site-login');
    }

    async setUpWS() {
        this.fkey = await this.getFKEY();
        this.wsurl = await this.getWSURL();
        const ws = new WebSocket(this.wsurl + "?l=99999999999", null, {
            headers: {
                "Origin": config.chatURL
            }
        });
        const self = this; //I'm lazy and https://stackoverflow.com/a/3950207/7886229 got 22 upvotes so I know have at least 22 peoples support
        ws.on('open', function () {
            self.emit('ws-open');
            self.emit('ready');
        });
        ws.on('message', function (data) {
            self.emit('ws-message', data);
            self._handleMessage(data);
        });
        ws.on('close', function (code) {
            self.emit('ws-close', code);
            console.log("Close: " + code);
        });
        ws.on('error', function (err) {
            console.error(err);
            self.emit('ws-error', err);
        });
        this.ws = ws;
    }

    _handleMessage(data) {
        data = JSON.parse(data);
        if (!data["r" + this.roomNum].e) {
            return false;
        }
        console.log(data["r" + this.roomNum].e[0]);
        switch (data["r" + this.roomNum].e[0].event_type) {
            case 1: {
                this.emit('new-message', data["r" + this.roomNum].e[0]);
                break;
            }
            case 8: {
                this.emit('new-message', data["r" + this.roomNum].e[0]);
                this.emit('direct-message', data["r" + this.roomNum].e[0]);
                break;
            }
            case 2: {
                this.emit('edit', data["r" + this.roomNum].e[0]);
                break;
            }
            case 3: {
                this.emit('user-join', data["r" + this.roomNum].e[0]);
                break;
            }
            case 4: {
                this.emit('user-leave', data["r" + this.roomNum].e[0]);
                break;
            }
            default: {
                this.emit('unknown-message', data["r" + this.roomNum].e[0]);
            }
        }
    }

    async getFKEY() {
        const body = await request({
            method: 'GET',
            uri: `${config.chatURL}/rooms/${this.roomNum}`,
            jar: this.cookieJar,
        });
        const $ = cheerio.load(body);
        return $('#fkey').val();
    }

    async getWSURL() {
        const json = await request({
            method: 'POST',
            uri: config.chatURL + '/ws-auth',
            jar: this.cookieJar,
            form: {
                roomid: this.roomNum,
                fkey: this.fkey,
            },
        });
        return JSON.parse(json).url;
    }

    async getLPARAM() {
        const json = await request({
            method: 'POST',
            uri: `${config.chatURL}/chats/${this.roomNum}/events`,
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
            return JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'cookies')));
        }
        return false;
    }

    /**
     * @deprecated
     *
     * @return {boolean|Object}
     */
    async addCookies(cookies) {
        if (typeof cookies === "string") {
            JSON.parse(cookies);
        }
        await this.mainPage.setCookie(...cookies);
    }

    /**
     * @deprecated
     *
     */
    static saveCookies(cookies) {
        if (typeof cookies !== "string") {
            cookies = JSON.stringify(cookies);
        }
        fs.writeFileSync(path.join(__dirname, '..', 'data', 'cookies'), cookies);
    }

    static cookiesToString(cookies) {
        return cookies.reduce((acc, cookie) => acc + cookie.name + "=" + cookie.value + "; ", []);
    }

    async send(msg) {
        console.log("Sending: " + msg);
        if (typeof msg !== "string") {
            msg = JSON.stringify(msg);
        }
        const body = await request({
            method: 'POST',
            uri: `${config.chatURL}/chats/${this.roomNum}/messages/new`,
            jar: this.cookieJar,
            form: {
                text: msg,
                fkey: this.fkey
            },
        });
        bot.log(body);
        const delay = body.match(/(?!You can perform this action again in )[0-9]+(?= second(s*)\.)/);
        if (delay) {
            setTimeout(async () => {
                await this.send(msg);
            }, (parseInt(delay) * 1000) + 0.25);
            return false
        }
        this.emit('send', msg);
        return true;
    }

    async reply(msg, content) {
        await this.send(`:${msg.data.message_id} ${content}`)
    }

    async getCurrentUsers() {
        /* There's probably a better way to do this, but I can't find it
         */
        const data = await this.chatPage.evaluate(() => {
            return {
                users: (() => {
                    let x = [];
                    CHAT.RoomUsers.all().forEach(i => x.push(i));
                    return x
                })()
            }
        });
        return data.users;
    }

    async activeUsernameSearch(username) {
        const body = await request({
            method: 'GET',
            uri: `${config.chatURL}/rooms/pingable/${this.roomNum}`,
            jar: this.cookieJar,
        });
        const array = JSON.parse(body).filter(a => a[1].replace(" ", "") === username.replace("@", ""));
        if (array.length === 0) {
            return false;
        }
        return array[0][0];
    }

    async usernameSearch(query, limit = 50) {
        const body = await request({
            method: 'GET',
            uri: `${config.chatURL}/users/search`,
            qs: {
                q: query,
                limit: limit
            },
        });
        if (body.length <= 0) {
            return [];
        }
        return body.split('\n');
    }

    async usernameToId(username) {
        return await this.activeUsernameSearch(username);
    }

    async idToInfo(id, roomNum = this.roomNum) {
        const body = await request({
            method: 'POST',
            uri: `${config.chatURL}/user/info`,
            form: {
                ids: id,
                roomId: roomNum
            },
        });
        return JSON.parse(body).users[0];
    }

    async usernameToInfo(username) {
        const id = await this.usernameToId(username);
        if (!id) {
            return false;
        }
        return await this.idToInfo(id);
    }

    getNumMessagesFromId(id, roomNum = this.roomNum) {
        return new Promise(resolve => {
            bot.standard_request(`${config.chatURL}/users/${id}`, (err, res, body) => {
                try {
                    const $ = cheerio.load(body);
                    const numMessages = parseInt($(`#room-${roomNum} .room-message-count`).attr('title').match(/^\d+/)[0]);
                    resolve(numMessages);
                } catch (e) {
                    resolve(false);
                }
            });
        });
    }

    async getNumMessages(username_or_id, roomNum = this.roomNum) {
        if (typeof username_or_id === "number") {
            return await this.getNumMessagesFromId(username_or_id, roomNum);
        }
        return await this.getNumMessagesFromId(await this.usernameToId(username_or_id), roomNum);

    }
}

module.exports = {Client};
