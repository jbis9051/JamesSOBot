module.exports = function (bot) {
      bot.addCommand({
          name: "suicide",
          args: [],
          description: "Ends the bot's node process.",
          shortcuts: [
              "die",
              "destroy",
              "selfdestruct",
              "suicide",
              "reboot",
              "restart",
              "just_do_it",
              "shutdown",
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
/**
 * Ends the bot's node process.
 *
 * Alias:
 *
 * - `sudo kill self`
 *
 * **Requires:** `sudo`
 */
function die(min,max) {}
