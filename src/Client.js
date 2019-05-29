const bot = require('./bot');
const config = require('../config/config');
const puppeteer = require('puppeteer');
const fs = require('fs');
const WebSocket = require('ws');
const EventEmitter = require('events');
const cheerio = require('cheerio');

const path = require('path');

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
        this.browser = await puppeteer.launch();
        this.mainPage = await this.browser.newPage();
        const cookies = Client.getCookies();
        if (cookies) {
            await this.addCookies(cookies);
        }
        return this;
    }

    async connect() {
        await this.mainSiteLogin();
        await this.setUpWS();
        await this.mainPage.close();
        await this.setChatVars()
    }

    async setChatVars() {
        if (!this.chatPage) {
            console.error("There's no chat page");
            return;
        }
        const data = await this.chatPage.evaluate(() => {
            return {
                my_id: CHAT.CURRENT_USER_ID,

            }
        });
        this._id = data.my_id;
    }

    async mainSiteLogin() {
        await this.mainPage.goto(config.siteUrl + '/users/login');
        if (!this.mainPage.url().includes("/users/login")) {
            console.log("Already Logged in Yey!");
            await Client.saveCookies(await this.mainPage.cookies());
            return;
        }
        await this.mainPage.focus('#email');
        await this.mainPage.keyboard.type(config.email);
        await this.mainPage.focus('#password');
        await this.mainPage.keyboard.type(config.password);
        await this.mainPage.click('#submit-button');
        await this.mainPage.waitForNavigation();
        await Client.saveCookies(await this.mainPage.cookies());
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
        const chatPage = await this.browser.newPage();
        await chatPage.goto(`${config.chatURL}/rooms/${this.roomNum}`);
        this.chatPage = chatPage;
        const data = await chatPage.evaluate(() => {
            return {
                fkey: fkey().fkey
            }
        });
        return data.fkey;
    }

    async getWSURL() {
        const page = await this.browser.newPage();
        await page.setRequestInterception(true);
        page.on('request', interceptedRequest => {
            const data = {
                'headers': {
                    'content-type': 'application/x-www-form-urlencoded',
                },
                'method': 'POST',
                'postData': `roomid=${this.roomNum}&fkey=${this.fkey}`,
            };
            interceptedRequest.continue(data);
        });
        const response = await page.goto(config.chatURL + '/ws-auth');
        const content = await response.text();
        this.emit('main-site-login');
        return JSON.parse(content).url;
    }

    async getLPARAM() {
        const page = await this.browser.newPage();
        await page.setRequestInterception(true);
        page.on('request', interceptedRequest => {
            const data = {
                'headers': {
                    'content-type': 'application/x-www-form-urlencoded',
                },
                'method': 'POST',
                'postData': `fkey=${this.fkey}`,
            };
            interceptedRequest.continue(data);
        });
        const response = await page.goto(`${config.chatURL}/chats/${this.roomNum}/events`);
        const content = await response.text();
        return JSON.parse(content).time;
    }

    static getCookies() {
        if (fs.existsSync('./data/cookies')) {
            return JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'cookies')));
        }
        return false;
    }

    async addCookies(cookies) {
        if (typeof cookies === "string") {
            JSON.parse(cookies);
        }
        await this.mainPage.setCookie(...cookies);
    }

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
        const page = await this.browser.newPage();
        await page.setRequestInterception(true);
        page.on('request', interceptedRequest => {
            const data = {
                'headers': {
                    'content-type': 'application/x-www-form-urlencoded',
                },
                'method': 'POST',
                'postData': `text=${encodeURIComponent(msg)}&fkey=${this.fkey}`,
            };
            interceptedRequest.continue(data);
        });
        const response = await page.goto(`${config.chatURL}/chats/${this.roomNum}/messages/new`);
        const text = await response.text();
        await page.close();
        console.log(text);
        const delay = text.match(/(?!You can perform this action again in )[0-9]+(?= second(s*)\.)/);
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

    async usernameSearch(query, limit = 50) {
        const page = await this.browser.newPage();

        const response = await page.goto(`${config.chatURL}/users/search?q=${encodeURIComponent(query)}&limit=${limit}`);
        const text = await response.text();
        await page.close();
        if (text.length <= 0) {
            return [];
        }
        return text.split('\n');
    }

    async usernameToId(username) {
        const result = await this.usernameSearch(username, 1);
        if (result.length === 0) {
            return false;
        }
        return JSON.parse(result[0]).id;
    }

    async idToInfo(id, roomNum = this.roomNum) {
        const page = await this.browser.newPage();
        await page.setRequestInterception(true);
        page.on('request', interceptedRequest => {
            const data = {
                'headers': {
                    'content-type': 'application/x-www-form-urlencoded',
                },
                'method': 'POST',
                'postData': `ids=${id}&roomId=${roomNum}`,
            };
            interceptedRequest.continue(data);
        });
        const response = await page.goto(`${config.chatURL}/user/info`);
        const text = await response.text();
        await page.close();
        return JSON.parse(text).users[0];
    }

    async usernameToInfo(username) {
        const id = await this.usernameToId(username);
        if (!id) {
            return false;
        }
        return await this.idToInfo(id);
    }

    /*
    Using cheerio instead of puppeteer because in the future i would like to get rid of using puppeteer....and because using puppeteer didn't work for some reason
     */
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
