import {PluginFunction} from "@chatbot/bot";

import fetch from "node-fetch";

import * as cheerio from "cheerio";

export const w3schools: PluginFunction = (bot) => {
    let lastW3Sucks = 0;
    bot.RegisterHandler((msg, client) => {
        const match = msg.info.rawContent.match(/https?:\/\/www\.w3schools\.com[^\s]+/g);
        if (!match || Date.now() - lastW3Sucks <= 600000) {
            return;
        }
        lastW3Sucks = Date.now();

        fetch(match[0].replace('>', ''))
            .then(response => response.text())
            .then(response => {
                const $ = cheerio.load(response);
                const title = $('title').text();
                bot.google_search(title, "developer.mozilla.org", undefined, /^https:\/\/developer\.mozilla\.org\/.*$/).then((data) => {
                    if (data) {
                        client.hardReply(`w3schools is a terrible resource. We suggest using ${client.link('MDN', 'https://developer.mozilla.org/')}. Here's an potentially equivalent page: ${bot.htmldecode(client.link(data.title, data.url))}`, msg);
                    } else {
                        client.hardReply('An error occurred with the request. But you still shouldn\'t use w3schools.', msg);
                    }
                });
            });
    });
}
