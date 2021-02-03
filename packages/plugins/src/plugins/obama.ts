import fetch from "node-fetch";
import { PermissionType, PluginFunction } from "@chatbot/bot";

const max_attempts = 20;

export const obama: PluginFunction = (bot) => {
    bot.addCommand({
      name: "obama",
      args: [],
      description: "talktobama wrapper. (Converts text to a video of obama saying that text)",
      shortcuts: [
        "obama",
        "obamaize",
        "talkobama"
      ],
      examples: ["|| obama Hey, I'm Obama!"],
      ignore: false,
      permissions: [PermissionType.ALL],
      cb: async (msg, client) => {
        if (msg.args.length === 0) {
          return client.send("Obama is silent.", msg);
        }
        const text = msg.args.map(arg => encodeURIComponent(arg)).join("+");
        const response = await fetch("http://talkobamato.me/synthesize.py", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: "input_text=" + text
        });
        const key = response.url.match(/speech_key=(.*)/)![1];
        if (await isReady(key)) {
          return client.send("http://talkobamato.me/synth/output/" + key + "/obama.mp4", msg);
        }
        waitForReady(key, 1, function(success) {
          if (success) {
            client.send("http://talkobamato.me/synth/output/" + key + "/obama.mp4", msg);
          } else {
            client.send("Obama Timed Out", msg);
          }
            });
      }
    });
};

function waitForReady(key: string, amount: number, callback: (success: boolean) => void) {
  setTimeout(async function() {
    if (await isReady(key)) {
      return callback(true);
    }
    if (amount > max_attempts) {
      return callback(false);
    }
    waitForReady(key, amount + 1, callback);
  }, 10000);

}

async function isReady(key: string) {
  const response = await fetch("http://talkobamato.me/synth/output//" + key + "/video_created.txt", { method: "HEAD" });
  return response.status !== 404;
}
