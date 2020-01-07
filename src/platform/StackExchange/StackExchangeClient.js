const config = require('../../../config/config');
const FileCookieStore = require('tough-cookie-filestore');
const fs = require('fs');
const WebSocket = require('ws');
const cheerio = require('cheerio');
const path = require('path');
const request = require("request-promise");
const {Message} = require("../../events/Message");
const {ChatEvent} = require("../../events/ChatEvent");
const Client = require("../../Client.js");

/**
 * @class StackExchangeClient
 * @classdesc The StackExchangeClient. Handles everything from logging in to sending & receiving messages.
 * @property {Array} this.roomNum - The StackExchange rooms the Bot should connect to
 * @property {int} this._id
 * @property {String} this.fkey
 * @property {String} this.wsurl
 * @property {WebSocket} this.ws
 */
class StackExchangeClient extends Client {
    /**
     *
     * @param siteURL - The site url - for example https://stackoverflow.com
     * @param chatURL - the chat url - for example https://chat.stackoverflow.com
     * @param roomNums - array of room ids to connect to
     * @param {Bot} bot
     */
    constructor(siteURL, chatURL, roomNums, bot) {
        super();
        this.siteURL = siteURL;
        this.chatURL = chatURL;
        this.roomNums = roomNums;
        this.bot = bot;
        this.mainRoomNum = this.roomNums[0];
        this.bot.processMessage = this.bot.processMessage.bind(this.bot);
        this.on(ChatEvent.NEW_MESSAGE, e => this.bot.processMessage(new Message(e, this)));
        this.on(ChatEvent.EDIT, e => this.bot.processMessage(new Message(e, this)));
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
            if (!data.isJSON()) {
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
            this.bot.error("Error: " + code);
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

    send(msg, roomNum) {
        return new Promise(async resolve => {
            console.log("Sending: " + msg);
            if (typeof msg !== "string") {
                msg = JSON.stringify(msg);
            }
            request({
                method: 'POST',
                uri: `${this.chatURL}/chats/${roomNum}/messages/new`,
                jar: this.cookieJar,
                form: {
                    text: msg,
                    fkey: this.fkey
                },
            }).then(body => {
                this.bot.log(body);
                this.emit('send', msg);
                try {
                    resolve(JSON.parse(body).id);
                } catch (e) {
                    resolve(null)
                }
            }).catch(error => {
                this.bot.error(error.error);
                const delay = error.error.match(/(?!You can perform this action again in )[0-9]+(?= second(s*)\.)/);
                if (delay) {
                    setTimeout(async () => {
                        resolve(await this.send(msg, roomNum));
                    }, (parseInt(delay) * 1000) + 0.25);
                } else {
                    resolve();
                }
            });

        });
    }

    replyDirect(msg, content) {
        return this.send(`:${msg.data.message_id} ${content}`, msg.getContext())
    }

    async activeUsernameSearch(username, roomNum) {
        const body = await request({
            method: 'GET',
            uri: `${this.chatURL}/rooms/pingable/${roomNum}`,
            jar: this.cookieJar,
        });
        const array = JSON.parse(body).filter(a => a[1].toUpperCase() === username.replace("@", "").toUpperCase());
        if (array.length === 0) {
            return false;
        }
        return array[0][0];
    }

    async usernameSearch(query, limit = 50) {
        const body = await request({
            method: 'GET',
            uri: `${this.chatURL}/users/search`,
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
            uri: `${this.chatURL}/user/info`,
            form: {
                ids: id,
                roomId: roomNum
            },
        });
        return JSON.parse(body).users[0];
    }

    async chatIDToSiteID(id) {
        const body = await request({
            method: 'GET',
            uri: `${this.chatURL}/users/thumbs/${id}`,
        });
        return JSON.parse(body).profileUrl.match(/\d+/)[0];
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
            this.bot.standard_request(`${this.chatURL}/users/${id}`, (err, res, body) => {
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
            this.bot.standard_request(`${this.chatURL}/rooms/info/${roomNum}`, (err, res, body) => {
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


    stats(id, api_site_param = this.api_site_param) {
        return new Promise(resolve => {
            request({
                url: `https://api.stackexchange.com/2.2/users/${id}?site=${api_site_param.trim()}`,
                gzip: true,
                json: true,
                jar: this.cookieJar
            }, (err, resp, body) => {
                if (resp.statusCode !== 200 || !body.items) {
                    resolve(false);
                } else {
                    resolve(body.items[0]);
                }
            });
        })
    }

    moveTo(fromRoom, toRoom, messageIds) {
        return new Promise(async resolve => {
            request({
                method: 'POST',
                uri: `${this.chatURL}/admin/movePosts/${fromRoom}`,
                jar: this.cookieJar,
                form: {
                    ids: messageIds.join(","),
                    to: toRoom,
                    fkey: this.fkey
                },
            })
                .then(resolve)
                .catch(error => {
                    this.bot.error(error.error);
                    const delay = error.error.match(/(?!You can perform this action again in )[0-9]+(?= second(s*)\.)/);
                    if (delay) {
                        setTimeout(async () => {
                            resolve(await this.moveTo(fromRoom, toRoom, messageIds));
                        }, (parseInt(delay) * 1000) + 0.25);
                    } else {
                        resolve();
                    }
                });

        });
    }

    edit(id, newContent, roomNum) {
        return new Promise(async resolve => {
            console.log("Sending: " + newContent);
            if (typeof newContent !== "string") {
                newContent = JSON.stringify(newContent);
            }
            request({
                method: 'POST',
                uri: `${this.chatURL}/messages/${id}`,
                jar: this.cookieJar,
                headers: {
                    referer: `${this.chatURL}/rooms/${roomNum}`
                },
                form: {
                    text: newContent,
                    fkey: this.fkey
                },
            })
                .then(resolve)
                .catch(error => {
                    this.bot.error(error.error);
                    const delay = error.error.match(/(?!You can perform this action again in )[0-9]+(?= second(s*)\.)/);
                    if (delay) {
                        setTimeout(async () => {
                            resolve(await this.edit(id, newContent, roomNum));
                        }, (parseInt(delay) * 1000) + 0.25);
                    } else {
                        resolve();
                    }
                });

        });
    }
}

module.exports = {Client: StackExchangeClient};
