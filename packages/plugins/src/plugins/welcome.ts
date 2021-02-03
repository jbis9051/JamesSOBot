import { Bot, Client, PermissionType, PluginFunction } from "@chatbot/bot";

let people_seen: string[];

export const welcome: PluginFunction = (bot: Bot, config) => {
    people_seen = bot.dataStore.getData('people_seen') || [];
    const welcome_messages = config.plugin.welcome_msg;
    bot.addCommand({
      name: "welcome",
      args: ["person"],
      description: "Welcomes a new user to the room with a message",
      shortcuts: ["welcome"],
      examples: ["|| welcome @JBis", "|| welcome JBis", "|| welcome"],
      ignore: false,
      permissions: [PermissionType.ALL],
      cb: (msg, client) => {
        if (msg.args.length < 1) {
          client.send(welcome_messages[msg.info.contextId], msg);
          return;
        }
        const person = msg.args[0];
        if (welcome_messages[msg.info.contextId]) {
          client.send(
            `@${person} ${welcome_messages[msg.info.contextId]}`,
            msg
          );
        } else {
          client.send("No welcome message listed.", msg);
        }
      }
    });
  bot.RegisterShutdownScript((msg) => {
    bot.dataStore.setData("people_seen", people_seen);
  });
  bot.RegisterHandler(async (msg, client: Client & any) => {
    if (client.isMyMessage(msg) || parseInt(msg.info.fromId) < 0) {
      return;
    }
    if (people_seen.includes(msg.info.fromId)) {
      return;
    } else {
      people_seen.push(msg.info.fromId);
    }
    if (
      (await client.getNumMessagesFromId(
        msg.info.fromId,
        msg.info.contextId
      )) < 2
    ) {
      if (welcome_messages[msg.info.contextId]) {
        client.softReply(welcome_messages[msg.info.contextId], msg);
      }
    }
  });
};

export default welcome;
