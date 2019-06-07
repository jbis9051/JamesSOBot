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
 * @property {Array} this.roomNum - The StackExchange rooms the bot should connect to
 * @property {int} this._id
 * @property {String} this.fkey
 * @property {String} this.wsurl
 * @property {WebSocket} this.ws
 */
class Client extends EventEmitter {
    constructor(roomNums) {
        super(roomNums);
        this.roomNums = roomNums;
        this.mainRoomNum = this.roomNums[0];
        this._handleMessage = this._handleMessage.bind(this);
    }

    init() {
        if (!fs.existsSync(path.join(__dirname, '..', 'data'))) {
            fs.mkdirSync(path.join(__dirname, '..', 'data'));
        }
        this.browserSetup().then(() => this.connect()).catch(reason => {
            console.error(reason);
            throw reason;
        });
    }

    async browserSetup() {
        /* The following is quite possibly the worst code in the repository, but I have to do this because FileCookieStore has shitty code and will save invalid JSON files, crashing the app next time you run it. */
        const cookies_path = path.join(__dirname, '..', 'data', 'cookies.json');
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
            fs.writeFileSync(cookies_path, '{}');
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
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5)  iosdfgijofsdoijgosijdfgojisjoidfgosdifgjoi sdfgsdfgdsjfigs dfgsdfgd AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1.1 Safari/605.1.15'
            }
        });
        this.emit('main-site-login');
    }

    async setUpWS() {
        this.fkey = await this.getFKEY(this.mainRoomNum);
        this.wsurl = await this.getWSURL(this.mainRoomNum);
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
        Object.keys(data).forEach(room => {
            room = parseInt(room.substring(1));
            if (!data["r" + room].e) {
                return false;
            }
            if (!this.roomNums.includes(room)) {
                return false;
            }
            console.log(data["r" + room].e[0]);
            switch (data["r" + room].e[0].event_type) {
                case 1: {
                    this.emit('new-message', data["r" + room].e[0]);
                    break;
                }
                case 8: {
                    this.emit('new-message', data["r" + room].e[0]);
                    this.emit('direct-message', data["r" + room].e[0]);
                    break;
                }
                case 2: {
                    this.emit('edit', data["r" + room].e[0]);
                    break;
                }
                case 3: {
                    this.emit('user-join', data["r" + room].e[0]);
                    break;
                }
                case 4: {
                    this.emit('user-leave', data["r" + room].e[0]);
                    break;
                }
                default: {
                    this.emit('unknown-message', data["r" + room].e[0]);
                }
            }
        });
    }

    async getFKEY(roomNum) {
        const body = await request({
            method: 'GET',
            uri: `${config.chatURL}/rooms/${roomNum}`,
            jar: this.cookieJar,
        });
        const $ = cheerio.load(body);
        return $('#fkey').val();
    }

    async joinRoom(roomNum) {
        const wsurl = await this.getWSURL(roomNum);
        const ws = new WebSocket(wsurl + "?l=99999999999", null, {
            headers: {
                "Origin": config.chatURL
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
            uri: config.chatURL + '/ws-auth',
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
            uri: `${config.chatURL}/chats/${roomNum}/events`,
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

    async send(msg, roomNum) {
        console.log("Sending: " + msg);
        if (typeof msg !== "string") {
            msg = JSON.stringify(msg);
        }
        const body = await request({
            method: 'POST',
            uri: `${config.chatURL}/chats/${roomNum}/messages/new`,
            jar: this.cookieJar,
            form: {
                text: msg,
                fkey: this.fkey
            },
        }).catch(error => {
            bot.error(error.error);
            const delay = error.error.match(/(?!You can perform this action again in )[0-9]+(?= second(s*)\.)/);
            if (delay) {
                setTimeout(async () => {
                    await this.send(msg, roomNum);
                }, (parseInt(delay) * 1000) + 0.25);
            }
        });
        if (body) {
            bot.log(body);
        }
        this.emit('send', msg);
    }

    async reply(msg, content) {
        await this.send(`:${msg.data.message_id} ${content}`, msg.getContext())
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

    async activeUsernameSearch(username, roomNum) {
        const body = await request({
            method: 'GET',
            uri: `${config.chatURL}/rooms/pingable/${roomNum}`,
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

    async usernameToId(username, roomNum) {
        return await this.activeUsernameSearch(username, roomNum);
    }

    async idToInfo(id, roomNum) {
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

    async usernameToInfo(username, roomNum) {
        const id = await this.usernameToId(username, roomNum);
        if (!id) {
            return false;
        }
        return await this.idToInfo(id);
    }

    getNumMessagesFromId(id, roomNum) {
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

    async getNumMessages(username_or_id, roomNum) {
        if (typeof username_or_id === "number") {
            return await this.getNumMessagesFromId(username_or_id, roomNum);
        }
        return await this.getNumMessagesFromId(await this.usernameToId(username_or_id, roomNum), roomNum);

    }

    /**
     *
     * @param roomNum
     * @return {Promise<Array>}
     */
    getRoomOwners(roomNum) {
        return new Promise((resolve, reject) => {
            bot.standard_request(`${config.chatURL}/rooms/info/${roomNum}`, (err, res, body) => {
                try {
                    const $ = cheerio.load(body);
                    resolve(
                        $('#room-ownercards').find('div.usercard').map((i, e) => ({
                            username: $(e).find('.user-header').attr('title'),
                            id: parseInt($(e).attr('id').replace("owner-user-", ""))
                        })).get()
                    );
                } catch (e) {
                    console.error(e);
                    reject("Error finding owners");
                }
            });
        });
    }

    async isRoomOwnerUsername(username, roomNum) {
        const owners = await this.getRoomOwners(roomNum);
        return owners.some(o => o.username === username.replace(" ", ""));
    }

    async isRoomOwnerId(id, roomNum) {
        const owners = await this.getRoomOwners(roomNum);
        return owners.some(o => o.id === id);
    }
}

module.exports = {Client};
