const bot = require('./bot');
const config = require('../config/config');
const FileCookieStore = require('tough-cookie-filestore');
const fs = require('fs');
const EventEmitter = require('events');
const cheerio = require('cheerio');
const path = require('path');
const request = require("request-promise");
const readline = require('readline');

/**
 * @class ClientDebug
 * @classdesc The ClientDebug allows you to send and receive messages directly from console.
 * @property {String} this.roomNum - The StackExchange room the demo should emulate being in. Used for external requests.
 * @property {Object} options
 */
class ClientDebug extends EventEmitter {
    constructor(roomNum, options) {
        super(roomNum, options);
        this.roomNum = roomNum;
        this._handleMessage = this._handleMessage.bind(this);
        this._defaults = {
            saveData: true,
            login: true,
            messageUsername: "JBis",
            messageId: 7886229,
        };
        this.options = Object.assign({}, this._defaults, options);
    }

    init() {
        var rl = readline.createInterface(process.stdin, process.stdout);
        rl.prompt();
        rl.on('line', (input) => {
            const data = {};
            data["r" + this.roomNum] = {
                "e": [{
                    "event_type": 1,
                    "time_stamp": 1558448296,
                    "content": input,
                    "id": 94420223,
                    "user_id": 7886229,
                    "user_name": "JBis",
                    "room_id": 1,
                    "room_name": "Debugger Room",
                    "message_id": 46278793
                }
                ],
                "t": 94420223,
                "d": 1
            };
            this._handleMessage(data);
        });
        if (!fs.existsSync(path.join(__dirname, '..', 'data'))) {
            fs.mkdirSync(path.join(__dirname, '..', 'data'));
        }
        if (this.options.login) {
            this.browserSetup().then(() => this.connect()).catch(reason => {
                console.error(reason);
                throw reason;
            });
        }
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
                'User-Agent': 'Mozilla/qewrw5.0 (Macintosh; Mac OS X 10.14; rv:63.0) Gecko/20100101 Firefox/63.0'
            }
        });
        this.emit('main-site-login');
    }

    async setUpWS() {
        this.fkey = await this.getFKEY();
    }

    _handleMessage(data) {
        if (!data["r" + this.roomNum].e) {
            return false;
        }
        // console.log(data["r" + this.roomNum].e[0]);
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

    async joinRoom(roomNum) {
        return await request({
            method: 'GET',
            uri: `${config.chatURL}/rooms/${roomNum}`,
            jar: this.cookieJar,
        });
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

    async send(msg) {
        console.log("Bot: " + msg);
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

    /**
     *
     * @param roomNum
     * @return {Promise<Array>}
     */
    getRoomOwners(roomNum = this.roomNum) {
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

    async isRoomOwnerUsername(username, roomNum = this.roomNum) {
        const owners = await this.getRoomOwners(roomNum);
        return owners.some(o => o.username === username.replace(" ", ""));
    }

    async isRoomOwnerId(id, roomNum = this.roomNum) {
        const owners = await this.getRoomOwners(roomNum);
        return owners.some(o => o.id === id);
    }
}

module.exports = {ClientDebug};
