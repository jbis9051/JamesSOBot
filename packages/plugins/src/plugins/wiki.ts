import { PluginFunction } from "@chatbot/bot";
import fetch from "node-fetch";

function random(arr: any[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export const wiki: PluginFunction = (bot) => {
  bot.addCommand({
    name: "wiki",
    args: ["query"],
    description: "Looks query up on Wikipedia",
    shortcuts: ["wiki", "lookup", "search"],
    examples: ["|| wiki Alan Turing"],
    ignore: false,
    permissions: ["all"],
    cb: (msg, client) => {
      if (msg.info.contextId === "15") {
        client.send("Mehdi told me not to tell you.", msg);
        return;
      }
      if (msg.args.length < 1) {
        client.send("**Missing args**", msg);
        return;
      }
      fetch(
        "https://en.wikipedia.org/w/api.php?action=opensearch&limit=1&format=json&search=" +
        encodeURIComponent(msg.args.join(" "))
      )
        .then((resp) => resp.json())
        .then((resp) => {
          // the result will look like this:
          // [search_term, [title0], [description0], [link0]]
          // we only asked for one result, so the inner arrays will have only
          // 1 item each
          if (!resp) {
            client.send("Error Occurred", msg);
            return;
          }
          let res = resp[3][0],
            found = true;

          if (!res) {
            found = false;
            res = random([
              "No result found",
              "The Wikipedia contains no knowledge of such a thing",
              "The Gods of Wikipedia did not bless us"
            ]);
          }
          client.send(res, msg);
        });
    }
  });
};
