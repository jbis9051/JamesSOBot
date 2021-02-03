import { Bot, PermissionType, PluginFunction } from '@chatbot/bot';

export const betterecho: PluginFunction = (bot: Bot) => {
    bot.addCommand({
        name: 'echo',
        args: [],
        description: "Bot echo's what you say",
        shortcuts: ['echo', 'betterecho', 'say'],
        examples: ['|| echo hi'],
        ignore: true,
        permissions: [PermissionType.ALL],
        cb: (msg, client) => {
            client.send(bot.htmldecode(msg.args.join(' ')), msg);
        },
    });
};
