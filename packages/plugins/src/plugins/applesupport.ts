import {PermissionType, PluginFunction} from "@chatbot/bot";

export const applesupport: PluginFunction = (bot) => {
    bot.addCommand({
        name: "Apple Search",
        args: [
            "query"
        ],
        description: "Searches for query on Apple Support",
        shortcuts: [
            "aps",
            "apple"
        ],
        examples: ["|| aps forgot Apple ID password"],
        ignore: false,
        permissions: [PermissionType.ALL],
        cb: (msg, client) => {
            if (msg.args.length < 1) {
                client.send("**Missing args**", msg)
                return;
            }
            bot.google_search(msg.args.join(" "), "support.apple.com", undefined, /^https:\/\/support\.apple\.com\/.*$/).then((data) => {
                if (data) {
                    client.send(client.link(data.title, data.url), msg);
                } else {
                    client.send('An error occurred with the request.', msg);
                }
            });
        },
    })
};
