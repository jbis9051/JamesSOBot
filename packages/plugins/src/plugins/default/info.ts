import {PluginFunction} from "@chatbot/bot";

const info: PluginFunction = (bot) => {
    bot.addCommand({
            name: "info",
            args: [],
            description: "Gives information about the bot",
            shortcuts: [
                "info"
            ],
            examples: ["|| info"],
            ignore: false,
            permissions: ["all"],
            cb: (msg, client) => {
                client.send("I'm a bot. I am owned and operated by [@JBis](https://stackoverflow.com/users/7886229/jbis). I am [open source](https://github.com/jbis9051/SO-ChatBot/). I am written in JavaScript.", msg);
            }
        },
    )
};
export default info;
