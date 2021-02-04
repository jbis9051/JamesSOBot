import { PermissionType, PluginFunction } from '@chatbot/bot';
import fetch from 'node-fetch';

export const define: PluginFunction = (bot) => {
    bot.addCommand({
        name: 'define',
        args: ['work'],
        description: 'Defines a word',
        shortcuts: ['define', 'definition'],
        examples: ['|| define hello'],
        ignore: false,
        permissions: [PermissionType.ALL],
        cb: (msg, client) => {
            fetch(
                `https://api.dictionaryapi.dev/api/v2/entries/en_US/${msg.args.join(
                    ' '
                )}`
            ).then(async (resp) => {
                const json = await resp.json();
                if (!resp.ok) {
                    if (resp.status === 404) {
                        client.send('Word or phrase not found', msg);
                    } else {
                        client.send('Unknown error occurred', msg);
                    }
                    return;
                }
                client.send(
                    `${json[0].meanings[0].partOfSpeech} - ${json[0].meanings[0].definitions[0].definition}`,
                    msg
                );
            });
        },
    });
};
