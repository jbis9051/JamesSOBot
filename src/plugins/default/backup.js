const request = require('request-promise');
const fs = require('fs');

const config = require('../../../config/config.json');

module.exports = function (bot) {
    bot.addCommand({
        name: "backup",
        description: "Backup data to Gist and posts a link",
        shortcuts: ["backup"],
        examples: ["|| backup"],
        permissions: ["admin"],
        func: function (msg) {
            request({
                method: 'POST',
                uri: `https://api.github.com/gists`,
                jar: this.cookieJar,
                headers: {
                    'User-Agent': 'JamesSO Bot',
                    Authorization: 'token ' + config.github.token
                },
                form: JSON.stringify({
                    description: 'bot memory ' + new Date(),
                    public: false,
                    files: {
                        'learn_list.json': {
                            content: JSON.stringify(bot.loadData("learn_list")),
                        },
                        'people_seen.json': {
                            content: JSON.stringify(bot.loadData("people_seen")),
                        },
                        'afk_data.json': {
                            content: JSON.stringify(bot.loadData("afk_data")),
                        }
                    }
                }),
            }).then(resp => {
                resp = JSON.parse(resp);
                msg.roomContext.send(`[Backup](${resp.html_url}) Created`);
            })
        }
    });
};
