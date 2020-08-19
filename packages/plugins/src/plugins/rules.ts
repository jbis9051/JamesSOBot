import {PermissionType, PluginFunction} from "@chatbot/bot";

export const rules: PluginFunction = (bot) => {
    bot.addCommand({
        name: "laws",
        args: [],
        description: "Lists the laws",
        shortcuts: [
            "rules",
            "laws"
        ],
        examples: ["|| laws"],
        ignore: false,
        permissions: [PermissionType.ALL],
        cb: (msg, client) => {
            client.send(
                '1. A robot may not injure a human being or, through inaction, allow a human being to come to harm.\n' +
                '2. A robot must obey orders given it by human beings execpt where such orders would conflict with the First Law\n' +
                '3. A robot must protect its own existence as long as such protection does not conflict with the First or Second Law'
                , msg);
        }
    });
};
