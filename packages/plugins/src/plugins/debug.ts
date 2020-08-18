import {Message, PluginFunction, Client} from "@chatbot/bot";

let debuging = false;

const debug: PluginFunction = (bot) => {
    bot.addCommand({
        name: "debug",
        args: [],
        description: "Disables/Enables the bot in the test room (193540)",
        shortcuts: ["debug"],
        examples: ["|| sudo debug enable"],
        ignore: false,
        permissions: ["admin"],
        cb: (msg: Message, client: Client) => {
            if (!msg.sudo) {
                client.send("Try `sudo`", msg)
                return;
            }
            if (msg.args[0] === "disable") {
                debuging = false;
                client.send("**DEBUG MODE DISABLED**", msg)
            } else {
                client.send("**DEBUG MODE ENABLED**", msg)
                debuging = true;
            }
        },
    });
    bot.RegisterValidator("debug", (msg: Message) => {
        return msg.info.contextId !== "193540" || !debuging || msg.info.content === "|| sudo debug disable";
    });
};
