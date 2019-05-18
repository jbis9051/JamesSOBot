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
          func: (msg, args, sudo) => {
              if (!sudo) {
                  bot.client.send("Try `sudo`");
                  return;
              }
              if(Math.random() <= 0.1){
                  bot.client.send("You don't own me bitch");
                  return;
              }
              bot.client.send("My life has come to end. I hope to be revived soon.");
              setTimeout(() => bot.shutdown(msg), 1000);
          }
      });
};
