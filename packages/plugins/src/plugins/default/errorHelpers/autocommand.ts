import { Bot, Client, Config, Message } from '@chatbot/bot';
import { RunEval } from '../../eval';
import { mdnSearch } from '../../mdn';
import { chooseFunction } from '../../choose';

export default async function autocommand(
    msg: Message,
    bot: Bot,
    client: Client,
    config: Config
) {
    if (!config.plugin.auto_command.includes(msg.info.contextId)) {
        return false;
    }
    const content = msg.info.content.replace(`${msg.prefix} `, '');
    if (/[+\-/*{};]|=>/.test(content)) {
        const result = await RunEval(content);
        client.hardReply(result, msg);
        return true;
    }
    if (/ or /.test(content)) {
        const result = chooseFunction(msg.quotedArgsList);
        if (result) {
            client.send(result, msg);
            return true;
        }
    }
    const data = await mdnSearch(bot, content);
    if (!data) {
        return false;
    }

    const terms = content.split(/\s|\./);
    const matches = terms.filter((term) =>
        data.title.toLowerCase().includes(term.toLowerCase())
    ).length;

    if (matches / terms.length > 0.4) {
        client.hardReply(
            bot.htmldecode(client.link(data.title, data.url)),
            msg
        );
        return true;
    }
    return false;
}
