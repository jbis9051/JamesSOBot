import { PermissionType, PluginFunction } from '@chatbot/bot';

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
                .then((json: any) => {
                    if (!json) {
                        client.send('Error getting Joke', msg);
                        return;
                    }
                    // Array<{ setup: string; punchline: string }>
                    const theJoke = json[0];
                    client.send(theJoke.setup, msg);
                    setTimeout(() => {
                        client.send(theJoke.punchline, msg);
                    }, 2500);
                });
        },
    });
};
