import { PluginFunction, Message, Client } from '@chatbot/bot';
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
        async cb(msg: Message, client: Client) {
            const res = await fetch(`https://api.github.com/gists`, {
                method: 'POST',
                headers: {
                    'User-Agent': 'JamesSO Bot',
                    Authorization: `token ${config.plugin.github.token}`,
                },
                body: JSON.stringify({
                    description: `bot memory ${new Date()}`,
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
            });

            const { ok, status } = res;

            if (!ok) {
                const errorPfx = 'Failed to backup data.';

                const errorMap: Record<number, string> = {
                    401: ' Please check your GitHub credentials',
                    403: ' You are not authorized to create Gists',
                    422: ' Invalid backup data or too many requests',
                };

                const errorInfo = errorMap[status] || ' Unknown API error';

                client.send(`${errorPfx}${errorInfo}`, msg);
                return;
            }

            const apiResponse = await res.json();

            client.send(`[Backup](${apiResponse.html_url}) Created`, msg);
        },
    });
};
export default backup;
