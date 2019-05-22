module.exports = function (bot) {
      bot.addCommand({
          name: "suicide",
          args: [],
          description: "Ends the process.",
          shortcuts: [
              "die",
              "destroy",
              "selfdestruct",
              "suicide",
              "reboot",
              "restart",
              "just_do_it"
          ],
          ignore: false,
          permissions: ["admin"],
          func: (msg) => {
              if (!msg.sudo) {
                  bot.client.send("Try `sudo`");
                  return;
              }
              bot.client.send("My life has come to end. I hope to be revived soon.");
              setTimeout(() => bot.shutdown(msg), 1000);
          }
      });
};
