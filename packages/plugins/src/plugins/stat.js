const {Message} = require('../../../../old/src/events/Message');
module.exports = function (bot) {
    bot.addCommand({
        name: "stat",
        args: [],
        description: "Gets info about a user",
        shortcuts: [
            "stats",
            "stat",
        ],
        examples: ["|| stat @JBis", "|| stat JBis", "|| stat 7886229"],
        ignore: false,
        permissions: ["all"],
        func: async (msg) => {
            let id;
            if (msg.args.length === 0) {
                id = msg.getStaticUserUID();
            } else if (msg.args.length === 1 && /^\d+$/.test(msg.args[0])) {
                id = parseInt(msg.args[0]);
            } else {
                id = await msg.roomContext.usernameToId(msg.args.join(" "));
                if (!id) {
                    msg.roomContext.send("Unable to find user. This can happen if they have not been in the room in awhile.");
                    return;
                }
            }

            const siteid = await msg.client.chatIDToSiteID(id);
            const userData = await msg.client.stats(siteid);
            if (!userData) {
                msg.roomContext.send("Unable to find user");
                return;
            }
            // {"items":[{"badge_counts":{"bronze":15,"silver":4,"gold":1},"account_id":10715379,"is_employee":false,"last_modified_date":1560326454,"last_access_date":1560357081,"reputation_change_year":44,"reputation_change_quarter":22,"reputation_change_month":10,"reputation_change_week":10,"reputation_change_day":10,"reputation":334,"creation_date":1492547029,"user_type":"registered","user_id":7886229,"accept_rate":83,"website_url":"http://joshbrown.info","link":"https://stackoverflow.com/users/7886229/jbis","profile_image":"https://i.stack.imgur.com/8kBbg.png?s=128&g=1","display_name":"JBis"}],"has_more":false,"quota_max":300,"quota_remaining":287}
            msg.roomContext.send(Message.codify("" +
                `Username: ${userData.display_name.htmldecode()}\n` +
                `ID: ${userData.account_id}\n` +
                `Reputation: ${userData.reputation}\n` +
                `Reputation Change Month: ${userData.reputation_change_month}\n` +
                `Last Accessed: ${(new Date(userData.last_access_date * 1000))}`));
        }
    });
};

/**
 * Sends a fun fact
 * @param expression - expression to evaluate
 * @return {String} - result
 */
function calc(expression) {
}

