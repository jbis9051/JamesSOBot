import { PermissionType, PluginFunction } from '@chatbot/bot';
import fetch from 'node-fetch';

export const joke: PluginFunction = (bot) => {
    bot.addCommand({
        name: 'joke',
        args: [],
        description: 'Sends a joke',
        shortcuts: ['joke'],
        examples: ['|| joke'],
        ignore: false,
        permissions: [PermissionType.ALL],
        cb: (msg, client) => {
            if (Math.random() <= 0.1 && msg.args[0] !== 'bypass') {
                client.send(`${msg.info.fromName}'s code 😜`, msg);
                return;
            }
            fetch(
                'https://official-joke-api.appspot.com/jokes/programming/random'
            )
                .then((resp) => resp.json())
                .then((json: Array<{ setup: string; punchline: string }>) => {
                    if (!json) {
                        client.send('Error getting Joke', msg);
                        return;
                    }
                    const joke = json[0];
                    client.send(joke.setup, msg);
                    setTimeout(() => {
                        client.send(joke.punchline, msg);
                    }, 2500);
                });
        },
    });
};
