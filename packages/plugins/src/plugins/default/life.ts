import { PermissionType, PluginFunction } from "@chatbot/bot";

let live = true;

export const life: PluginFunction = (bot) => {
    bot.addCommand({
      name: "disable",
      args: [],
      description: "Disables the bot. Won't respond to messages until `|| enable` is ran by admin.",
      shortcuts: [
        "disable"
      ],
      examples: ["|| sudo disable"],
      ignore: false,
      permissions: ["admin", PermissionType.OWNER],
      cb: (msg, client) => {
        if (!msg.sudo) {
          client.send("Try `sudo`", msg);
          return;
        }
        client.send("Shut Down", msg);
        live = false;
      }
    });
    bot.addCommand({
      name: "enable",
      args: [],
      description: "Enables the bot.",
      shortcuts: [
        "enable"
      ],
      examples: ["|| enable"],
      ignore: false,
      permissions: ["admin", PermissionType.OWNER],
      cb: (msg, client) => {
        if (live) {
          client.send("I'm already alive...", msg);
        } else {
          client.send("I'm back alive!", msg);
          live = true;
        }
      }
    });
  bot.RegisterValidator("life", (msg) => {
    return live || msg.info.content === "|| enable";
  });
};
