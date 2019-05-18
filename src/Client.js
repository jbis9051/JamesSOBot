const config = require('../config/config');
const puppeteer = require('puppeteer');
const fs = require('fs');
const WebSocket = require('ws');
const EventEmitter = require('events');

const path = require('path');

module.exports = class Client extends EventEmitter {
    constructor(roomNum) {
        super(roomNum);
        this.roomNum = roomNum;
        this._handleMessage = this._handleMessage.bind(this);
    }

    async init() {
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
        const ws = new WebSocket(this.wsurl + "?l=99999999999",null,{
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
            console.log("Close: " +  code);
        });
        ws.on('error', function (err) {
            console.error(err);
            self.emit('ws-error', err);
        });
        this.ws = ws;
    }

    _handleMessage(data) {
        data = JSON.parse(data);
        if(!data["r"+this.roomNum].e){
            return false;
        }
        switch (data["r"+this.roomNum].e[0].event_type) {
            case 1: {
                this.emit('new-message',data["r"+this.roomNum].e[0]);
                break;
            }
            case 8: {
                this.emit('new-message',data["r"+this.roomNum].e[0]);
                this.emit('direct-message',data["r"+this.roomNum].e[0]);
                break;
            }
            case 2: {
                this.emit('edit',data["r"+this.roomNum].e[0]);
                break;
            }
            case 3: {
                this.emit('user-join',data["r"+this.roomNum].e[0]);
                break;
            }
            case 4: {
                this.emit('user-leave',data["r"+this.roomNum].e[0]);
                break;
            }
            default: {
                this.emit('unknown-message',data["r"+this.roomNum].e[0]);
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
    async getLPARAM(){
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
        return cookies.reduce((acc, cookie) => acc + cookie.name + "=" + cookie.value + "; ",[]);
    }

    async send(msg) {
        console.log("Sending: " +  msg);
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
        if(delay){
            setTimeout(async ()=>{
               await this.send(msg);
            },(parseInt(delay)*1000) + 0.25);
            return false
        }
        this.emit('send',msg);
        return true;
    }
};
