import {Bot, PluginFunction} from "@chatbot/bot";

const betterecho: PluginFunction = (bot: Bot) => {
    bot.addCommand({
        name: "echo",
        args: [],
        description: "Bot echo's what you say",
        shortcuts: [
            "echo",
            "betterecho",
            "say"
        ],
        examples: ["|| echo hi"],
        ignore: true,
        permissions: ["all"],
        cb: (msg, client) => {
            client.send(bot.htmldecode(msg.args.join(" ")), msg);
        }
    });
};
export default betterecho;
