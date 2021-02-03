import eval from "./eval/index";

import { PermissionType, PluginFunction } from "@chatbot/bot";

export const evalPlugin: PluginFunction = (bot) => {
    bot.addCommand({
      name: "eval",
      args: ["code"],
      description: "Evaluates JS",
      shortcuts: ["eval"],
      examples: [
        "|| eval console.log('Hello World!');",
        "||> console.log('Hello World!');",
        "!!> console.log('Hello World!');"
      ],
      ignore: false,
      permissions: [PermissionType.ALL],
      cb: (msg, client) => {
        _run(msg.args.join(" ")).then((response) =>
          client.hardReply(response, msg)
        );
      }
    });

  function truncate(str: string | any) {
    if (typeof str === "string" && str.length > 400) {
      return str.slice(0, 400);
    } else {
      return str;
    }
  }

  async function _run(code: string) {
    if (/^\s*{/.test(code) && /}\s*$/.test(code)) {
      code = "(" + code + ")";
    }
    const val = await eval(code);
    val.result = truncate(val.result);
    if (val.error) {
      return `Error running script: \`${val.result}\``;
    }
    let logged = truncate(val.logged.join(", "));
    return `\`${val.result}\` Logged: \`${logged}\` Took: \`${val.time}ms\``;
  }

  bot.RegisterHandler((msg, client) => {
    const text = bot.htmldecode(
      msg.info.rawContent.replace(/<br>/g, "\n").replace(/<.+>/g, "")
    );
    if (
      bot.permissionCheck(client, bot.commands["eval"], msg) &&
      /^(\|\|>|>\|\||!!>) ./.test(text)
    ) {
      const trigger = text.match(/^(\|\|>|>\|\||!!>) ./)![1];
      _run(text.replace(trigger, "")).then((response) =>
        client.hardReply(response, msg)
      );
    }
  });
};
