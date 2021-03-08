import { PermissionType, PluginFunction } from '@chatbot/bot';

export const man: PluginFunction = (bot) => {
    bot.addCommand({
        name: 'man',
        args: ['command'],
        description: 'Displays the man page for a bot command',
        shortcuts: ['man'],
        examples: ['|| man ban'],
        ignore: false,
        permissions: [PermissionType.ALL],
        cb: (msg, client) => {
            if (msg.args.length < 1) {
                client.send('**Missing args**', msg);
                return;
            }
            const command = bot.getCommandFromText(msg.args[0]);
            if (!command) {
                client.send(`No manual entry for ${msg.args[0]}`, msg);
                return;
            }
            let stringToSend = `[\`${
                command.name
            }\`](https://github.com/jbis9051/JamesSOBot/blob/master/docs/COMMANDS.md#${
                command.name
            }): "${command.description || ''}" `;
            if (command.creator) {
                stringToSend += `Creator: ${command.creator}`;
            } else {
                stringToSend += `Examples: ${(command.examples || [])
                    .map((example) => `\`${example}\``)
                    .join(' , ')}`;
            }
            client.send(stringToSend, msg);
        },
    });
};
