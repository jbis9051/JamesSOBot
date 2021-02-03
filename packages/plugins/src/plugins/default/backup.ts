import * as fs from 'fs';
import {
    PluginFunction,
    Message,
    Permission,
    PermissionType,
    Client,
} from '@chatbot/bot';
import fetch from 'node-fetch';

export const backup: PluginFunction = (bot, config) => {
    bot.addCommand({
        name: 'backup',
        description: 'Backup data to Gist and posts a link',
        shortcuts: ['backup'],
        examples: ['|| backup'],
        permissions: ['admin'],
        ignore: false,
        args: [],
        cb(msg: Message, client: Client) {
            fetch(`https://api.github.com/gists`, {
                method: 'POST',
                headers: {
                    'User-Agent': 'JamesSO Bot',
                    Authorization: 'token ' + config.plugin.github.token,
                },
                body: JSON.stringify({
                    description: 'bot memory ' + new Date(),
                    public: false,
                    files: {
                        'learn_list.json': {
                            content: JSON.stringify(
                                bot.dataStore.getData('learn_list')
                            ),
                        },
                        'people_seen.json': {
                            content: JSON.stringify(
                                bot.dataStore.getData('people_seen')
                            ),
                        },
                        'afk_data.json': {
                            content: JSON.stringify(
                                bot.dataStore.getData('afk_data')
                            ),
                        },
                    },
                }),
            })
                .then((resp) => resp.json())
                .then((resp) => {
                    client.send(`[Backup](${resp.html_url}) Created`, msg);
                });
        },
    });
};
export default backup;
