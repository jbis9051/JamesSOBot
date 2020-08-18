import {PluginFunction} from "@chatbot/bot";

const kill: PluginFunction = (bot) => {
    bot.addCommand({
        name: "kill",
        args: [
            "person"
        ],
        description: "",
        shortcuts: [
            "kill",
        ],
        examples: ["|| kill self"],
        ignore: false,
        permissions: ["all"],
        cb: async (msg, client) => {
            if (msg.args.length < 1) {
                client.send("**Missing args**", msg);
                return;
            }
            if (msg.args[0] === "yourself" || msg.args[0] === "self") {
                if (!await bot.permissionCheck(client, bot.commands['suicide'], msg)) {
                    client.send("Your are not authorized to administer this command", msg);
                    return;
                }
                bot.commands['suicide'].cb(msg, client);
                return;
            }
            client.send("This conflicts with the First Law.", msg);
        }
    });
};
export default kill;
