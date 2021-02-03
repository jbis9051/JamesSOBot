import { PluginFunction } from "@chatbot/bot";

const goodbye: PluginFunction = (bot) => {
    bot.RegisterHandler((msg, client) => {
      if (msg.info.contextId === "193540" && msg.info.content === "o/") {
        client.send("\\o", msg);
      }
    });
};
export default goodbye;
