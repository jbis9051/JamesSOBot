import { PermissionType, PluginFunction } from '@chatbot/bot';
import { SOClient } from "@chatbot/so/SOClient";

/**
 * @summary adds a 'stat' command for user stats
 * @param bot bot instance
 */
export const stat: PluginFunction = (bot) => {
    bot.addCommand({
        name: 'stat',
        args: [],
        description: 'Gets info about a user',
        shortcuts: ['stats', 'stat'],
        examples: ['|| stat @JBis', '|| stat JBis', '|| stat 7886229'],
        ignore: false,
        permissions: [PermissionType.ALL],
        cb: async (msg, client: SOClient) => {
            let id;
            if (msg.args.length === 0) {
                id = msg.info.fromId;
            } else if (msg.args.length === 1 && /^\d+$/.test(msg.args[0])) {
                id = parseInt(msg.args[0], 10);
            } else {
                id = await client.usernameToId(msg.args.join(' '), msg);
                if (!id) {
                    client.send(
                        'Unable to find user. This can happen if they have not been in the room in awhile.',
                        msg
                    );
                    return;
                }
            }

            const siteid = await client.chatIDToSiteID(id);
            const userData = await client.stats(siteid);
            if (!userData) {
                client.send('Unable to find user', msg);
                return;
            }

            client.send(
                client.codify(
                    '' +
                        `Username: ${bot.htmldecode(userData.display_name)}\n` +
                        `ID: ${userData.account_id}\n` +
                        `Reputation: ${userData.reputation}\n` +
                        `Reputation Change Month: ${userData.reputation_change_month}\n` +
                        `Last Accessed: ${new Date(
                            userData.last_access_date * 1000
                        )}`
                ),
                msg
            );
        },
    });
};
