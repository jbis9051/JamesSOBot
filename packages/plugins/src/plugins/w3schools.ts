import { PluginFunction } from '@chatbot/bot';

import fetch from 'node-fetch';

import cheerio from 'cheerio';

export const w3schools: PluginFunction = (bot) => {
    let lastW3Sucks = 0;
    bot.RegisterHandler(async (msg, client) => {
        const match = msg.info.rawContent.match(
            /https?:\/\/www\.w3schools\.com[^\s]+/g
        );
        if (!match || Date.now() - lastW3Sucks <= 1200000) {
            return;
        }
        lastW3Sucks = Date.now();

        const noMDNReply = `w3schools is a terrible resource. We suggest using ${client.link(
            'MDN',
            'https://developer.mozilla.org/'
        )}.`;
        const w3schoolsURL = match[0].replace('>', '');

        if (w3schoolsURL.includes('howto')) {
            client.hardReply(noMDNReply, msg);
            return;
        }

        const body = await fetch(w3schoolsURL).then((response) =>
            response.text()
        );
        const $ = cheerio.load(body);
        const title = $('title').text();

        if (title.toLowerCase().includes('example')) {
            client.hardReply(noMDNReply, msg);
            return;
        }

        bot.google_search(
            title,
            'developer.mozilla.org',
            undefined,
            /^https:\/\/developer\.mozilla\.org\/.*$/
        ).then((data) => {
            if (data) {
                client.hardReply(
                    `w3schools is a terrible resource. We suggest using MDN. Here's an potentially equivalent page: ${bot.htmldecode(
                        client.link(data.title, data.url)
                    )}`,
                    msg
                );
            } else {
                client.hardReply(noMDNReply, msg);
            }
        });
    });
};
