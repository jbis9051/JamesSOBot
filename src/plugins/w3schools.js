const fetch = require('node-fetch');
const cheerio = require('cheerio');
const {Message} = require('../events/Message');

module.exports = function (bot) {
    let lastW3Sucks = 0;
    bot.RegisterListener({
        func: (msg) => {
            return true;
        },
        callback: (msg) => {
            const match = msg.getRawContent().match(/https?:\/\/www\.w3schools\.com[^\s]+/g);
            if (!match || Date.now() - lastW3Sucks <= 600000) {
                return;
            }
            lastW3Sucks = Date.now();

            fetch(match[0])
                .then(response => response.text())
                .then(response => {
                    const $ = cheerio.load(response);
                    const title = $('title').text();
                    bot.google_search(title, "developer.mozilla.org", null, /^https:\/\/developer\.mozilla\.org\/.*$/,
                        (data) => {
                            if (data) {
                                msg.replyDirect(`w3schools is a terrible resource. We suggest using [MDN](https://developer.mozilla.org/). Here's an potentially equivalent page: ${Message.link(data.title, data.url).htmldecode()}`);
                            } else {
                                msg.replyDirect('An error occurred with the request. But you still shouldn\'t use w3schools.');
                            }
                        });
                });
        }
    });
};
