import { Message, PluginFunction, Client, Config } from '@chatbot/bot';

import levenshtein from 'fast-levenshtein';
import autocommand from './errorHelpers/autocommand';

export const errors: PluginFunction = (bot) => {
    bot.on('invalid-message', (msg) => {
        msg.roomContext.send('This command conflicts with law #3');
    });
    bot.on(
        'no-command',
        async (msg: Message, client: Client, config: Config) => {
            if (await autocommand(msg, bot, client, config)) {
                return;
            }
            const commandAliases = Object.values(bot.commands)
                .flatMap((command) =>
                    command.shortcuts.map((shortcut) =>
                        // get the values of all of commands and then extract the shortcuts
                        ({
                            // then map them to an object with the shortcut as well as the levenshtein score
                            score: levenshtein.get(
                                shortcut.toString(),
                                msg.commandCall!
                            ),
                            shortcut,
                        })
                    )
                )
                .sort((a, b) => a.score - b.score) // then sort them based on the score
                .slice(0, 3) // then take the first 3
                .map((obj) => obj.shortcut); // then map it all back to the shortcut

            client.send(
                `${'Invalid command! ' + 'Did you mean: '}${commandAliases.join(
                    ', '
                )}? ` +
                    `Try \`help\` for a list of available commands.${'.‍'.repeat(
                        Math.random() * 10
                    )}`,
                msg
            ); /* there is probably a better way of doing this */
        }
    );
    bot.on('not-authorized', (msg: Message, client: Client) => {
        client.hardReply(
            'You are not authorized to administer this command',
            msg
        );
    });
};
