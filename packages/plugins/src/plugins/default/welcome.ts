import {Bot, PluginFunction, Client} from "@chatbot/bot";

let people_seen: string[];

export const welcome: PluginFunction = (bot: Bot, config) => {
    people_seen = bot.getData('people_seen') || [];
    const welcome_messages = config.plugin.welcome_msg;
    bot.addCommand({
        name: "welcome",
        args: [
            "person"
        ],
        description: "Welcomes a new user to the room with a message",
        shortcuts: [
            "welcome"
        ],
        examples: ["|| welcome @JBis", "|| welcome JBis", "|| welcome"],
        ignore: false,
        permissions: ["all"],
        cb: (msg, client) => {
            if (msg.args.length < 1) {
                client.send(welcome_messages[msg.info.contextId], msg);
                return;
            }
            const person = msg.args[0];
            if (welcome_messages[msg.info.contextId]) {
                client.softReply(welcome_messages[msg.info.contextId], msg);
            } else {
                client.send("No welcome message listed.", msg)
            }

        }
    });
    bot.RegisterShutdownScript((msg) => {
        bot.setData("people_seen", people_seen);
    });
    bot.RegisterHandler(async (msg, client: Client & any) => {
            if (client.isMyMessage(msg)) {
                return;
            }
            if (people_seen.includes(msg.info.fromId)) {
                return;
            } else {
                people_seen.push(msg.info.fromId);
            }
            if (await client.getNumMessagesFromId(msg.info.fromId) < 2) {
                if (welcome_messages[msg.info.contextId]) {
                    client.softReply(welcome_messages[msg.info.contextId]);
                }
            }
        }
    );
};

export default welcome;
