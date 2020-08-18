import {PluginFunction} from "@chatbot/bot";
import fetch from 'node-fetch';

const funfact: PluginFunction = (bot) => {
    bot.addCommand({
        name: "funfact",
        args: [],
        description: "Sends a fun fact",
        shortcuts: [
            "funfact",
            "ff"
        ],
        examples: ["|| funfact"],
        ignore: false,
        permissions: ["all"],
        cb: (msg, client) => {
            fetch('https://uselessfacts.jsph.pl/random.json?language=en').then(resp => resp.json()).then((body) => {
                client.send(body.text, msg);
            });
        }
    });
};
export default funfact;
