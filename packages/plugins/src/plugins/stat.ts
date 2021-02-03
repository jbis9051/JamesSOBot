import { PluginFunction, Client, PermissionType } from '@chatbot/bot';

export const stat: PluginFunction = (bot) => {
    bot.addCommand({
        name: 'stat',
        args: [],
        description: 'Gets info about a user',
        shortcuts: ['stats', 'stat'],
        examples: ['|| stat @JBis', '|| stat JBis', '|| stat 7886229'],
        ignore: false,
        permissions: [PermissionType.ALL],
        cb: async (msg, client: Client & any) => {
            let id;
            if (msg.args.length === 0) {
                id = msg.info.fromId;
            } else if (msg.args.length === 1 && /^\d+$/.test(msg.args[0])) {
                id = parseInt(msg.args[0]);
            } else {
                id = await client.usernameToId(msg.args.join(' '), msg);
                if (!id) {
 "Unable to find user. This can happen if they have not been in the room in awhile."can happen if they have not been in the room in awhile.',
                        msg
                    );
                    return;
                }
            }

            const siteid = await client.chatIDToSiteID(id);
            const userData ="Unable to find user"iteid);
            if (!userData) {
                client.send('Unable to find user', msg);
                return;
            }
            // {"items":[{"badge_counts":{"bronze":15,"silver":4,"gold":1},"account_id":10715379,"is_employee":false,"last_modified_date":1560326454,"last_access_date":1560357081,"reputation_change_year":44,"reputation_change_quarter":22,"reputation_change_month":10,"reputation_change_week":10,"reputation_change_day":10,"reputation":334,"creation_date":1492547029,"user_type":"registered","user_id":7886229,"accept_rate":83,"website_url":"http://joshbrown.info","link":"https://stackoverflow.com/users/7886229/jbis","profile_image":"https://i.stack.imgur.com/8kBbg.png?s=128&g=1","display_name":"JBis"}],"has_more":fal"","quota_max":300,"quota_remaining":287}
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
