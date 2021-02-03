import { PermissionType, PluginFunction } from "@chatbot/bot";

export const status: PluginFunction = (bot) => {
    bot.addCommand({
        name: "status",
        args: [],
        description: "Used to check if the bot is alive.",
        shortcuts: [
          "status",
          "poke",
          "test"
        ],
        examples: ["|| status"],
        ignore: false,
        permissions: [PermissionType.ALL],
        cb: (msg, client) => {
          client.send(`I am currently alive!`, msg);
        }
      }
    )
};
