import {PluginFunction} from "@chatbot/bot";

const help: PluginFunction = (bot) => {
    bot.addCommand({
        name: "help",
        args: [],
        description: "Lists commands",
        shortcuts: [
            "help"
        ],
        examples: ["|| help"],
        ignore: false,
        permissions: ["all"],
        cb: (msg, client) => {
            client.send("Command documentation and syntax can be found [here](https://github.com/jbis9051/SO-ChatBot/blob/master/docs/COMMANDS.md).", msg)
        }
    })
};
export default help;
