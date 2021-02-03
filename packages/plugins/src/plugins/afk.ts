import {
  Bot,
  Message,
  PluginFunction,
  Client,
  PermissionType
} from "@chatbot/bot";

// 2 min between afk message
const rateLimit = 2 * 60 * 1000;
// 2 minutes where you can talk without escaping the afk.
const gracePeriod = 2 * 60 * 1000;
let lastTell = 0;
export const afk: PluginFunction = (bot: Bot) => {
  const afk_data = bot.dataStore.getData("afk_data") || {};

    bot.RegisterHandler((msg, client) => {
      if (client.isMyMessage(msg)) {
        return;
      }
      const username = msg.info.fromName.replace(/ /g, "");
      if (
        isAFK(username) &&
        Date.now() - afk_data[username].afkSince >= gracePeriod
      ) {
        delete afk_data[username];
        bot.dataStore.setData("afk_data", afk_data);
      }
      const people_mentioned = msg.info.content.match(/@[^ ]+/g) || [];
      people_mentioned.forEach((person) => {
        person = person.replace("@", "");
        if (isAFK(person) && Date.now() - lastTell >= rateLimit) {
          client.hardReply(
            person + " is afk: " + afk_data[person].msg,
            msg
          );
          afk_data[person].lastPing = Date.now();
          lastTell = Date.now();
          bot.dataStore.setData("afk_data", afk_data);
        }
      });
    });

    function isAFK(username: string) {
        return afk_data.hasOwnProperty(username);
    }

    bot.addCommand({
      name: "afk",
      args: ["message"],
      description: "Add an afk message",
      shortcuts: ["afk"],
      examples: ["|| afk bla", "|| afk foo"],
      ignore: false,
      permissions: [PermissionType.ALL],
      cb: async (msg: Message, client: Client) => {
        afk_data[msg.info.fromName.replace(/ /g, "")] = {
          afkSince: Date.now(),
          lastPing: null,
          id: msg.info.fromId,
          msg: msg.args.join(" ")
        };
        bot.dataStore.setData("afk_data", afk_data);
        client.hardReply("bye " + msg.info.fromName, msg);
      }
    });
};
