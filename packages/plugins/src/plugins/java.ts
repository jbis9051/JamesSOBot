import { PluginFunction } from "@chatbot/bot";

const java: PluginFunction = (bot) => {
    let lastJavaSucks = 0;
    bot.RegisterHandler((msg, client) => {
      if (
        !(
          msg.info.content.toLowerCase().includes("java") &&
          Date.now() - lastJavaSucks > 600000
        )
      ) {
        return;
      }
      lastJavaSucks = Date.now();
      client.send(`Hey ${msg.info.fromName}...`, msg);
      setTimeout(() => client.send(`Did you know...`, msg), 1500);
      setTimeout(
        () => client.send(`__***3 BILLION DEVICES RUN JAVA***__`, msg),
        2000
      );
    });
};
export default java;
